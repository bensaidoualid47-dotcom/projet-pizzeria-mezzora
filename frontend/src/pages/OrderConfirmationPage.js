import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  
  const [status, setStatus] = useState('checking'); // checking, success, error
  const [orderData, setOrderData] = useState(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const pollPaymentStatus = async (attempts = 0) => {
      const maxAttempts = 10;
      const pollInterval = 2000;

      if (attempts >= maxAttempts) {
        setStatus('error');
        return;
      }

      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/orders/payment-status/${sessionId}`
        );

        if (response.data.payment_status === 'paid') {
          setStatus('success');
          setOrderData(response.data);
          clearCart();
          return;
        } else if (response.data.status === 'expired') {
          setStatus('error');
          return;
        }

        setTimeout(() => pollPaymentStatus(attempts + 1), pollInterval);
      } catch (error) {
        console.error('Erreur lors de la vérification du paiement:', error);
        if (attempts < maxAttempts - 1) {
          setTimeout(() => pollPaymentStatus(attempts + 1), pollInterval);
        } else {
          setStatus('error');
        }
      }
    };

    pollPaymentStatus();
  }, [sessionId, clearCart]);

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">
            Vérification de votre paiement...
          </h2>
          <p className="text-gray-600">Veuillez patienter quelques instants</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-black mb-4">
            Erreur de paiement
          </h2>
          <p className="text-gray-600 mb-6">
            Une erreur est survenue lors du traitement de votre paiement. 
            Veuillez réessayer ou nous contacter si le problème persiste.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-black mb-2">
            Commande confirmée !
          </h1>
          <p className="text-gray-600 text-lg">
            Merci pour votre commande chez Mezzora Pizza
          </p>
        </div>

        {orderData && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-black mb-3">
                Détails de la commande
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Numéro de commande:</span>
                  <span className="font-semibold">{orderData.order_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant total:</span>
                  <span className="font-bold text-green-600">
                    {(orderData.amount_total / 100).toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode de retrait:</span>
                  <span className="font-semibold">
                    {orderData.metadata?.deliveryMethod === 'emporter' 
                      ? 'À emporter' 
                      : 'Livraison'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-green-800">
                <strong>✓ Un email de confirmation a été envoyé</strong> à votre adresse email 
                avec tous les détails de votre commande.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-yellow-800">
                <strong>⏱ Temps de préparation:</strong> Votre commande sera prête dans 
                environ 20-30 minutes. Nous vous appellerons dès qu'elle sera prête.
              </p>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => navigate('/')}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 inline-flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
