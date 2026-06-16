import base64
import json
import logging
import os

import firebase_admin
from firebase_admin import credentials

logger = logging.getLogger(__name__)

_initialized = False


def get_firebase_app():
    global _initialized
    if _initialized:
        return firebase_admin.get_app()

    b64 = os.environ.get("FIREBASE_SERVICE_ACCOUNT_B64", "")
    if not b64:
        logger.warning("FIREBASE_SERVICE_ACCOUNT_B64 non défini — push notifications désactivées")
        return None

    try:
        service_account = json.loads(base64.b64decode(b64).decode("utf-8"))
        cred = credentials.Certificate(service_account)
        app = firebase_admin.initialize_app(cred)
        _initialized = True
        logger.info("Firebase Admin SDK initialisé")
        return app
    except Exception as e:
        logger.error(f"Erreur initialisation Firebase Admin : {e}")
        return None
