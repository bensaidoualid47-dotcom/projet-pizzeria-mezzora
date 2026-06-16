import React, { useState, useEffect } from 'react';
import { messaging, getToken, onMessage, VAPID_KEY } from '../firebase';

const NotificationPrompt = () => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | denied

  useEffect(() => {
    if (!('Notification' in window) || !messaging) return;
    if (Notification.permission === 'granted') {
      getToken(messaging, { vapidKey: VAPID_KEY })
        .then(token => { if (token) console.log('🔑 FCM Token:', token); })
        .catch(err => console.error('FCM token error:', err));
    }
  }, []);

  useEffect(() => {
    if (!messaging) return;
    const unsubscribe = onMessage(messaging, (payload) => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      const { title, body } = payload.notification || {};
      new Notification(title || 'Mezzora Pizza', {
        body: body || '',
        icon: '/logo192.png',
      });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // N'afficher que si les notifs sont supportées et pas encore décidées
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
    if (Notification.permission !== 'default') return;
    const dismissed = localStorage.getItem('notif_prompt_dismissed');
    if (dismissed) return;

    // Afficher après 4 secondes
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = async () => {
    setStatus('loading');
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (token) {
          const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
          fetch(`${backendUrl}/api/notifications/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          }).catch(() => {});
        }
        setStatus('success');
        localStorage.setItem('notif_prompt_dismissed', '1');
        setTimeout(() => setVisible(false), 2500);
      } else {
        setStatus('denied');
        localStorage.setItem('notif_prompt_dismissed', '1');
        setTimeout(() => setVisible(false), 1500);
      }
    } catch (err) {
      console.error('Erreur notification:', err);
      setStatus('denied');
      setTimeout(() => setVisible(false), 1500);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('notif_prompt_dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        .notif-prompt {
          position: fixed;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: calc(100% - 32px);
          max-width: 420px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          padding: 18px 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          animation: slideUpPrompt 0.4s cubic-bezier(0.23,1,0.32,1);
          border: 1px solid #f0f0f0;
        }

        @keyframes slideUpPrompt {
          from { opacity: 0; transform: translateX(-50%) translateY(30px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .notif-prompt-icon {
          font-size: 2rem;
          flex-shrink: 0;
          line-height: 1;
        }

        .notif-prompt-body {
          flex: 1;
        }

        .notif-prompt-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #111;
          margin: 0 0 3px 0;
        }

        .notif-prompt-sub {
          font-size: 0.78rem;
          color: #666;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }

        .notif-prompt-actions {
          display: flex;
          gap: 8px;
        }

        .notif-btn-yes {
          background: #e53e3e;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .notif-btn-yes:hover { background: #c42e2e; }

        .notif-btn-no {
          background: #f5f5f5;
          color: #666;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .notif-btn-no:hover { background: #e8e8e8; }

        .notif-prompt-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #bbb;
          font-size: 1.1rem;
          line-height: 1;
          padding: 0;
          flex-shrink: 0;
        }

        .notif-success {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #16a34a;
          font-weight: 700;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="notif-prompt">
        <span className="notif-prompt-icon">🍕</span>

        <div className="notif-prompt-body">
          {status === 'success' ? (
            <p className="notif-success">✅ Super ! Tu recevras nos offres.</p>
          ) : status === 'loading' ? (
            <p className="notif-prompt-title">Activation en cours...</p>
          ) : (
            <>
              <p className="notif-prompt-title">Offres & promotions Mezzora</p>
              <p className="notif-prompt-sub">
                Reçois nos bons plans directement sur ton téléphone ou ordinateur.
              </p>
              <div className="notif-prompt-actions">
                <button className="notif-btn-yes" onClick={handleAccept}>
                  Oui, je veux !
                </button>
                <button className="notif-btn-no" onClick={handleDismiss}>
                  Non merci
                </button>
              </div>
            </>
          )}
        </div>

        {status === 'idle' && (
          <button className="notif-prompt-close" onClick={handleDismiss}>✕</button>
        )}
      </div>
    </>
  );
};

export default NotificationPrompt;
