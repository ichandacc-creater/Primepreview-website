// app.js

function format(n){ return `ZMW ${n.toFixed(2)}`; }

// ---------- Product catalogs ----------
const phoneProducts = [
  { id:'ip8', brand:'apple', title:'iPhone 8', price: 5000, img:'assets/iphone8.jpg' },
  { id:'ip8plus', brand:'apple', title:'iPhone 8 Plus', price: 5500, img:'assets/iphone8plus.jpg' },
  { id:'ipx', brand:'apple', title:'iPhone X', price: 6000, img:'assets/iphonex.jpg' },
  { id:'ipxs', brand:'apple', title:'iPhone XS', price: 6500, img:'assets/iphonexs.jpg' },
  { id:'ipxsmax', brand:'apple', title:'iPhone XS Max', price: 7000, img:'assets/iphonexsmax.jpg' },
  { id:'ipxr', brand:'apple', title:'iPhone XR', price: 6200, img:'assets/iphonexr.jpg' },
  { id:'ip11', brand:'apple', title:'iPhone 11', price: 7000, img:'assets/iphone11.jpg' },
  { id:'ip11pro', brand:'apple', title:'iPhone 11 Pro', price: 8000, img:'assets/iphone11pro.jpg' },
  { id:'ip11promax', brand:'apple', title:'iPhone 11 Pro Max', price: 9000, img:'assets/iphone11promax.jpg' },
  { id:'ip12', brand:'apple', title:'iPhone 12', price: 9500, img:'assets/iphone12.jpg' },
  { id:'ip12mini', brand:'apple', title:'iPhone 12 Mini', price: 8800, img:'assets/iphone12mini.jpg' },
  { id:'ip12pro', brand:'apple', title:'iPhone 12 Pro', price: 10500, img:'assets/iphone12pro.jpg' },
  { id:'ip12promax', brand:'apple', title:'iPhone 12 Pro Max', price: 11500, img:'assets/iphone12promax.jpg' },
  { id:'ip13', brand:'apple', title:'iPhone 13', price: 10000, img:'assets/iphone13.jpg' },
  { id:'ip13mini', brand:'apple', title:'iPhone 13 Mini', price: 9200, img:'assets/iphone13mini.jpg' },
  { id:'ip13pro', brand:'apple', title:'iPhone 13 Pro', price: 11000, img:'assets/iphone13pro.jpg' },
  { id:'ip13promax', brand:'apple', title:'iPhone 13 Pro Max', price: 12000, img:'assets/iphone13promax.jpg' },
  { id:'ip14', brand:'apple', title:'iPhone 14', price: 11500, img:'assets/iphone14.jpg' },
  { id:'ip14plus', brand:'apple', title:'iPhone 14 Plus', price: 12500, img:'assets/iphone14plus.jpg' },
  { id:'ip14pro', brand:'apple', title:'iPhone 14 Pro', price: 13500, img:'assets/iphone14pro.jpg' },
  { id:'ip14promax', brand:'apple', title:'iPhone 14 Pro Max', price: 14500, img:'assets/iphone14promax.jpg' },
  { id:'ip15', brand:'apple', title:'iPhone 15', price: 12000, img:'assets/iphone15.jpg' },
  { id:'ip15plus', brand:'apple', title:'iPhone 15 Plus', price: 13000, img:'assets/iphone15plus.jpg' },
  { id:'ip15pro', brand:'apple', title:'iPhone 15 Pro', price: 14000, img:'assets/iphone15pro.jpg' },
  { id:'ip15promax', brand:'apple', title:'iPhone 15 Pro Max', price: 15000, img:'assets/iphone15promax.jpg' },
  { id:'ip16', brand:'apple', title:'iPhone 16', price: 12500, img:'assets/iphone16.jpg' },
  { id:'ip16plus', brand:'apple', title:'iPhone 16 Plus', price: 13500, img:'assets/iphone16plus.jpg' },
  { id:'ip16pro', brand:'apple', title:'iPhone 16 Pro', price: 14500, img:'assets/iphone16pro.jpg' },
  { id:'ip16promax', brand:'apple', title:'iPhone 16 Pro Max', price: 15500, img:'assets/iphone16promax.jpg' },
  { id:'ip17', brand:'apple', title:'iPhone 17', price: 13000, img:'assets/iphone17.jpg' },
  { id:'ip17pro', brand:'apple', title:'iPhone 17 Pro', price: 15000, img:'assets/iphone17pro.jpg' },
  { id:'ip17promax', brand:'apple', title:'iPhone 17 Pro Max', price: 16000, img:'assets/iphone17promax.jpg' },
];

// Stanley Cup with multiple color variants
const stanleyProducts = [
  {
    id:'stanley40',
    brand:'stanley',
    title:'Stanley Cup 40oz',
    price: 650,
    variants: [
      { color:'Black', img:'assets/stanley-black.jpg' },
      { color:'orange', img:'assets/stanley-orange.jpg' },
      { color:'Green', img:'assets/stanley-green.jpg' },
      { color:'Pink', img:'assets/stanley-pink.jpg' },
      { color:'purple', img:'assets/stanley-purple.jpg' },
      { color:'Gray', img:'assets/stanley-.jpg' },
    ]
  }
];

