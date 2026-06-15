import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getCartTotal, formatPrice, applyTwoForThreeOffer } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart,
    deliveryMethod,
    setDeliveryMethod 
  } = useCart();
  
  const navigate = useNavigate();

  const subtotal = getCartTotal(cartItems);
  const { discount, message } = applyTwoForThreeOffer(cartItems);
  const deliveryFee = deliveryMethod === 'livraison' ? 6.0 : 0;
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={toggleCart}
      ></div>

      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-primary-bg">
          <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Votre Panier
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">Votre panier est vide</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-card-bg p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-black">
                        {item.name}
                        {item.size !== 'standard' && (
                          <span className="text-sm text-gray-600 ml-2">
                            ({item.size})
                          </span>
                        )}
                      </h3>
                      {item.ingredients && (
                        <p className="text-xs text-gray-500 mt-1">{item.ingredients}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-green-600">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mode de retrait :
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeliveryMethod('emporter')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      deliveryMethod === 'emporter'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    À Emporter
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('livraison')}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      deliveryMethod === 'livraison'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Livraison
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-semibold">{message}</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}

                {deliveryMethod === 'livraison' && (
                  <div className="flex justify-between">
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

              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105"
              >
                Commander - {formatPrice(total)}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
