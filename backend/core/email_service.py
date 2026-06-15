"""
core/email_service.py
Service d'envoi d'emails via Resend.
Regroupe les confirmations clients, notifications restaurant et messages de contact.
"""
import asyncio
import logging
import resend
import os
from core.config import settings

logger = logging.getLogger(__name__)

# --- FONCTIONS UTILITAIRES ---

def _build_items_html(items: list) -> str:
    """Génère les lignes HTML du tableau des articles avec sécurité sur les prix."""
    rows = ""
    for item in items:
        try:
            price = float(item.get('price', 0))
        except (ValueError, TypeError):
            price = 0.0
            
        size_label = f" ({item['size']})" if item.get("size") and item["size"] != "standard" else ""
        rows += f"""
        <tr>
            <td style="padding:10px;border-bottom:1px solid #eee;">{item.get('name', 'Article')}{size_label}</td>
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">{item.get('quantity', 1)}</td>
            <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">{price:.2f} €</td>
        </tr>"""
    return rows


def _base_template(title: str, body_content: str) -> str:
    """Template HTML de base partagé par tous les emails."""
    return f"""<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>{title}</title></head>
<body style="margin:0;font-family:Arial,sans-serif;background:#f4f4f4;color:#333;">
  <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    <div style="background:#c0392b;padding:25px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:28px;">🍕 Mezzora Pizza</h1>
    </div>
    <div style="padding:30px;">
      {body_content}
    </div>
    <div style="background:#f9f9f9;padding:15px;text-align:center;font-size:12px;color:#888;border-top:1px solid #eee;">
      4-6 Av. du Président Georges Pompidou, Rueil-Malmaison · Ouvert 7j/7
    </div>
  </div>
</body>
</html>"""

# --- FONCTIONS D'ENVOI ---

async def send_customer_confirmation(customer_email: str, order: dict) -> bool:
    """Email de confirmation envoyé au client après paiement validé."""
    if not settings.RESEND_API_KEY:
        logger.warning("RESEND_API_KEY manquant.")
        return False

    resend.api_key = settings.RESEND_API_KEY
    items_html = _build_items_html(order.get("items", []))
    delivery_label = "Livraison à domicile" if order.get("deliveryMethod") == "livraison" else "À emporter"

    sender = f"Mezzora Pizza <{settings.SENDER_EMAIL}>"

    body = f"""
    <h2 style="color:#c0392b;">Merci pour votre commande !</h2>
    <p>Bonjour <strong>{order['customer'].get('firstName', '')} {order['customer'].get('lastName', '')}</strong>,</p>
    <p>Votre commande a bien été reçue et est en cours de préparation. 🎉</p>
    <div style="background:#f9f9f9;border-radius:6px;padding:20px;margin:20px 0;">
      <p><strong>N° de commande :</strong> {order.get('order_id', 'N/A')}</p>
      <p><strong>Mode :</strong> {delivery_label}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:10px;text-align:left;">Article</th>
          <th style="padding:10px;text-align:center;">Qté</th>
          <th style="padding:10px;text-align:right;">Prix</th>
        </tr>
      </thead>
      <tbody>{items_html}</tbody>
    </table>
    <h3 style="text-align:right;color:#c0392b;">TOTAL : {float(order.get('total',0)):.2f} €</h3>
    """

    try:
        params = {
            "from": sender,
            "to": [customer_email],
            "subject": f"✅ Confirmation commande #{order.get('order_id')} — Mezzora Pizza",
            "html": _base_template("Confirmation de commande", body),
        }
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:
        logger.error(f"Erreur email client : {e}")
        return False

async def send_restaurant_notification(order: dict) -> bool:
    """Email de notification envoyé au restaurateur (Celle-ci manquait !)."""
    if not settings.RESEND_API_KEY or not settings.RESTAURANT_EMAIL:
        logger.warning("Config email restaurateur manquante.")
        return False

    resend.api_key = settings.RESEND_API_KEY
    items_html = _build_items_html(order.get("items", []))
    customer = order.get("customer", {})
    
    body = f"""
    <h2 style="color:#c0392b;">🔔 Nouvelle commande reçue !</h2>
    <p><strong>Client :</strong> {customer.get('firstName')} {customer.get('lastName')}</p>
    <p><strong>Tél :</strong> {customer.get('phone')}</p>
    <hr>
    <table style="width:100%;border-collapse:collapse;">
      <tbody>{items_html}</tbody>
    </table>
    <h3 style="text-align:right;">Total à préparer : {float(order.get('total',0)):.2f} €</h3>
    """

    try:
        params = {
            "from": f"Mezzora Pizza <{settings.SENDER_EMAIL}>",
            "to": [settings.RESTAURANT_EMAIL],
            "subject": f"🍕 NOUVELLE COMMANDE #{order.get('order_id')}",
            "html": _base_template("Notification Restaurant", body),
        }
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:
        logger.error(f"Erreur notification restaurant : {e}")
        return False

