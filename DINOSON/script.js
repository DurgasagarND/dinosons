document.documentElement.classList.add('js');
const $ = (id) => document.getElementById(id);

const h1 = $('h1');
if (h1) {
  const words = h1.textContent.split(' ');
  h1.innerHTML = words.map((word, index) => `<span class="ch${index >= words.length - 2 ? ' gt' : ''}" style="animation-delay:${0.5 + index * 0.14}s">${word}</span>`).join(' ');
}

const marqueeItems = ['Raptor Cyclone', 'Whisper quiet', 'Smart Sense', 'Sealed HEPA', 'Laser Detect', 'Rex V12', 'Long-life power'];
if ($('mt')) $('mt').innerHTML = marqueeItems.concat(marqueeItems).map((item) => `<span>✦ ${item}</span>`).join('');

const nav = $('nav');
const links = $('links');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('s', window.scrollY > 20);
  const max = document.body.scrollHeight - window.innerHeight;
  if ($('pb')) $('pb').style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
});
$('burger')?.addEventListener('click', () => {
  const open = links?.classList.toggle('o') ?? false;
  $('burger').setAttribute('aria-expanded', String(open));
});
links?.addEventListener('click', () => {
  links.classList.remove('o');
  $('burger')?.setAttribute('aria-expanded', 'false');
});
window.addEventListener('mousemove', (event) => {
  const glow = $('cg');
  if (glow) { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }
});

const products = [
  ['Rex V12 Vacuum', 'Cordless with Laser Detect', '$1,638.74', 'vac', '#7c3aed', '#db2777', 'Best seller', '230 AW', '90 min', 5],
  ['Rex V8 Slim', 'Light, nimble everyday cleaner', '$1,949.67', 'vac', '#2563eb', '#7c3aed', 'Value', '150 AW', '60 min', 21],
  ['Tri Air Purifier', 'Purifies and cools the room', '$1,162.57', 'air', '#0891b2', '#6366f1', 'New', 'HEPA H13', 'Quiet', 11],
  ['Raptor Fan', 'Bladeless fan, powerful airflow', '$1,300.54', 'air', '#059669', '#0891b2', 'Popular', '10 speeds', 'Remote'],
  ['Stego Hair Dryer', 'Fast drying, smart heat control', '$1,387.42', 'hair', '#ea580c', '#db2777', 'Hot', 'Fast dry', 'Ionic', 0],
  ['Stego Styler', 'Curl, wave and smooth, no heat damage', '$1,729.86', 'hair', '#d97706', '#be185d', 'New', 'Coanda', '6 heads', 1]
];

