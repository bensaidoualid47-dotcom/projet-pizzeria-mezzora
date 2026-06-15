importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCYctgps_cVb23aJmtVLLmjpZzFVDgjdhQ",
  authDomain: "mezzora-pizza.firebaseapp.com",
  projectId: "mezzora-pizza",
  storageBucket: "mezzora-pizza.firebasestorage.app",
  messagingSenderId: "754666025391",
  appId: "1:754666025391:web:e41151cba9e3bf4c263f5a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Mezzora Pizza', {
    body: body || '',
    icon: icon || '/logo192.png',
    badge: '/logo192.png',
  });
});
