# 🍕 Mezzora Pizza — Backend API

API FastAPI pour la commande en ligne, paiement Stripe et notifications email.

---

## 🗂 Structure du projet

```
backend/
├── server.py              ← Point d'entrée principal
├── requirements.txt       ← Dépendances (allégées)
├── .env.example           ← Template de configuration (à copier en .env)
├── .gitignore
│
├── core/
│   ├── config.py          ← Variables d'environnement centralisées
│   ├── database.py        ← Connexion MongoDB partagée (singleton)
│   └── email_service.py   ← Emails client + restaurateur via Resend
│
├── models/
│   ├── order.py           ← Modèles Pydantic pour les commandes
│   └── contact.py         ← Modèle Pydantic pour le formulaire de contact
│
└── routes/
    ├── orders.py          ← Commandes, Stripe, webhook
    └── contact.py         ← Formulaire de contact
```

---

## 🚀 Installation

### 1. Cloner / copier le dossier backend

### 2. Créer un environnement virtuel
```bash
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
```

### 3. Installer les dépendances
```bash
pip install -r requirements.txt
```

### 4. Configurer les variables d'environnement
```bash
cp .env.example .env
```
Puis éditer `.env` avec vos vraies clés.

### 5. Lancer le serveur
```bash
uvicorn server:app --reload --port 8001
```

L'API est disponible sur `http://localhost:8001`  
La documentation interactive : `http://localhost:8001/docs`

---

## 🔑 Variables d'environnement requises

| Variable | Description |
|---|---|
| `MONGO_URL` | URL de connexion MongoDB |
| `DB_NAME` | Nom de la base de données |
| `STRIPE_API_KEY` | Clé secrète Stripe (`sk_...`) |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe (`whsec_...`) |
| `RESEND_API_KEY` | Clé API Resend pour les emails |
| `SENDER_EMAIL` | Email expéditeur (vérifié sur Resend) |
| `RESTAURANT_EMAIL` | Votre email pour recevoir les nouvelles commandes |

---

## 📡 Endpoints

| Méthode | URL | Description |
|---|---|---|
| `GET` | `/api/health` | Santé de l'API |
| `POST` | `/api/orders/create-checkout` | Crée une session Stripe |
| `GET` | `/api/orders/payment-status/{session_id}` | Vérifie le paiement |
| `POST` | `/api/orders/webhook/stripe` | Webhook Stripe |
| `GET` | `/api/orders/` | Liste toutes les commandes (admin) |
| `GET` | `/api/orders/{order_id}` | Détail d'une commande (admin) |
| `POST` | `/api/contact/` | Soumet un message de contact |
| `GET` | `/api/contact/` | Liste les messages (admin) |

---

## 🔒 Sécurité

- Le **total de la commande est recalculé côté serveur** avant de créer la session Stripe — un utilisateur ne peut pas modifier le prix depuis le navigateur.
- Le **webhook Stripe est vérifié** par signature cryptographique.
- Le fichier `.env` est dans `.gitignore` — ne jamais le committer.

---

## 📦 Déploiement

Compatible avec **Railway**, **Render**, **Fly.io**.  
Commande de démarrage : `uvicorn server:app --host 0.0.0.0 --port 8001`