async def send_newsletter_confirmation(email: str, prenom: str = "") -> bool:
    """Email de bienvenue envoyé au nouvel abonné newsletter."""
    if not settings.RESEND_API_KEY:
        return False

    resend.api_key = settings.RESEND_API_KEY
    prenom_display = prenom if prenom else "là"

    body = f"""
    <h2 style="color:#16a34a;">Bienvenue chez Mezzora Pizza ! 🍕</h2>
    <p>Bonjour <strong>{prenom_display}</strong>,</p>
    <p>Vous êtes maintenant inscrit(e) à notre newsletter. Vous serez parmi les premiers à recevoir :</p>
    <ul style="line-height:2;">
      <li>🎁 Nos offres et promotions exclusives</li>
      <li>🍕 Les nouveautés de notre carte</li>
      <li>⏰ Nos événements spéciaux</li>
    </ul>
    <p style="margin-top:20px;">À très bientôt chez Mezzora Pizza !</p>
    <p style="color:#888;font-size:12px;margin-top:30px;">
      Pour vous désinscrire, répondez à cet email avec "Désabonnement".
    </p>
    """

    try:
        params = {
            "from": f"Mezzora Pizza <{settings.SENDER_EMAIL}>",
            "to": [email],
            "subject": "🍕 Bienvenue dans la famille Mezzora !",
            "html": _base_template("Bienvenue chez Mezzora Pizza", body),
        }
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email newsletter envoyé à {email}")
        return True
    except Exception as e:
        logger.error(f"Erreur email newsletter : {e}")
        return False


async def send_newsletter_notification(email: str, prenom: str = "") -> bool:
    """Notification envoyée au restaurateur quand quelqu'un s'inscrit à la newsletter."""
    if not settings.RESEND_API_KEY or not settings.RESTAURANT_EMAIL:
        return False

    resend.api_key = settings.RESEND_API_KEY
    body = f"""
    <h2 style="color:#16a34a;">📧 Nouvelle inscription newsletter !</h2>
    <div style="background:#f9f9f9;border-radius:6px;padding:20px;margin:20px 0;">
      <p><strong>Prénom :</strong> {prenom or 'Non renseigné'}</p>
      <p><strong>Email :</strong> {email}</p>
    </div>
    <p>Cet abonné a été automatiquement ajouté à Klaviyo.</p>
    """

    try:
        params = {
            "from": f"Mezzora Pizza <{settings.SENDER_EMAIL}>",
            "to": [settings.RESTAURANT_EMAIL],
            "subject": f"📧 Nouvelle inscription newsletter — {email}",
            "html": _base_template("Nouvelle inscription newsletter", body),
        }
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:
        logger.error(f"Erreur notification newsletter : {e}")
        return False


async def send_contact_email(contact) -> bool:
    """Email de contact envoyé au restaurateur."""
    if not settings.RESEND_API_KEY or not settings.RESTAURANT_EMAIL:
        return False

    resend.api_key = settings.RESEND_API_KEY
    
    subject_map = {
        "contact": "💬 Nouveau message",
        "reclamation": "⚠️ Nouvelle réclamation",
        "avis": "⭐ Nouvel avis client",
    }
    
    subj_attr = contact.subject if hasattr(contact, 'subject') else contact.get('subject', 'contact')
    name_attr = contact.name if hasattr(contact, 'name') else contact.get('name', 'Anonyme')
    email_attr = contact.email if hasattr(contact, 'email') else contact.get('email', '')
    msg_attr = contact.message if hasattr(contact, 'message') else contact.get('message', '')

    subject_prefix = subject_map.get(subj_attr, "📧 Nouveau message")
    sender = f"Mezzora Contact <{settings.SENDER_EMAIL}>"

    body = f"""
    <h2 style="color:#c0392b;">{subject_prefix}</h2>
    <div style="background:#f9f9f9;border-radius:6px;padding:20px;margin:20px 0;">
      <p><strong>De :</strong> {name_attr}</p>
      <p><strong>Email :</strong> {email_attr}</p>
    </div>
    <p style="white-space: pre-wrap;">{msg_attr}</p>
    """

    try:
        params = {
            "from": sender,
            "to": [settings.RESTAURANT_EMAIL],
            "subject": f"{subject_prefix} — {name_attr}",
            "html": _base_template("Message de contact", body),
        }
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:
        logger.error(f"Erreur email contact : {e}")
        return False