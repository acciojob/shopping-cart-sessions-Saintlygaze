const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Load cart data from session storage
function loadCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  displayCart(cart);
}

// Display the cart items on the page
function displayCart(cart) {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear previous items
  cart.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(listItem);
  });
}

// Save the cart to session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(product) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push(product);
  saveCart(cart);
  displayCart(cart);
}

// Clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  displayCart([]);
}

// Create the product list
function displayProducts() {
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.name} - $${product.price}`;
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => addToCart(product);
    listItem.appendChild(addButton);
    productList.appendChild(listItem);
  });
}

// Event listeners
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initial setup
displayProducts();
loadCart();
