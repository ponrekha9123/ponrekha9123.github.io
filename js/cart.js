// js/cart.js
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

// Function to add item to cart (can be called from any page)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += product.quantity || 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  // Show notification if on a product page
  if (document.querySelector('.add-to-cart')) {
    showNotification(`${product.name} added to cart!`);
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
  notification.style.zIndex = '9999';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
