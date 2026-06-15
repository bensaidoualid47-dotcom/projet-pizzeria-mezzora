"""
models/contact.py
Modèles Pydantic pour le formulaire de contact.
"""
from pydantic import BaseModel, EmailStr


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    subject: str
    message: str