const productPhotos = {
  'Rex V12 Vacuum': { dummy: true, position: '50% 50%' },
  'Rex V8 Slim': { src: 'product-photos/stick-vacuum.jpg', position: '50% 55%' },
  'Tri Air Purifier': { src: 'product-photos/air-purifier-angle-2.jpg', position: '50% 54%', placeholder: false },
  'Raptor Fan': { noImage: true },
  'Stego Hair Dryer': { src: 'product-photos/hair-dryer.jpg', position: '50% 50%' },
  'Stego Styler': { src: 'product-photos/dinoson-multi-styler.jpg', position: '50% 50%', fit: 'contain', placeholder: false }
};

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem('dinosonCart') || '[]');
    if (!Array.isArray(cart)) throw new TypeError('The saved cart is not a list.');
    return cart;
  } catch (error) {
    console.error('Unable to read the saved cart.', error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('dinosonCart', JSON.stringify(cart));
  const count = $('cn');
  if (count) count.textContent = String(cart.reduce((sum, item) => sum + item.quantity, 0));
  window.dispatchEvent(new Event('dinoson-cart-updated'));
}

function getCompareSelections() {
  try {
    const selections = JSON.parse(localStorage.getItem('dinosonCompare') || '[]');
    if (!Array.isArray(selections)) throw new TypeError('The saved comparison is not a list.');
    return selections.filter((index) => Number.isInteger(index)).slice(0, 2);
  } catch (error) {
    console.error('Unable to read the saved product comparison.', error);
    return [];
  }
}

function updateFeaturedProductActions() {
  const grid = $('grid');
  if (!grid) return;
  const cart = getCart();
  const comparisons = getCompareSelections();
  grid.querySelectorAll('.featured-product-remove').forEach((button) => {
    const inCart = cart.some((item) => String(item.id) === button.dataset.cartId);
    button.disabled = !inCart;
    button.setAttribute('aria-label', inCart ? 'Remove product from cart' : 'Product is not in cart');
  });
  grid.querySelectorAll('.featured-product-compare').forEach((button) => {
    const selected = comparisons.includes(Number(button.dataset.productIndex));
    button.textContent = selected ? 'Selected' : 'Compare';
    button.setAttribute('aria-pressed', String(selected));
    button.setAttribute('aria-label', selected ? 'Product selected for comparison' : 'Add product to comparison');
  });
}

function renderProducts(filter) {
  const grid = $('grid');
  if (!grid) return;
  const filtered = products.filter((product) => {
    const photo = productPhotos[product[0]];
    return photo.src && !photo.dummy && !photo.noImage && (filter === 'all' || product[3] === filter);
  });
  grid.classList.toggle('product-grid--balanced', filtered.length === 4);
  grid.innerHTML = filtered.map((product, index) => {
    const photo = productPhotos[product[0]];
    const cartId = String(products.indexOf(product));
    const isPlaceholder = photo.placeholder !== false;
    const imageAlt = isPlaceholder ? `Temporary stock photo placeholder for ${product[0]}` : `${product[0]} product image`;
    const imageFit = photo.fit || 'cover';
    const imageBackground = photo.fit === 'contain' ? ';background:#e8e7e4' : '';
    const imageMarkup = photo.noImage
      ? ''
      : photo.dummy
      ? `<div class="product-image-placeholder" role="img" aria-label="Product image placeholder for ${product[0]}">Product image coming soon</div>`
      : `<img src="${photo.src}" alt="${imageAlt}" loading="lazy" style="object-fit:${imageFit};object-position:${photo.position}${imageBackground}">`;
    const imageBlock = photo.noImage ? '' : `<div class="ph" style="--h1:${product[4]};--h2:${product[5]}">${imageMarkup}<em>${product[6]}</em>${isPlaceholder && !photo.dummy ? '<span class="stock-photo-label">Stock photo · placeholder</span>' : ''}</div>`;
    return `<div class="card" data-id="${products.indexOf(product)}" style="animation-delay:${index * 0.08}s">
    ${imageBlock}
    <h3>${product[0]}</h3><p>${product[1]}</p>
    <div class="sp"><span>${product[7]}</span><span>${product[8]}</span><span>5-year warranty</span></div>
    <div class="pr"><b>${product[2]}</b><div class="featured-product-actions"><button class="product-action-buy" type="button">Add to cart</button><button class="featured-product-remove" type="button" data-cart-id="${cartId}" aria-label="Product is not in cart" disabled>Remove</button><button class="featured-product-compare" type="button" data-product-index="${product[9]}" aria-pressed="false">Compare</button></div></div>
  </div>`;
  }).join('');
  updateFeaturedProductActions();
}
renderProducts('all');
saveCart(getCart());
window.addEventListener('dinoson-cart-updated', updateFeaturedProductActions);
window.addEventListener('dinoson-compare-updated', updateFeaturedProductActions);

$('tabs')?.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  $('tabs').querySelectorAll('button').forEach((tab) => tab.classList.toggle('on', tab === button));
  renderProducts(button.dataset.f);
});