const clothingProducts = [
  { id:'shirt1', brand:'clothing&Shoes', title:'Prime Preview T‑Shirt', price: 1000, img:'assets/asics.jpg' },
  { id:'hoodie1', brand:'clothing&Shoes', title:'Prime Hoodie', price: 1000, img:'assets/TN.jpg' },
];

const accessoriesProducts = [
  { id:'case1', brand:'accessory', title:'iPhone 14 Case', price: 150, img:'assets/case.jpg' },
  { id:'charger1', brand:'accessory', title:'Fast Charger', price: 500, img:'assets/charger.jpg' },
];

const jewelryProducts = [
  { id:'necklace1', brand:'jewelry', title:'Gold Necklace', price: 2000, img:'assets/necklace.jpg' },
  { id:'ring1', brand:'jewelry', title:'Silver Ring', price: 1200, img:'assets/ring.jpg' },
];

// ---------- State ----------
const state = { cart: {}, filter: 'all' };

const els = {
  grid: document.getElementById('productGrid'),
  count: document.querySelector('[data-cart-count]'),
  drawer: document.querySelector('[data-cart-drawer]'),
  items: document.querySelector('[data-cart-items]'),
  subtotal: document.querySelector('[data-cart-subtotal]'),
  scrim: document.querySelector('[data-scrim]'),
};

// ---------- Render products ----------
function renderProducts(){
  if (!els.grid) return;

  const category = document.body.getAttribute('data-category') || 'phones';

  let list = [];
  if (category === 'phones') list = phoneProducts;
  if (category === 'stanley') list = stanleyProducts;
  if (category === 'clothing') list = clothingProducts;
  if (category === 'accessories') list = accessoriesProducts;
  if (category === 'jewelry') list = jewelryProducts;

  els.grid.innerHTML = list.map(p => {
    // Special handling for Stanley Cup with variants
    if (p.variants) {
      return `
        <article class="product-card" data-id="${p.id}">
          <div class="product-media"><img src="${p.variants[0].img}" alt="${p.title}"></div>
          <div class="product-meta">
            <div class="product-title">${p.title}</div>
            <div class="price">${format(p.price)}</div>
          </div>
          <label class="muted">Choose color:</label>
          <select data-color="${p.id}">
            ${p.variants.map(v => `<option value="${v.color}" data-img="${v.img}">${v.color}</option>`).join('')}
          </select>
          <button class="btn btn-primary" data-add="${p.id}">Add to cart</button>
        </article>
      `;
    }

    // Normal products
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media"><img src="${p.img}" alt="${p.title}"></div>
        <div class="product-meta">
          <div class="product-title">${p.title}</div>
          <div class="price">${format(p.price)}</div>
        </div>
        <button class="btn btn-primary" data-add="${p.id}">Add to cart</button>
      </article>
    `;
  }).join('');
}

// ---------- Render cart ----------
function renderCart(){
  const entries = Object.values(state.cart);
  els.items.innerHTML = entries.length ? entries.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.title}">
      <div>
        <strong>${item.title}</strong>
        ${item.color ? `<div class="muted">Color: ${item.color}</div>` : ''}
        <div class="muted">${format(item.price)} × ${item.qty}</div>
      </div>
      <div><strong>${format(item.price * item.qty)}</strong></div>
    </div>
  `).join('') : `<p class="muted">Your cart is empty.</p>`;

  const totalQty = entries.reduce((a,c)=>a+c.qty,0);
  const subtotal = entries.reduce((a,c)=>a+c.qty*c.price,0);
  els.count.textContent = totalQty;
  els.subtotal.textContent = format(subtotal);
}

// ---------- Drawer ----------
function openCart(open=true){
  els.drawer.classList.toggle('is-open', open);
  els.drawer.setAttribute('aria-hidden', (!open).toString());
  els.scrim.hidden = !open;
}

// ---------- Events ----------
document.addEventListener('click', e => {
  const t = e.target;

  if(t.matches('[data-cart-toggle]')) openCart(!els.drawer.classList.contains('is-open'));
  if(t.matches('[data-add]')){
    const id = t.getAttribute('data-add');
    const allProducts = [...phoneProducts, ...stanleyProducts, ...clothingProducts, ...accessoriesProducts, ...jewelryProducts];
    const p = allProducts.find(x=>x.id===id);

    let chosenColor = null, chosenImg = p.img;
    const select = document.querySelector(`select[data-color="${id}"]`);
    if(select){
      chosenColor = select.value;
      chosenImg = select.selectedOptions[0].dataset.img;
    }

    state.cart[id] = state.cart[id] || { ...p, qty:0 };
    state.cart[id].qty++;
    state.cart[id].color = chosenColor;
    state.cart[id].img = chosenImg;

    renderProducts(); renderCart(); openCart(true);
  }
});

// ---------- Live image switching for color selection ----------
document.addEventListener('change', e => {
  const select = e.target.closest('select[data-color]');
  if(select){
    const id = select.getAttribute('data-color');
    const chosenImg = select.selectedOptions[0].dataset.img;

    const card = document.querySelector(`article[data-id="${id}"]`);
    const imgEl = card.querySelector('.product-media img');
    if(imgEl) imgEl.src = chosenImg;
  }
});

// ---------- Init ----------
renderProducts();
renderCart();
