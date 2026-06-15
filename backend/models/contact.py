"""
models/contact.py
Modèles Pydantic pour le formulaire de contact.
"""
from pydantic import BaseModel, EmailStr, field_validator


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    subject: str
    message: str

    @field_validator('name', 'subject')
    @classmethod
    def max_100(cls, v):
        if len(v) > 100:
            raise ValueError('Champ trop long (max 100 caractères)')
        return v.strip()

    @field_validator('message')
    @classmethod
    def max_2000(cls, v):
        if len(v) > 2000:
            raise ValueError('Message trop long (max 2000 caractères)')
        return v.strip()

    @field_validator('phone')
    @classmethod
    def max_20(cls, v):
        if len(v) > 20:
            raise ValueError('Numéro trop long')
        return v.strip()
