from pydantic import BaseModel, EmailStr
from typing import Optional

class NewsletterSubscription(BaseModel):
    email: EmailStr
    prenom: Optional[str] = ""
