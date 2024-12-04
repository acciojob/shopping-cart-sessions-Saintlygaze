// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Load cart from session storage (if any)
function loadCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  displayCart(cart);
}

// Display cart items on the page
function displayCart(cart) {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear previous items
  
  if (cart.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "Your cart is empty.";
    cartList.appendChild(emptyMessage);
  } else {
    cart.forEach(item => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - $${item.price}`;
      cartList.appendChild(listItem);
    });
  }
}

// Save cart to session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart (add only if not already in the cart)
function addToCart(product) {
  // Get cart from sessionStorage (or an empty array if none exists)
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  
  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.id === product.id);
  if (!existingProduct) {
    cart.push(product);  // Add the product if it is not already in the cart
  }

  // Save the updated cart back to sessionStorage
  saveCart(cart);
  
  // Update the display of the cart
  displayCart(cart);
}

// Clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");  // Remove cart from sessionStorage
  displayCart([]);  // Clear the cart display
}

// Create product list on the page
function displayProducts() {
  const productList = document.getElementById("product-list");
  
  products.forEach(product => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.name} - $${product.price}`;
    
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => addToCart(product); // Add product to cart when clicked
    
    listItem.appendChild(addButton);
    productList.appendChild(listItem);
  });
}

// Event listeners
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initialize page by displaying products and loading the cart
displayProducts();
loadCart();
