"""
server.py
Point d'entrée principal de l'API Mezzora Pizza.

Lancer avec :
    uvicorn server:app --reload --port 8001
"""
import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from core.config import settings

limiter = Limiter(key_func=get_remote_address)

from core.database import close_connection
from routes.orders import router as orders_router
from routes.contact import router as contact_router
from routes.newsletter import router as newsletter_router

# ──────────────────────────────────────────────
#  Logging
# ──────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# ──────────────────────────────────────────────
#  Application
# ──────────────────────────────────────────────
app = FastAPI(
    title="Mezzora Pizza API",
    description="Backend de commande en ligne pour Mezzora Pizza.",
    version="2.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# Routes
app.include_router(orders_router)
app.include_router(contact_router)
app.include_router(newsletter_router)


# ──────────────────────────────────────────────
#  Santé de l'API
# ──────────────────────────────────────────────
@app.get("/api/health", tags=["system"])
async def health_check():
    """Endpoint de santé — utile pour les hébergeurs (Railway, Render, etc.)"""
    return {"status": "ok", "service": "Mezzora Pizza API"}


# ──────────────────────────────────────────────
#  Fermeture propre de MongoDB
# ──────────────────────────────────────────────
@app.on_event("shutdown")
async def shutdown():
    await close_connection()
    logger.info("Connexion MongoDB fermée.")