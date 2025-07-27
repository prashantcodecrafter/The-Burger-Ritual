
  let scrollIndex = 0;

  function scrollMenu(dir) {
    const container = document.getElementById("scrollable-menu");
    const itemWidth = 230 + 24; // item width + gap = 254
    const maxIndex = container.children.length - 4; // how many shifts possible

    scrollIndex += dir;
    if (scrollIndex < 0) scrollIndex = 0;
    if (scrollIndex > maxIndex) scrollIndex = maxIndex;

    const scrollX = scrollIndex * itemWidth;
    container.style.transform = `translateX(-${scrollX}px)`;
  }

// script.js

// script.js

  const cartItems = [];

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".menu-item");
      const name = item.querySelector("h3").textContent;

      // Check if item already in cart
      const existing = cartItems.find(obj => obj.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        cartItems.push({ name, qty: 1 });
      }

      updateCartTable();
    });
  });

  function updateCartTable() {
    const tbody = document.getElementById("cart-body");
    tbody.innerHTML = "";

    cartItems.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td><button onclick="removeFromCart(${index})">Remove</button></td>
      `;
      tbody.appendChild(row);
    });
  }

  function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartTable();
  }

//  add to cart 
// Add to Cart functionality
document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".add-to-cart");

  // Add to Cart from index.html
  cartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseInt(btn.getAttribute("data-price"));
      const img = btn.getAttribute("data-img");

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, img, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} added to cart!`);
    });
  });

  // Cart page rendering and update
  if (document.getElementById("cart-list")) {
    renderCart();
  }
});

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total-price");

  cartList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}" width="60">
      <div>
        <h4>${item.name}</h4>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: 
          <button onclick="updateQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </p>
      </div>
    `;
    cartList.appendChild(itemDiv);
  });

  totalElement.textContent = `Total: ₹${total}`;
}

function updateQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart[index]) return;

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
document.getElementById("order").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }

    alert("Order is ordered. Deliver soon! 🚚🍔");

    // Clear the cart
    localStorage.removeItem("cart");

    // Reload the page to reflect empty cart
    location.reload();
  });
