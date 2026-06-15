import logging
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request
from core.database import get_db
from core.email_service import send_contact_email
from models.contact import ContactMessage
from server import limiter

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/")
@limiter.limit("5/minute")
async def submit_contact(request: Request, contact: ContactMessage):
    # ÉTAPE A : On essaie de sauvegarder, mais on ne bloque pas si MongoDB est éteint
    try:
        db = get_db()
        await db.contact_messages.insert_one({
            **contact.model_dump(),
            "created_at": datetime.utcnow(),
            "status": "new",
        })
    except Exception:
        logger.warning("MongoDB absent : Message non sauvegardé en base, mais on continue...")

    # ÉTAPE B : On envoie l'e-mail (C'est le plus important)
    try:
        success = await send_contact_email(contact)
        if success:
            return {"status": "success", "message": "Email envoyé !"}
        else:
            raise Exception("Erreur service email")
    except Exception as e:
        logger.error(f"Erreur d'envoi : {e}")
        raise HTTPException(status_code=500, detail="L'envoi a échoué")