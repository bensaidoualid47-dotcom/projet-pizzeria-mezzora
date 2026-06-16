import React, { useState } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

export default function AdminNotificationsPage() {
  const [key, setKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('/');
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [result, setResult] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (key.trim()) setAuthenticated(true);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setStatus('sending');
    setResult(null);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${BACKEND_URL}/api/notifications/send`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 15000;

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          setStatus('success');
          setResult(data);
          setTitle('');
          setBody('');
        } else {
          setStatus('error');
          setResult({ message: data.detail || `Erreur ${xhr.status}` });
        }
      } catch {
        setStatus('error');
        setResult({ message: `Réponse invalide (${xhr.status})` });
      }
    };

    xhr.onerror = () => {
      setStatus('error');
      setResult({ message: 'Impossible de contacter le serveur' });
    };

    xhr.ontimeout = () => {
      setStatus('error');
      setResult({ message: 'Délai dépassé — réessaie dans quelques secondes' });
    };

    xhr.send(JSON.stringify({ title: title.trim(), body: body.trim(), url, admin_key: key }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.logo}>🍕</span>
          <h1 style={styles.title}>Mezzora — Admin</h1>
          <p style={styles.subtitle}>Notifications push</p>
        </div>

        {!authenticated ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <label style={styles.label}>Clé administrateur</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="••••••••••••••"
              style={styles.input}
              autoFocus
            />
            <button type="submit" style={styles.btnPrimary}>
              Accéder
            </button>
          </form>
        ) : (
          <form onSubmit={handleSend} style={styles.form}>
            <label style={styles.label}>Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Offre du soir 🍕"
              style={styles.input}
              maxLength={80}
              required
            />

            <label style={styles.label}>Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="ex: -20% sur toutes les pizzas jusqu'à 22h30 !"
              style={{ ...styles.input, height: 90, resize: 'vertical' }}
              maxLength={200}
              required
            />

            <label style={styles.label}>Lien (optionnel)</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="/"
              style={styles.input}
            />

            <button
              type="submit"
              style={{ ...styles.btnPrimary, opacity: status === 'sending' ? 0.7 : 1 }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer à tous les abonnés'}
            </button>

            {status === 'success' && result && (
              <div style={styles.success}>
                ✅ Envoyé avec succès — {result.sent} appareil{result.sent !== 1 ? 's' : ''} atteint{result.sent !== 1 ? 's' : ''}
                {result.failed > 0 && ` (${result.failed} échec)`}
              </div>
            )}
            {status === 'error' && result && (
              <div style={styles.error}>❌ {result.message}</div>
            )}

            <button
              type="button"
              onClick={() => { setAuthenticated(false); setKey(''); setStatus(null); }}
              style={styles.btnSecondary}
            >
              Déconnexion
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f7f7f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: 20,
    boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
    padding: '36px 32px',
    width: '100%',
    maxWidth: 440,
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  logo: {
    fontSize: '2.4rem',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#111',
    margin: '8px 0 4px',
  },
  subtitle: {
    color: '#888',
    fontSize: '0.88rem',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  label: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#444',
    marginBottom: -4,
  },
  input: {
    border: '1.5px solid #e0e0e0',
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  btnPrimary: {
    background: '#e53e3e',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '13px',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 4,
    transition: 'background 0.2s',
  },
  btnSecondary: {
    background: 'none',
    color: '#aaa',
    border: 'none',
    fontSize: '0.82rem',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: 4,
    textDecoration: 'underline',
  },
  success: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
    borderRadius: 10,
    padding: '12px 14px',
    fontSize: '0.88rem',
    fontWeight: 600,
  },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    borderRadius: 10,
    padding: '12px 14px',
    fontSize: '0.88rem',
    fontWeight: 600,
  },
};
