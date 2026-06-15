"""
core/database.py
Connexion MongoDB partagée — une seule instance pour toute l'application.
"""
from motor.motor_asyncio import AsyncIOMotorClient
import os

# Client MongoDB unique (singleton)
_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(
            os.environ["MONGO_URL"],
            serverSelectionTimeoutMS=1000,  # Fail fast si MongoDB absent
            connectTimeoutMS=1000,
        )
    return _client


def get_db():
    return get_client()[os.environ["DB_NAME"]]


async def close_connection():
    global _client
    if _client is not None:
        _client.close()
        _client = None
