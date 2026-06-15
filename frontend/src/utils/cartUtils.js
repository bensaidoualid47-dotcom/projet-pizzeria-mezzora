export const getCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const formatPrice = (price) => {
  return price.toFixed(2) + ' €';
};

export const calculateDeliveryPrice = (basePrice, deliveryMethod) => {
  if (deliveryMethod === 'emporter') {
    return basePrice;
  }
  // Add delivery fee for 'livraison'
  return basePrice + 6.0;
};

export const applyTwoForThreeOffer = (cartItems) => {
  // Filter pizza items only
  const pizzas = cartItems.filter(item => item.category === 'pizza');
  
  if (pizzas.length >= 3) {
    // Sort pizzas by price (ascending)
    const sortedPizzas = [...pizzas].sort((a, b) => a.price - b.price);
    
    // Get the cheapest pizza price
    const cheapestPizzaPrice = sortedPizzas[0].price;
    
    // Calculate number of free pizzas (1 free for every 2 bought)
    const freePizzas = Math.floor(pizzas.length / 3);
    const discount = cheapestPizzaPrice * freePizzas;
    
    return {
      discount,
      message: `${freePizzas} pizza${freePizzas > 1 ? 's' : ''} offerte${freePizzas > 1 ? 's' : ''} !`,
    };
  }
  
  return { discount: 0, message: '' };
};
