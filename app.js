// app.js

const CART_KEY = "prime_preview_cart";

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = count;
}

// ---------- STORE PAGE ----------
function initStore() {
  updateCartCount();
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;

      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = card.dataset.price ? Number(card.dataset.price) : null;
      const image = card.dataset.image;

      let cart = getCart();
      const existing = cart.find(i => i.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, name, price, image, qty: 1 });
      }
      saveCart(cart);

      e.target.textContent = "Added ✓";
      setTimeout(() => (e.target.textContent = "Add to cart"), 1000);
    });
  });
}

// ---------- CART PAGE ----------
function initCartPage() {
  updateCartCount();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const clearBtn = document.getElementById("clear-cart");

  let cart = getCart();

  function render() {
    container.innerHTML = "";
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalEl.textContent = "K0";
      return;
    }

    let total = 0;
    cart.forEach(item => {
      if (typeof item.price === "number") {
        total += item.price * item.qty;
      }

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h4>${item.name}</h4>
          <p class="item-price">${item.price ? `K${item.price.toLocaleString()}` : "Price on inquiry"}</p>
        </div>
        <div class="qty">
          <button data-action="dec" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button data-action="inc" data-id="${item.id}">+</button>
        </div>
        <button class="btn outline" data-action="remove" data-id="${item.id}">Remove</button>
      `;
      container.appendChild(row);
    });

    totalEl.textContent = `K${total.toLocaleString()}`;
  }

  // Handle quantity and remove
  container.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    if (!action || !id) return;

    const idx = cart.findIndex(i => i.id === id);
    if (idx === -1) return;

    if (action === "inc") cart[idx].qty += 1;
    if (action === "dec") cart[idx].qty = Math.max(1, cart[idx].qty - 1);
    if (action === "remove") cart.splice(idx, 1);

    saveCart(cart);
    render();
  });

  clearBtn.addEventListener("click", () => {
    cart = [];
    saveCart(cart);
    render();
  });

  render();
}

// ---------- BOOTSTRAP ----------
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".grid")) initStore();
  if (document.getElementById("checkout-form") || document.getElementById("cart-items")) initCartPage();
  updateCartCount();
});
