"""
core/klaviyo_service.py
Synchronise automatiquement les abonnés newsletter avec Klaviyo.
"""
import logging
import httpx
from core.config import settings

logger = logging.getLogger(__name__)

KLAVIYO_API_URL = "https://a.klaviyo.com/api"
KLAVIYO_REVISION = "2024-02-15"


async def add_subscriber_to_klaviyo(email: str, prenom: str = "") -> bool:
    """
    Crée (ou met à jour) un profil dans Klaviyo.
    Retourne True si succès, False sinon (sans lever d'exception).
    """
    if not settings.KLAVIYO_API_KEY:
        logger.warning("KLAVIYO_API_KEY absente — synchronisation Klaviyo ignorée")
        return False

    headers = {
        "Authorization": f"Klaviyo-API-Key {settings.KLAVIYO_API_KEY}",
        "revision": KLAVIYO_REVISION,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    payload = {
        "data": {
            "type": "profile",
            "attributes": {
                "email": email,
                "first_name": prenom or "",
                "subscriptions": {
                    "email": {
                        "marketing": {
                            "consent": "SUBSCRIBED"
                        }
                    }
                }
            }
        }
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                f"{KLAVIYO_API_URL}/profiles/",
                json=payload,
                headers=headers,
            )

            if response.status_code in (200, 201):
                logger.info(f"✅ Klaviyo : profil créé pour {email}")
                return True

            elif response.status_code == 409:
                # Profil déjà existant — c'est normal, on met à jour
                logger.info(f"ℹ️ Klaviyo : profil déjà existant pour {email}")
                # Extraire l'ID du profil existant depuis la réponse 409
                try:
                    conflict_data = response.json()
                    profile_id = (
                        conflict_data
                        .get("errors", [{}])[0]
                        .get("meta", {})
                        .get("duplicate_profile_id", "")
                    )
                    if profile_id:
                        # Mettre à jour le profil existant
                        update_resp = await client.patch(
                            f"{KLAVIYO_API_URL}/profiles/{profile_id}/",
                            json={
                                "data": {
                                    "type": "profile",
                                    "id": profile_id,
                                    "attributes": {
                                        "first_name": prenom or "",
                                    }
                                }
                            },
                            headers=headers,
                        )
                        if update_resp.status_code == 200:
                            logger.info(f"✅ Klaviyo : profil {email} mis à jour")
                except Exception:
                    pass
                return True

            else:
                logger.error(
                    f"Klaviyo erreur {response.status_code} pour {email} : {response.text}"
                )
                return False

    except httpx.TimeoutException:
        logger.error(f"Klaviyo timeout pour {email}")
        return False
    except Exception as e:
        logger.error(f"Klaviyo exception pour {email} : {e}")
        return False
