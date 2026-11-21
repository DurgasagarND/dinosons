const cartItems = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const cartMenuToggle = document.getElementById('cartMenuToggle');
const cartHeaderLinks = document.getElementById('cartHeaderLinks');

cartMenuToggle?.addEventListener('click', () => {
  const open = cartHeaderLinks.classList.toggle('open');
  cartMenuToggle.setAttribute('aria-expanded', String(open));
});
cartHeaderLinks?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  cartHeaderLinks.classList.remove('open');
  cartMenuToggle?.setAttribute('aria-expanded', 'false');
});

function getCart() {
  try { return JSON.parse(localStorage.getItem('dinosonCart')) || []; }
  catch (_) { return []; }
}

function saveCart(cart) {
  localStorage.setItem('dinosonCart', JSON.stringify(cart));
  renderCart();
}

function priceNumber(price) {
  const text = String(price);
  const value = Number(text.replace(/[^0-9.]/g, '')) || 0;
  return text.includes('₹') ? value / 93.3 : value;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function formatPrice(price) {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function renderCart() {
  const cart = getCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartItemCount').textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'} ready for a cleaner home.`;
  document.getElementById('headerCartCount').textContent = String(itemCount);
  if (!cart.length) {
    cartItems.innerHTML = `<div class="cart-empty"><div>🛒</div><h2>Your cart is empty</h2><p>Add a Dinoson product and it will appear here.</p><a href="products.html" class="btn">Shop products</a></div>`;
  } else {
    cartItems.innerHTML = cart.map((item, index) => {
      const description = item.description || 'Engineered for everyday performance.';
      const highlights = Array.isArray(item.highlights) ? item.highlights : [];
      const isHairCare = item.category === 'hair' || /hair|styler/i.test(item.name);
      const fallbackImage = /fan/i.test(item.name)
        ? 'product-photos/fan.jpg'
        : isHairCare
          ? /styler/i.test(item.name) ? 'product-photos/hair-styler.jpg' : 'product-photos/hair-dryer.jpg'
          : item.category === 'air'
            ? 'product-photos/air-purifier-angle-1.png'
            : 'product-photos/stick-vacuum.jpg';
      const productImage = /^product-photos\/(?:clean\/)?[a-z-]+\.(?:jpg|png)$/.test(item.image || '') ? item.image : fallbackImage;
      const isSamplePrice = item.samplePrice === true;
      const isCatalogProduct = isSamplePrice && Number.isInteger(item.productIndex);
      const catalogImages = {
        0: 'product-photos/dinoson-hair-dryer.png',
        1: 'product-photos/dinoson-airwrap-styler.jpg',
        2: 'product-photos/dinoson-airstrait-straightener.jpg',
        3: 'product-photos/dinoson-corrale-straightener.jpg',
        5: 'product-photos/dinoson-cordless-vacuum.jpg',
        7: 'product-photos/dinoson-ball-animal-vacuum.jpg',
        9: 'product-photos/dinoson-robot-vacuum.jpg',
        10: 'product-photos/dinoson-wet-cleaner.jpg',
        11: 'product-photos/air-purifier-angle-1.png',
        12: 'product-photos/dinoson-hot-cool-purifier.jpg',
        13: 'product-photos/air-purifier-angle-3.jpg',
        14: 'product-photos/dinoson-cool-tower-fan.jpg',
        15: 'product-photos/dinoson-hot-cool-heater.jpg',
        16: 'product-photos/dinoson-zone-headphones.jpg',
        17: 'product-photos/dinoson-airblade-hand-dryer.jpg',
        18: 'product-photos/dinoson-handheld-vacuum.jpg'
      };
      const catalogImage = catalogImages[Number(item.productIndex)];
      const imageFit = catalogImage || /product-photos\/dinoson-[a-z-]+\./.test(productImage)
        ? ' style="object-fit:contain;background:#e8e7e4"'
        : '';
      const productArtwork = catalogImage
        ? `<img src="${catalogImage}" alt="Product image of ${escapeHTML(item.name)}" loading="lazy" decoding="async"${imageFit}>`
        : isCatalogProduct && item.visualType && typeof window.renderDinosonProductArt === 'function'
          ? window.renderDinosonProductArt(item.visualType, Number(item.productIndex), item.name)
          : `<img src="${productImage}" alt="Product image of ${escapeHTML(item.name)}" loading="lazy"${imageFit}>`;
      return `<article class="cart-item" style="--item-index:${index}">
      <div class="cart-product-art">${productArtwork}${isCatalogProduct ? '' : '<span class="stock-photo-label">Stock photo</span>'}</div>
      <div class="cart-product-info">
        <h2>${escapeHTML(item.name)}</h2>
        <p>${escapeHTML(description)}</p>
        <div class="cart-item-highlights">${highlights.map((highlight) => `<span>${escapeHTML(highlight)}</span>`).join('')}<span>5-year warranty</span></div>
        <div class="cart-unit-price"><span>${isSamplePrice ? 'Sample price per item' : 'Price per item'}</span><b>${escapeHTML(item.price)}</b></div>
      </div>
      <div class="quantity-control" aria-label="Quantity for ${escapeHTML(item.name)}">
        <button type="button" data-action="minus" data-index="${index}" aria-label="Decrease quantity">−</button>
        <span>${item.quantity}</span>
        <button type="button" data-action="plus" data-index="${index}" aria-label="Increase quantity">+</button>
      </div>
      <button type="button" class="remove-item" data-action="remove" data-index="${index}" aria-label="Remove ${escapeHTML(item.name)}">Remove</button>
      <div class="cart-line-total"><span>Item total</span><b>${formatPrice(priceNumber(item.price) * item.quantity)}</b></div>
    </article>`;
    }).join('');
  }

  const subtotal = cart.reduce((sum, item) => sum + priceNumber(item.price) * item.quantity, 0);
  subtotalElement.textContent = formatPrice(subtotal);
  totalElement.textContent = formatPrice(subtotal);
  document.getElementById('checkout').disabled = cart.length === 0;
}

cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const cart = getCart();
  const index = Number(button.dataset.index);
  if (button.dataset.action === 'plus') cart[index].quantity += 1;
  if (button.dataset.action === 'minus') {
    cart[index].quantity -= 1;
    if (cart[index].quantity < 1) cart.splice(index, 1);
  }
  if (button.dataset.action === 'remove') cart.splice(index, 1);
  saveCart(cart);
});

document.getElementById('checkout').addEventListener('click', () => {
  document.getElementById('checkoutMessage').textContent = 'Online payment is not available yet. Contact Dinosonb@gmail.com to place your order.';
});

window.addEventListener('dinoson-cart-updated', renderCart);
window.addEventListener('dinoson-product-art-ready', renderCart);
renderCart();
