import logging
from datetime import datetime
from fastapi import APIRouter, HTTPException
from core.database import get_db
from core.email_service import send_newsletter_confirmation
from core.klaviyo_service import add_subscriber_to_klaviyo
from models.newsletter import NewsletterSubscription

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


@router.post("/subscribe/")
async def subscribe(data: NewsletterSubscription):
    """Inscription à la newsletter."""
    try:
        db = get_db()
        # Vérifier si l'email est déjà inscrit
        existing = await db.newsletter_subscribers.find_one({"email": data.email})
        if existing:
            return {"status": "already_subscribed", "message": "Vous êtes déjà inscrit !"}

        # Sauvegarder le nouvel abonné
        await db.newsletter_subscribers.insert_one({
            "email": data.email,
            "prenom": data.prenom,
            "subscribed_at": datetime.utcnow(),
            "active": True,
        })
    except Exception:
        logger.warning("MongoDB absent : abonné non sauvegardé en base, on continue...")

    # Envoyer l'email de confirmation
    try:
        await send_newsletter_confirmation(data.email, data.prenom)
    except Exception as e:
        logger.error(f"Erreur email confirmation newsletter : {e}")

    # Synchroniser avec Klaviyo (en arrière-plan, ne bloque pas la réponse)
    try:
        klaviyo_ok = await add_subscriber_to_klaviyo(data.email, data.prenom)
        if klaviyo_ok:
            logger.info(f"Abonné {data.email} synchronisé avec Klaviyo ✅")
    except Exception as e:
        logger.error(f"Erreur synchronisation Klaviyo : {e}")

    return {"status": "success", "message": "Inscription confirmée !"}


@router.get("/subscribers/")
async def list_subscribers():
    """Lister tous les abonnés (admin)."""
    try:
        db = get_db()
        subscribers = await db.newsletter_subscribers.find(
            {"active": True}, {"_id": 0, "email": 1, "prenom": 1, "subscribed_at": 1}
        ).to_list(length=1000)
        return {"count": len(subscribers), "subscribers": subscribers}
    except Exception:
        return {"count": 0, "subscribers": [], "note": "MongoDB non disponible"}
