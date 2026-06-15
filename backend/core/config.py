"""
core/config.py
Centralise toutes les variables d'environnement de l'application.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Charge le .env depuis la racine du backend
load_dotenv(Path(__file__).parent.parent / ".env")


class Settings:
    # MongoDB
    MONGO_URL: str = os.environ["MONGO_URL"]
    DB_NAME: str = os.environ["DB_NAME"]

    # CORS
    CORS_ORIGINS: list[str] = os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")

    # Stripe
    STRIPE_API_KEY: str = os.environ.get("STRIPE_API_KEY", "")
    STRIPE_WEBHOOK_SECRET: str = os.environ.get("STRIPE_WEBHOOK_SECRET", "")

    # Resend
    RESEND_API_KEY: str = os.environ.get("RESEND_API_KEY", "")
    SENDER_EMAIL: str = os.environ.get("SENDER_EMAIL", "contact@mezzorapizza.fr")
    RESTAURANT_EMAIL: str = os.environ.get("RESTAURANT_EMAIL", "")

    # Klaviyo
    KLAVIYO_API_KEY: str = os.environ.get("KLAVIYO_API_KEY", "")


settings = Settings()
