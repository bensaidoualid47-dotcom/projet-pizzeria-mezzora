import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCYctgps_cVb23aJmtVLLmjpZzFVDgjdhQ",
  authDomain: "mezzora-pizza.firebaseapp.com",
  projectId: "mezzora-pizza",
  storageBucket: "mezzora-pizza.firebasestorage.app",
  messagingSenderId: "754666025391",
  appId: "1:754666025391:web:e41151cba9e3bf4c263f5a"
};

const app = initializeApp(firebaseConfig);

let messaging = null;
try {
  messaging = getMessaging(app);
} catch (e) {
  // Navigateur non supporté (ex: iOS Safari)
}
export { messaging };

export const VAPID_KEY = 'BKPAvW5RQ4vZePtDiqLf6H24QjVRYqFdPRjHtTqgFxskDzp0dk6gMotGkPJG2t4HyHaVPHTTD6tpYDnYDwA8m8A';

export { getToken, onMessage };
