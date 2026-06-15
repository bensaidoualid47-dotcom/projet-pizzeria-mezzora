import logging
import os
from datetime import datetime
from fastapi import APIRouter, HTTPException, Header, Request
from core.database import get_db
from core.email_service import send_newsletter_confirmation, send_newsletter_notification
from core.klaviyo_service import add_subscriber_to_klaviyo
from models.newsletter import NewsletterSubscription
from core.limiter import limiter

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


@router.post("/subscribe/")
@limiter.limit("3/minute")
async def subscribe(request: Request, data: NewsletterSubscription):
    """Inscription à la newsletter."""
    already_exists = False
    try:
        db = get_db()
        existing = await db.newsletter_subscribers.find_one({"email": data.email})
        if existing:
            already_exists = True

        if not already_exists:
            await db.newsletter_subscribers.insert_one({
                "email": data.email,
                "prenom": data.prenom,
                "subscribed_at": datetime.utcnow(),
                "active": True,
            })
    except Exception:
        logger.warning("MongoDB absent : abonné non sauvegardé en base, on continue...")

    if not already_exists:
        try:
            await send_newsletter_confirmation(data.email, data.prenom)
        except Exception as e:
            logger.error(f"Erreur email confirmation newsletter : {e}")

        try:
            await send_newsletter_notification(data.email, data.prenom)
        except Exception as e:
            logger.error(f"Erreur notification newsletter restaurateur : {e}")

        try:
            klaviyo_ok = await add_subscriber_to_klaviyo(data.email, data.prenom)
            if klaviyo_ok:
                logger.info(f"Abonné {data.email} synchronisé avec Klaviyo ✅")
        except Exception as e:
            logger.error(f"Erreur synchronisation Klaviyo : {e}")

    # Toujours retourner succès (évite l'énumération d'emails)
    return {"status": "success", "message": "Inscription confirmée !"}


@router.get("/subscribers/")
@limiter.limit("10/hour")
async def list_subscribers(request: Request, x_admin_key: str = Header(default="")):
    """Lister tous les abonnés (admin protégé par clé)."""
    admin_key = os.environ.get("ADMIN_SECRET_KEY", "")
    if not admin_key or x_admin_key != admin_key:
        raise HTTPException(status_code=403, detail="Accès refusé")
    try:
        db = get_db()
        subscribers = await db.newsletter_subscribers.find(
            {"active": True}, {"_id": 0, "email": 1, "prenom": 1, "subscribed_at": 1}
        ).to_list(length=1000)
        return {"count": len(subscribers), "subscribers": subscribers}
    except Exception:
        return {"count": 0, "subscribers": [], "note": "MongoDB non disponible"}