$('grid')?.addEventListener('click', (event) => {
  const compareButton = event.target.closest('.featured-product-compare');
  if (compareButton) {
    const index = Number(compareButton.dataset.productIndex);
    const comparisons = getCompareSelections();
    const existingIndex = comparisons.indexOf(index);
    if (existingIndex >= 0) comparisons.splice(existingIndex, 1);
    else if (comparisons.length >= 2) {
      const status = document.querySelector('.product-compare-status');
      if (status) {
        status.hidden = false;
        status.textContent = 'Choose only two products. Remove one selected product before adding another.';
      }
      return;
    } else comparisons.push(index);

    try {
      localStorage.setItem('dinosonCompare', JSON.stringify(comparisons));
    } catch (error) {
      console.error('Unable to save the product comparison.', error);
      return;
    }
    window.dispatchEvent(new CustomEvent('dinoson-compare-updated', { detail: comparisons.slice() }));
    updateFeaturedProductActions();
    return;
  }

  const removeButton = event.target.closest('.featured-product-remove');
  const button = event.target.closest('.product-action-buy');
  if (removeButton) {
    const cart = getCart();
    const updatedCart = cart.filter((item) => String(item.id) !== removeButton.dataset.cartId);
    if (updatedCart.length === cart.length) {
      updateFeaturedProductActions();
      return;
    }
    try {
      saveCart(updatedCart);
    } catch (error) {
      console.error('Unable to remove the product from the cart.', error);
      removeButton.textContent = 'Unable to remove';
    }
    return;
  }
  if (!button) return;
  const card = button.closest('.card');
  const product = products[Number(card.dataset.id)];
  const cart = getCart();
  const existing = cart.find((item) => item.id === card.dataset.id);
  if (existing) existing.quantity += 1;
  else cart.push({
    id: card.dataset.id,
    name: product[0],
    price: product[2],
    quantity: 1,
    category: product[3],
    description: product[1],
    highlights: [product[7], product[8]],
    color: product[4],
    accent: product[5],
    image: productPhotos[product[0]].src,
    samplePrice: true
  });
  try {
    saveCart(cart);
  } catch (error) {
    console.error('Unable to save the product to the cart.', error);
    button.textContent = 'Unable to add';
    return;
  }
  updateFeaturedProductActions();
  const count = $('cn');
  if (count) {
    count.parentNode.classList.remove('bump');
    void count.offsetWidth;
    count.parentNode.classList.add('bump');
  }
  button.textContent = 'Added ✓';
  setTimeout(() => { button.textContent = 'Add to cart'; }, 1200);
});

const grid = $('grid');
if (grid && window.matchMedia('(hover: hover)').matches) {
  grid.addEventListener('mousemove', (event) => {
    const card = event.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-8px)`;
  });
  grid.addEventListener('mouseleave', () => grid.querySelectorAll('.card').forEach((card) => { card.style.transform = ''; }));
}

const stage = $('stage');
const productWrap = $('pw');
if (stage && productWrap && window.matchMedia('(hover: hover)').matches) {
  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    productWrap.style.transform = `perspective(900px) rotateY(${x * 26}deg) rotateX(${-y * 26}deg)`;
  });
  stage.addEventListener('mouseleave', () => { productWrap.style.transform = ''; });
}

const faqs = [
  ['How long does the battery last?', 'Runtime depends on the product, selected mode and attachments. Check the product details and user guide for your model.'],
  ['Is there a warranty?', 'Dinoson products include a 5-year parts and labour warranty, subject to the terms provided with your purchase.'],
  ['Do you deliver across India?', 'Delivery availability and timing depend on your location. Contact our support team with your pin code to confirm options.'],
  ['Can I return a product?', 'Eligible products may be returned within the 30-day home trial period, subject to the terms provided with your purchase. Contact support for current steps.']
];
if ($('fq')) $('fq').innerHTML = faqs.map((faq) => `<details><summary>${faq[0]}</summary><p>${faq[1]}</p></details>`).join('');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.rv').forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 100}ms`;
    observer.observe(element);
  });
}


