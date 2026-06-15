"""
routes/orders.py
Gestion des commandes : création session Stripe, vérification paiement, webhook.
"""
import asyncio
import logging
import stripe
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request, Header

from core.config import settings
from core.database import get_db
from core.email_service import send_customer_confirmation, send_restaurant_notification
from models.order import CreateCheckoutRequest

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/orders", tags=["orders"])

# Init Stripe
stripe.api_key = settings.STRIPE_API_KEY

# Frais de livraison (doit correspondre au frontend)
DELIVERY_FEE = 6.0


def _compute_server_total(items: list, delivery_method: str) -> tuple[float, float, float, float]:
    """
    Recalcule le total côté serveur à partir des articles.
    Retourne (subtotal, discount, delivery_fee, total).
    
    La remise appliquée est l'offre 2 achetés = 3ème offert sur les pizzas.
    """
    subtotal = sum(item.price * item.quantity for item in items)

    # Offre 2+1 : on trie les pizzas par prix croissant, la moins chère est offerte
    pizza_items = sorted(
        [item for item in items if item.category.lower() in ("pizza", "calzone")],
        key=lambda i: i.price
    )
    total_pizzas = sum(i.quantity for i in pizza_items)
    nb_free = total_pizzas // 3

    # On prend les moins chères comme gratuites
    discount = 0.0
    remaining_free = nb_free
    for item in pizza_items:
        if remaining_free <= 0:
            break
        free_qty = min(remaining_free, item.quantity)
        discount += free_qty * item.price
        remaining_free -= free_qty

    delivery_fee = DELIVERY_FEE if delivery_method == "livraison" else 0.0
    total = round(subtotal - discount + delivery_fee, 2)
    return subtotal, discount, delivery_fee, total


# ──────────────────────────────────────────────
#  POST /api/orders/create-checkout
# ──────────────────────────────────────────────
@router.post("/create-checkout")
async def create_checkout_session(request: CreateCheckoutRequest, http_request: Request):
    """Crée une session de paiement Stripe après validation du total côté serveur."""
    try:
        order = request.orderData

        # 🔒 Validation du montant côté serveur (protection contre la manipulation)
        _, _, _, server_total = _compute_server_total(order.items, order.deliveryMethod)
        if abs(server_total - order.total) > 0.01:
            logger.warning(
                f"Montant suspect — frontend: {order.total:.2f} € | serveur: {server_total:.2f} €"
            )
            raise HTTPException(
                status_code=400,
                detail=f"Montant incorrect. Total attendu : {server_total:.2f} €."
            )

        order_id = f"MEZ-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        host_url = request.originUrl.rstrip("/")

        # Création de la session Stripe
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "eur",
                    "product_data": {"name": f"Commande Mezzora Pizza #{order_id}"},
                    "unit_amount": int(server_total * 100),  # Stripe travaille en centimes
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url=f"{host_url}/order-confirmation?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{host_url}/checkout",
            metadata={
                "order_id": order_id,
                "customer_email": order.customer.email,
                "customer_name": f"{order.customer.firstName} {order.customer.lastName}",
                "customer_phone": order.customer.phone,
                "deliveryMethod": order.deliveryMethod,
            }
        )

        # Sauvegarde en base (statut "en attente")
        db = get_db()
        await db.orders.insert_one({
            "order_id": order_id,
            "session_id": session.id,
            "customer": order.customer.model_dump(),
            "items": [item.model_dump() for item in order.items],
            "deliveryMethod": order.deliveryMethod,
            "subtotal": order.subtotal,
            "discount": order.discount,
            "deliveryFee": order.deliveryFee,
            "total": server_total,
            "payment_status": "pending",
            "status": "initiated",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        })

        logger.info(f"Session Stripe créée — order_id={order_id}, session_id={session.id}")
        return {"url": session.url, "session_id": session.id, "order_id": order_id}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur création session Stripe : {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création du paiement.")


# ──────────────────────────────────────────────
#  GET /api/orders/payment-status/{session_id}
# ──────────────────────────────────────────────
@router.get("/payment-status/{session_id}")
async def get_payment_status(session_id: str):
    """Vérifie le statut du paiement Stripe et envoie les emails si payé."""
    try:
        stripe_session = stripe.checkout.Session.retrieve(session_id)
        db = get_db()
        order = await db.orders.find_one({"session_id": session_id}, {"_id": 0})

        if not order:
            raise HTTPException(status_code=404, detail="Commande introuvable.")

        # Si le paiement vient d'être confirmé → mise à jour + emails
        if stripe_session.payment_status == "paid" and order.get("payment_status") != "paid":
            await db.orders.update_one(
                {"session_id": session_id},
                {"$set": {
                    "payment_status": "paid",
                    "status": "confirmed",
                    "updated_at": datetime.utcnow(),
                }}
            )
            # Envoi des emails en arrière-plan (non bloquant)
            order["payment_status"] = "paid"
            asyncio.create_task(send_customer_confirmation(order["customer"]["email"], order))
            asyncio.create_task(send_restaurant_notification(order))

        return {
            "status": stripe_session.status,
            "payment_status": stripe_session.payment_status,
            "amount_total": stripe_session.amount_total,
            "currency": stripe_session.currency,
            "order_id": order["order_id"],
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur vérification paiement : {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la vérification du paiement.")


# ──────────────────────────────────────────────
#  POST /api/orders/webhook/stripe
# ──────────────────────────────────────────────
@router.post("/webhook/stripe")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """Reçoit les événements Stripe (paiement, remboursement, etc.)"""
    try:
        payload = await request.body()

        try:
            event = stripe.Webhook.construct_event(
                payload, stripe_signature, settings.STRIPE_WEBHOOK_SECRET
            )
        except Exception as e:
            logger.warning(f"Webhook Stripe invalide : {e}")
            raise HTTPException(status_code=400, detail="Signature webhook invalide.")

        db = get_db()

        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            if session.payment_status == "paid":
                await db.orders.update_one(
                    {"session_id": session.id},
                    {"$set": {
                        "payment_status": "paid",
                        "status": "confirmed",
                        "updated_at": datetime.utcnow(),
                    }}
                )
                logger.info(f"Webhook : commande confirmée via Stripe — session={session.id}")

        elif event["type"] == "charge.refunded":
            charge = event["data"]["object"]
            logger.info(f"Webhook : remboursement reçu — charge={charge.id}")
            # Vous pouvez ici mettre à jour le statut en "refunded" si besoin

        return {"status": "ok"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur webhook Stripe : {e}")
        raise HTTPException(status_code=400, detail=str(e))


# ──────────────────────────────────────────────
#  GET /api/orders (admin)
# ──────────────────────────────────────────────
@router.get("/")
async def get_all_orders():
    """Récupère toutes les commandes (pour le dashboard admin)."""
    try:
        db = get_db()
        orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        return orders
    except Exception as e:
        logger.error(f"Erreur récupération commandes : {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des commandes.")


# ──────────────────────────────────────────────
#  GET /api/orders/{order_id} (admin)
# ──────────────────────────────────────────────
@router.get("/{order_id}")
async def get_order_by_id(order_id: str):
    """Récupère une commande par son identifiant."""
    try:
        db = get_db()
        order = await db.orders.find_one({"order_id": order_id}, {"_id": 0})
        if not order:
            raise HTTPException(status_code=404, detail="Commande introuvable.")
        return order
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur récupération commande {order_id} : {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération de la commande.")
