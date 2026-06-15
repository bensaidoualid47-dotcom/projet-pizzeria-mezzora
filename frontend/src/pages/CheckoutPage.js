import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getCartTotal, formatPrice, applyTwoForThreeOffer } from '../utils/cartUtils';
import { ArrowLeft, CreditCard, Loader } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, deliveryMethod, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  const subtotal = getCartTotal(cartItems);
  const { discount, message } = applyTwoForThreeOffer(cartItems);
  const deliveryFee = deliveryMethod === 'livraison' ? 6.0 : 0;
  const total = subtotal - discount + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (deliveryMethod === 'livraison' && (!formData.address || !formData.city || !formData.postalCode)) {
      setError('Veuillez renseigner votre adresse de livraison complète');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        customer: formData,
        items: cartItems,
        deliveryMethod,
        subtotal,
        discount,
        deliveryFee,
        total,
      };

      const response = await axios.post(`${BACKEND_URL}/api/orders/create-checkout`, {
        orderData,
        originUrl: window.location.origin,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Aucune URL de paiement reçue');
      }
    } catch (err) {
      console.error('Erreur lors de la création de la commande:', err);
      setError('Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour au menu
        </button>

        <h1 className="text-4xl font-bold text-black mb-8">Finaliser la commande</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Vos informations</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {deliveryMethod === 'livraison' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse de livraison *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes / Instructions spéciales
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Digicode, étage, préférences..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Procéder au paiement
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-6">Récapitulatif</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {item.name}
                        {item.size !== 'standard' && ` (${item.size})`}
                      </p>
                      <p className="text-gray-500 text-xs">Qté: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="font-semibold">{message}</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}

                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frais de livraison</span>
                    <span className="font-semibold">{formatPrice(deliveryFee)}</span>
                  </div>
                )}

                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Mode de retrait:</strong> {deliveryMethod === 'emporter' ? 'À emporter' : 'Livraison'}
                </p>
                <p className="text-xs text-gray-600">
                  Paiement sécurisé par Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
