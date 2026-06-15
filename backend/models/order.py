"""
models/order.py
Modèles Pydantic pour les commandes.
"""
from pydantic import BaseModel, EmailStr
from typing import Optional


class CustomerInfo(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: str
    address: Optional[str] = ""
    city: Optional[str] = ""
    postalCode: Optional[str] = ""
    notes: Optional[str] = ""


class OrderItem(BaseModel):
    id: str
    name: str
    price: float
    quantity: int
    size: str
    category: str
    ingredients: Optional[str] = ""
    description: Optional[str] = ""


class OrderData(BaseModel):
    customer: CustomerInfo
    items: list[OrderItem]
    deliveryMethod: str
    subtotal: float
    discount: float
    deliveryFee: float
    total: float


class CreateCheckoutRequest(BaseModel):
    orderData: OrderData
    originUrl: str
