import logging
import os
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from firebase_admin import messaging
from core.database import get_db
from core.firebase_admin_sdk import get_firebase_app
from core.limiter import limiter

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/notifications", tags=["notifications"])


class TokenRegister(BaseModel):
    token: str


class PushPayload(BaseModel):
    title: str
    body: str
    url: str = "/"
    admin_key: str = ""


@router.post("/register")
@limiter.limit("10/minute")
async def register_token(request: Request, data: TokenRegister):
    """Enregistre un token FCM en base et retourne toujours succès."""
    if not data.token:
        raise HTTPException(status_code=400, detail="Token manquant")
    try:
        db = get_db()
        await db.fcm_tokens.update_one(
            {"token": data.token},
            {"$set": {"token": data.token, "updated_at": datetime.utcnow(), "active": True}},
            upsert=True,
        )
    except Exception:
        logger.warning("MongoDB absent : token FCM non sauvegardé")
    return {"status": "ok"}


@router.post("/send")
@limiter.limit("10/hour")
async def send_push(request: Request, payload: PushPayload):
    """Envoie une notification push à tous les abonnés actifs (admin)."""
    admin_key = os.environ.get("ADMIN_SECRET_KEY", "")
    if not admin_key or payload.admin_key != admin_key:
        raise HTTPException(status_code=403, detail="Accès refusé")

    app = get_firebase_app()
    if not app:
        raise HTTPException(status_code=503, detail="Firebase non configuré")

    tokens = []
    try:
        db = get_db()
        docs = await db.fcm_tokens.find({"active": True}, {"_id": 0, "token": 1}).to_list(length=5000)
        tokens = [d["token"] for d in docs]
    except Exception as e:
        logger.warning(f"MongoDB non disponible pour récupérer les tokens : {e}")

    if not tokens:
        return {"status": "ok", "sent": 0, "message": "Aucun abonné pour l'instant"}

    # Firebase envoie par lots de 500 max
    success_count = 0
    failure_count = 0
    invalid_tokens = []

    for i in range(0, len(tokens), 500):
        batch = tokens[i:i + 500]
        multicast = messaging.MulticastMessage(
            notification=messaging.Notification(title=payload.title, body=payload.body),
            webpush=messaging.WebpushConfig(
                notification=messaging.WebpushNotification(
                    title=payload.title,
                    body=payload.body,
                    icon="/logo192.png",
                ),
                fcm_options=messaging.WebpushFCMOptions(link=payload.url),
            ),
            tokens=batch,
        )
        response = messaging.send_each_for_multicast(multicast)
        success_count += response.success_count
        failure_count += response.failure_count

        for idx, resp in enumerate(response.responses):
            if not resp.success:
                err = str(resp.exception)
                if "registration-token-not-registered" in err or "invalid-registration-token" in err:
                    invalid_tokens.append(batch[idx])

    # Désactiver les tokens invalides
    if invalid_tokens:
        try:
            db = get_db()
            await db.fcm_tokens.update_many(
                {"token": {"$in": invalid_tokens}},
                {"$set": {"active": False}},
            )
            logger.info(f"{len(invalid_tokens)} tokens invalides désactivés")
        except Exception:
            pass

    logger.info(f"Push envoyé : {success_count} succès, {failure_count} échecs")
    return {"status": "ok", "sent": success_count, "failed": failure_count}
