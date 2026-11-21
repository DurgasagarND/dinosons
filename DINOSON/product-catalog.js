const catalogProducts = [
  ['Dinoson Supersonic Hair Dryer', 'Hair care', 'Fast drying with no extreme heat.', 1387.42, 'hair-dryer'],
  ['Dinoson Airwrap Multi-Styler', 'Hair care', 'Curl, shape and smooth with versatile styling.', 1729.86, 'multi-styler'],
  ['Dinoson Airstrait Straightener', 'Hair care', 'Dry to sleek, straight with air.', 1542.17, 'straightener'],
  ['Dinoson Corrale Hair Straightener', 'Hair care', 'Flexible plates for cordless freedom.', 2048.63, 'straightener'],
  ['Dinoson V15 Detect Cordless Vacuum', 'Floor care', 'Detects dust for a deeper clean.', 1891.29, 'cordless-vacuum'],
  ['Dinoson V12 Detect Slim Cordless Vacuum', 'Floor care', 'Lightweight, powerful everyday cleaning.', 1638.74, 'cordless-vacuum'],
  ['Dinoson Gen5detect Cordless Vacuum', 'Floor care', 'Advanced dust detection for your home.', 2149.53, 'cordless-vacuum'],
  ['Dinoson Ball Animal Vacuum', 'Floor care', 'A full-size vacuum for homes with pets.', 1274.91, 'ball-vacuum'],
  ['Dinoson Omni-glide Vacuum', 'Floor care', 'Designed to glide across hard floors.', 1453.68, 'cordless-vacuum'],
  ['Dinoson 360 Vis Nav Robot Vacuum', 'Floor care', 'Intelligent robot cleaning with broad coverage.', 2095.14, 'robot-vacuum'],
  ['Dinoson WashG1 Wet Cleaner', 'Floor care', 'A dedicated wet cleaner for everyday floors.', 1784.36, 'wet-cleaner'],
  ['Dinoson Purifier Cool Air Purifier', 'Air care', 'Purified air with cooling airflow.', 1162.57, 'loop-purifier'],
  ['Dinoson Purifier Hot+Cool Air Purifier', 'Air care', 'Purifies, heats or cools your space.', 1968.42, 'loop-purifier'],
  ['Dinoson Purifier Humidify+Cool', 'Air care', 'Purifies and humidifies your room.', 1573.89, 'loop-humidifier'],
  ['Dinoson Cool Tower Fan', 'Air care', 'Powerful cooling airflow in a tower design.', 1338.25, 'tower-fan'],
  ['Dinoson Hot+Cool Fan Heater', 'Air care', 'Heating and cooling for year-round comfort.', 2184.72, 'tower-heater'],
  ['Dinoson Zone Headphones', 'Wearables', 'Immersive sound with personal air purification.', 1822.06, 'headphones'],
  ['Dinoson Airblade Hand Dryer', 'Hand drying', 'Touch-free hand drying in seconds.', 1438.91, 'hand-dryer'],
  ['Dinoson PencilVac', 'Floor care', 'An ultralight, compact vacuum design.', 1619.34, 'cordless-vacuum'],
  ['Dinoson Clean+Wash Hygiene', 'Floor care', 'Vacuuming and washing in one machine.', 2027.58, 'wet-cleaner'],
  ['Dinoson Task Light', 'Lighting', 'Adjustable task lighting for focused work and reading.', 1206.83, 'task-light'],
  ['Dinoson V8 Slim Cordless Vacuum', 'Floor care', 'Light, nimble everyday cleaning.', 1949.67, 'cordless-vacuum']
];

const legacyFeaturedPrices = {
  0: '$1,638.74',
  1: '$1,949.67',
  2: '$1,162.57',
  3: '$1,300.54',
  4: '$1,387.42',
  5: '$1,729.86'
};

const formatCatalogPrice = (price) => `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const productArtShapes = {
  'hair-dryer': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M213 101a44 44 0 1 0-48 62l-29 91a23 23 0 0 0 44 14l31-94a44 44 0 0 0 2-73Z" fill="none" stroke="url(#${body})" stroke-width="24"/><path d="M183 190l-21 67" stroke="#f8f6ff" stroke-width="5"/><path d="M178 270l-2 17" stroke="var(--product-accent)" stroke-width="7"/><circle cx="200" cy="122" r="13" fill="#171225" stroke="#c9c4d9" stroke-width="4"/><path d="M237 112h31" stroke="#c9c4d9" stroke-width="8"/></g>`,
  'multi-styler': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><rect x="83" y="270" width="194" height="22" rx="11" fill="#252036" stroke="#716b83" stroke-width="3"/><path d="M122 259V109a20 20 0 0 1 40 0v150" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M183 259V83a19 19 0 0 1 38 0v176" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M239 259V130a16 16 0 0 1 32 0v129" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M142 97v137M202 72v163M255 118v118" stroke="var(--product-accent)" stroke-width="5"/><circle cx="142" cy="278" r="7" fill="var(--product-accent)"/><circle cx="202" cy="278" r="7" fill="var(--product-accent)"/><circle cx="255" cy="278" r="7" fill="var(--product-accent)"/></g>`,
  straightener: (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M177 258 104 104a22 22 0 0 1 40-19l73 154Z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="m187 260 65-158a22 22 0 0 0-40-17l-65 158Z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="m126 98 68 144M235 102l-60 144" stroke="var(--product-accent)" stroke-width="7"/><circle cx="182" cy="261" r="18" fill="#211a31" stroke="#d7d2e6" stroke-width="4"/><path d="M150 286h67" stroke="#716b83" stroke-width="6"/></g>`,
  'cordless-vacuum': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M174 91V76a11 11 0 0 1 11-11h23a11 11 0 0 1 11 11v25h-45Z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M190 101v40" stroke="#d7d2e6" stroke-width="15"/><path d="M184 137c-17 0-27 12-27 28v52c0 12 9 21 21 21h49c11 0 20-9 20-20v-52c0-17-12-29-28-29Z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M168 159h61v45h-61z" fill="#100d18" fill-opacity=".78" stroke="var(--product-accent)" stroke-width="4"/><circle cx="199" cy="181" r="14" fill="#201a30" stroke="#d7d2e6" stroke-width="3"/><path d="M200 228v68" stroke="var(--product-accent)" stroke-width="15"/><path d="M159 292h82a13 13 0 0 1 13 13v8h-108v-8a13 13 0 0 1 13-13Z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M158 305h96" stroke="#171324" stroke-width="7"/><circle cx="171" cy="314" r="4" fill="var(--product-accent)"/><circle cx="241" cy="314" r="4" fill="var(--product-accent)"/></g>`,
  'ball-vacuum': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><circle cx="203" cy="243" r="55" fill="url(#${body})" stroke="#d7d2e6" stroke-width="5"/><circle cx="203" cy="243" r="27" fill="#15111f" stroke="var(--product-accent)" stroke-width="7"/><path d="M163 199 125 162l27-60 50-16 31 34-28 67" fill="url(#${body})" stroke="#d7d2e6" stroke-width="5"/><path d="M145 121h68M156 139h48" stroke="var(--product-accent)" stroke-width="6"/><path d="M125 162 95 189 80 273l-34 28" fill="none" stroke="#aaa5b7" stroke-width="12"/><path d="M39 301h60" stroke="#d7d2e6" stroke-width="8"/><path d="M229 196c27-17 38-42 38-69" fill="none" stroke="var(--product-accent)" stroke-width="6"/></g>`,
  'robot-vacuum': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><ellipse cx="183" cy="238" rx="103" ry="64" fill="url(#${body})" stroke="#d7d2e6" stroke-width="5"/><ellipse cx="183" cy="228" rx="78" ry="46" fill="#171324" stroke="var(--product-accent)" stroke-width="5"/><path d="M117 231c32-33 101-39 140-6" fill="none" stroke="#d7d2e6" stroke-width="5"/><circle cx="181" cy="212" r="11" fill="var(--product-accent)"/><circle cx="250" cy="240" r="7" fill="#f3efff"/><path d="M110 285h147" stroke="#282236" stroke-width="9"/><path d="m90 280-20 18M278 276l22 17" stroke="var(--product-accent)" stroke-width="4"/></g>`,
  'wet-cleaner': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M174 65h40v42h-40z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M194 107v74" stroke="#d7d2e6" stroke-width="13"/><rect x="147" y="158" width="92" height="83" rx="22" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M160 177h66v43h-66z" fill="#13101d" stroke="var(--product-accent)" stroke-width="4"/><path d="M192 241v51" stroke="var(--product-accent)" stroke-width="13"/><path d="M121 292h143v24H121z" rx="10" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><circle cx="148" cy="306" r="8" fill="#171324" stroke="var(--product-accent)" stroke-width="4"/><circle cx="237" cy="306" r="8" fill="#171324" stroke="var(--product-accent)" stroke-width="4"/></g>`,
  'loop-purifier': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M180 63c-49 0-83 39-83 84 0 44 34 71 83 71s83-27 83-71c0-45-34-84-83-84Z" fill="none" stroke="url(#${body})" stroke-width="18"/><path d="M180 77c-37 0-63 30-63 67 0 33 26 54 63 54s63-21 63-54c0-37-26-67-63-67Z" fill="#0d0a15" stroke="#817b90" stroke-width="3"/><path d="M148 221h64l20 68H128z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M146 245h68M140 258h80M135 271h90" stroke="#aaa5b7" stroke-width="4"/><circle cx="180" cy="233" r="5" fill="var(--product-accent)"/><path d="M120 293h120" stroke="#d7d2e6" stroke-width="7"/></g>`,
  'loop-humidifier': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M180 54c-48 0-79 38-79 82 0 42 32 66 79 66s79-24 79-66c0-44-31-82-79-82Z" fill="none" stroke="url(#${body})" stroke-width="18"/><path d="M180 69c-36 0-61 29-61 65 0 31 25 51 61 51s61-20 61-51c0-36-25-65-61-65Z" fill="#0c0a14" stroke="#817b90" stroke-width="3"/><path d="M147 205h66l18 42H129z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M129 247h102v57c0 13-9 22-22 22h-58c-13 0-22-9-22-22z" fill="#252036" stroke="#d7d2e6" stroke-width="4"/><path d="M139 271h82M143 288h74" stroke="var(--product-accent)" stroke-width="4"/><circle cx="181" cy="224" r="5" fill="var(--product-accent)"/></g>`,
  'tower-fan': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M148 72c0-18 15-32 33-32s33 14 33 32v205h-66z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M160 91h42M160 105h42M160 119h42M160 133h42M160 147h42M160 161h42M160 175h42M160 189h42M160 203h42M160 217h42M160 231h42" stroke="#aaa5b7" stroke-width="4"/><path d="M135 277h92l24 28H111z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><circle cx="181" cy="258" r="7" fill="var(--product-accent)"/></g>`,
  'tower-heater': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M145 69c0-17 16-31 36-31s36 14 36 31v208h-72z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><path d="M157 92h48v130h-48z" fill="#171324" stroke="var(--product-accent)" stroke-width="4"/><path d="M165 107h32M165 124h32M165 141h32M165 158h32M165 175h32M165 192h32" stroke="#c9c4d9" stroke-width="4"/><path d="M132 278h99l22 27H110z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><circle cx="181" cy="252" r="8" fill="var(--product-accent)"/></g>`,
  headphones: (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M102 187v-36c0-60 35-96 81-96s81 36 81 96v36" fill="none" stroke="url(#${body})" stroke-width="22"/><path d="M103 166v35M263 166v35" stroke="#d7d2e6" stroke-width="8"/><rect x="79" y="167" width="51" height="91" rx="22" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><rect x="236" y="167" width="51" height="91" rx="22" fill="url(#${body})" stroke="#d7d2e6" stroke-width="4"/><rect x="91" y="183" width="27" height="57" rx="13" fill="#171324" stroke="var(--product-accent)" stroke-width="4"/><rect x="248" y="183" width="27" height="57" rx="13" fill="#171324" stroke="var(--product-accent)" stroke-width="4"/><path d="M143 83c12-14 25-20 40-20s28 6 40 20" fill="none" stroke="#f2effa" stroke-width="4"/></g>`,
  'hand-dryer': (body) => `<g stroke-linecap="round" stroke-linejoin="round"><path d="M96 76h168a17 17 0 0 1 17 17v154a17 17 0 0 1-17 17H96a17 17 0 0 1-17-17V93a17 17 0 0 1 17-17Z" fill="url(#${body})" stroke="#d7d2e6" stroke-width="5"/><path d="M105 102h149v46H105z" fill="#171324" stroke="var(--product-accent)" stroke-width="4"/><path d="M118 117h124M118 130h124" stroke="#aaa5b7" stroke-width="4"/><path d="M132 165v68M147 165v68M162 165v68M177 165v68M192 165v68M207 165v68M222 165v68" stroke="#817b90" stroke-width="5"/><circle cx="180" cy="244" r="6" fill="var(--product-accent)"/></g>`
};

function renderDinosonProductArt(type, index, name) {
  const accentColors = ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#818cf8', '#10b981'];
  const accent = accentColors[index % accentColors.length];
  const horizontalScales = {
    'hair-dryer': 1.5,
    'multi-styler': 1.1,
    straightener: 1.3,
    'cordless-vacuum': 2,
    'wet-cleaner': 1.5,
    'tower-fan': 1.6,
    'tower-heater': 1.6,
    'loop-purifier': 1.15,
    'loop-humidifier': 1.15,
    'ball-vacuum': 1.1,
    'robot-vacuum': 1.1,
    headphones: 1.1,
    'hand-dryer': 1.1
  };
  const horizontalScale = horizontalScales[type] || 1;
  const verticalScale = {
    'hair-dryer': 1.1,
    'multi-styler': 1.1,
    straightener: 1.1,
    'cordless-vacuum': 1.15,
    'wet-cleaner': 1.1,
    'loop-purifier': 1.1,
    'loop-humidifier': 1.05,
    'tower-fan': 1.05,
    'tower-heater': 1.05,
    'hand-dryer': 1.1
  }[type] || 1;
  const bodyGradient = `dinoson-body-${index}`;
  const shapes = productArtShapes[type];
  if (!shapes) {
    console.error(`Unknown Dinoson product illustration type "${type}".`);
    return '';
  }

  const accessibleName = String(name).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);

  return `<svg class="product-artwork" viewBox="0 0 360 360" role="img" aria-label="${accessibleName}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${bodyGradient}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8f6ff"/><stop offset=".35" stop-color="${accent}"/><stop offset="1" stop-color="#211a31"/></linearGradient>
      <radialGradient id="dinoson-glow-${index}"><stop stop-color="${accent}" stop-opacity=".38"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
    </defs>
    <circle cx="180" cy="174" r="150" fill="url(#dinoson-glow-${index})"/>
    <ellipse cx="181" cy="319" rx="100" ry="12" fill="#000" fill-opacity=".42"/>
    <g transform="translate(180 180) scale(${horizontalScale} ${verticalScale}) translate(-180 -180)" style="--product-accent:${accent}">${shapes(bodyGradient)}</g>
  </svg>`;
}

window.renderDinosonProductArt = renderDinosonProductArt;

const dinosonProductImages = {
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
  18: 'product-photos/dinoson-handheld-vacuum.jpg',
  20: 'product-photos/dinoson-task-light.jpg'
};

function renderDinosonCatalogProduct(index, product) {
  const image = dinosonProductImages[index];
  if (image) {
    const purifierImage = index >= 11 && index <= 13;
    const objectPosition = purifierImage ? 'center 54%' : 'center';
    const imageBackground = purifierImage ? '' : ';background:#e8e7e4';
    return `<img src="${image}" alt="${product[0]}" loading="lazy" decoding="async" style="object-fit:contain;object-position:${objectPosition}${imageBackground}">`;
  }
  return renderDinosonProductArt(product[4], index, product[0]);
}

window.renderDinosonCatalogProduct = renderDinosonCatalogProduct;
window.dinosonCatalogProducts = catalogProducts;

const catalogShelves = {
  home: [4, 0, 1, 11, 9, 5, 10, 3, 14],
  products: [18, 20, 0, 1, 2, 3, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  technology: [6, 4, 5, 9, 11, 12, 13, 18, 17],
  how: [5, 8, 10, 19, 7, 4, 0, 1, 14],
  compare: [4, 5, 6, 7, 8, 9, 18, 10, 19],
  faq: [0, 1, 2, 4, 5, 11, 12, 14, 16],
  about: [4, 0, 11, 9, 5, 1, 10, 14, 17],
  support: [4, 5, 6, 10, 11, 12, 14, 0, 1],
  cart: [4, 5, 8, 10, 11, 0, 1, 14, 19]
};

const productShelf = document.querySelector('[data-product-shelf]');
if (productShelf) {
  const productsGrid = productShelf.querySelector('.brand-product-grid');
  const shelfId = productShelf.dataset.productShelf;
  const productIndexes = catalogShelves[shelfId];

  if (!productsGrid || !productIndexes) {
    console.error(`Unable to render the product shelf "${shelfId}".`);
  } else {
    productsGrid.classList.toggle('brand-product-grid--center-tail', shelfId === 'products' && productIndexes.length % 3 === 2);
    let selectedCompareIndexes = [];
    try {
      const savedCompare = JSON.parse(localStorage.getItem('dinosonCompare') || '[]');
      if (!Array.isArray(savedCompare)) throw new TypeError('The saved comparison is not a list.');
      selectedCompareIndexes = savedCompare.filter((index) => Number.isInteger(index) && catalogProducts[index]).slice(0, 2);
    } catch (error) {
      console.error('Unable to read the saved product comparison.', error);
    }

    const compareStatus = document.createElement('p');
    compareStatus.className = 'product-compare-status';
    compareStatus.setAttribute('aria-live', 'polite');

    const updateCompareControls = (message) => {
      productsGrid.querySelectorAll('.brand-product-compare').forEach((button) => {
        const selected = selectedCompareIndexes.includes(Number(button.dataset.productIndex));
        button.textContent = selected ? 'Selected' : 'Compare';
        button.setAttribute('aria-pressed', String(selected));
        button.setAttribute('aria-label', selected ? 'Product selected for comparison' : 'Add product to comparison');
      });

      compareStatus.replaceChildren();
      if (!selectedCompareIndexes.length && !message) {
        compareStatus.hidden = true;
        return;
      }

      compareStatus.hidden = false;
      compareStatus.textContent = message || `${selectedCompareIndexes.length} of 2 products selected. `;
      if (!message && selectedCompareIndexes.length === 2) {
        const link = document.createElement('a');
        link.href = 'compare.html';
        link.textContent = 'View comparison';
        compareStatus.append(link);
      }
    };

    const updateCartRemoveButtons = (cart) => {
      productsGrid.querySelectorAll('.brand-product-remove').forEach((button) => {
        const id = `dinoson-${button.dataset.productIndex}`;
        const inCart = cart.some((item) => item.id === id);
        button.disabled = !inCart;
        button.setAttribute('aria-label', inCart ? 'Remove product from cart' : 'Product is not in cart');
      });
    };

    productsGrid.insertAdjacentHTML('beforebegin', '<p class="product-price-disclaimer">Sample prices are for preview only and are not confirmed retail prices.</p>');
    productsGrid.before(compareStatus);
    productsGrid.innerHTML = productIndexes.map((index) => {
      const product = catalogProducts[index];
      if (!product) {
        console.error(`Product catalog entry ${index} is missing.`);
        return '';
      }

      return `<article class="brand-product-card">
        <div class="brand-product-art">${renderDinosonCatalogProduct(index, product)}</div>
        <div class="brand-product-copy"><small class="brand-product-category">${product[1]}</small><h3>${product[0]}</h3><p>${product[2]}</p>
          <div class="brand-product-purchase"><div><small>${Number.isFinite(product[3]) ? 'Sample price' : 'Price'}</small><strong>${Number.isFinite(product[3]) ? formatCatalogPrice(product[3]) : 'Coming soon'}</strong></div><div class="brand-product-actions"><button class="brand-product-buy" type="button" data-product-index="${index}"${Number.isFinite(product[3]) ? '' : ' disabled title="Price coming soon"'}>Add to cart</button><button class="brand-product-remove" type="button" data-product-index="${index}" disabled>Remove</button><button class="brand-product-compare" type="button" data-product-index="${index}" aria-pressed="false">Compare</button></div></div>
        </div>
      </article>`;
    }).join('');
    updateCompareControls();
    try {
      const cart = JSON.parse(localStorage.getItem('dinosonCart') || '[]');
      if (!Array.isArray(cart)) throw new TypeError('The saved cart is not a list.');
      updateCartRemoveButtons(cart);
    } catch (error) {
      console.error('Unable to read the saved cart for product actions.', error);
      updateCartRemoveButtons([]);
    }

    window.addEventListener('dinoson-cart-updated', () => {
      try {
        const cart = JSON.parse(localStorage.getItem('dinosonCart') || '[]');
        if (!Array.isArray(cart)) throw new TypeError('The saved cart is not a list.');
        updateCartRemoveButtons(cart);
      } catch (error) {
        console.error('Unable to refresh product cart actions.', error);
        updateCartRemoveButtons([]);
      }
    });

    window.addEventListener('dinoson-compare-updated', (event) => {
      if (!Array.isArray(event.detail)) {
        console.error('The updated product comparison is invalid.');
        return;
      }
      selectedCompareIndexes = event.detail.filter((index) => Number.isInteger(index) && catalogProducts[index]).slice(0, 2);
      updateCompareControls();
    });

    productsGrid.addEventListener('click', (event) => {
      const compareButton = event.target.closest('.brand-product-compare');
      if (compareButton) {
        const index = Number(compareButton.dataset.productIndex);
        const existingIndex = selectedCompareIndexes.indexOf(index);
        if (existingIndex >= 0) {
          selectedCompareIndexes.splice(existingIndex, 1);
        } else if (selectedCompareIndexes.length >= 2) {
          updateCompareControls('Choose only two products. Remove one selected product before adding another.');
          return;
        } else {
          selectedCompareIndexes.push(index);
        }

        try {
          localStorage.setItem('dinosonCompare', JSON.stringify(selectedCompareIndexes));
        } catch (error) {
          console.error('Unable to save the product comparison.', error);
          updateCompareControls('Unable to save your comparison. Please check browser storage settings.');
          return;
        }
        window.dispatchEvent(new CustomEvent('dinoson-compare-updated', { detail: selectedCompareIndexes.slice() }));
        updateCompareControls();
        return;
      }

      const removeButton = event.target.closest('.brand-product-remove');
      if (removeButton) {
        let cart;
        try {
          cart = JSON.parse(localStorage.getItem('dinosonCart') || '[]');
          if (!Array.isArray(cart)) throw new TypeError('The saved cart is not a list.');
        } catch (error) {
          console.error('Unable to read the saved cart.', error);
          removeButton.textContent = 'Cart unavailable';
          return;
        }

        const id = `dinoson-${removeButton.dataset.productIndex}`;
        const updatedCart = cart.filter((item) => item.id !== id);
        if (updatedCart.length === cart.length) {
          updateCartRemoveButtons(cart);
          return;
        }

        try {
          localStorage.setItem('dinosonCart', JSON.stringify(updatedCart));
        } catch (error) {
          console.error('Unable to remove the product from the cart.', error);
          removeButton.textContent = 'Unable to remove';
          return;
        }
        const count = updatedCart.reduce((total, item) => total + item.quantity, 0);
        ['cn', 'headerCartCount'].forEach((countId) => {
          const counter = document.getElementById(countId);
          if (counter) counter.textContent = String(count);
        });
        updateCartRemoveButtons(updatedCart);
        window.dispatchEvent(new Event('dinoson-cart-updated'));
        return;
      }

      const button = event.target.closest('.brand-product-buy');
      if (!button) return;
      const product = catalogProducts[Number(button.dataset.productIndex)];
      if (!product || !Number.isFinite(product[3])) {
        console.error(`Product catalog entry ${button.dataset.productIndex} is missing.`);
        return;
      }

      let cart;
      try {
        cart = JSON.parse(localStorage.getItem('dinosonCart') || '[]');
        if (!Array.isArray(cart)) throw new TypeError('The saved cart is not a list.');
      } catch (error) {
        console.error('Unable to read the saved cart.', error);
        button.textContent = 'Cart unavailable';
        return;
      }

      const id = `dinoson-${button.dataset.productIndex}`;
      const existing = cart.find((item) => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id,
          name: product[0],
          price: formatCatalogPrice(product[3]),
          quantity: 1,
          category: product[1],
          description: product[2],
          highlights: ['Sample price'],
          productIndex: Number(button.dataset.productIndex),
          visualType: product[4],
          samplePrice: true
        });
      }
      try {
        localStorage.setItem('dinosonCart', JSON.stringify(cart));
      } catch (error) {
        console.error('Unable to save the product to the cart.', error);
        button.textContent = 'Unable to add';
        return;
      }

      const count = cart.reduce((total, item) => total + item.quantity, 0);
      ['cn', 'headerCartCount'].forEach((countId) => {
        const counter = document.getElementById(countId);
        if (counter) counter.textContent = String(count);
      });
      updateCartRemoveButtons(cart);
      window.dispatchEvent(new Event('dinoson-cart-updated'));

      button.textContent = 'Added ✓';
      button.disabled = true;
      window.setTimeout(() => {
        button.textContent = 'Add to cart';
        button.disabled = false;
      }, 1200);
    });
  }
}

try {
  const savedCart = localStorage.getItem('dinosonCart');
  if (savedCart) {
    const cart = JSON.parse(savedCart);
    if (!Array.isArray(cart)) throw new TypeError('The saved cart is not a list.');
    let updated = false;
    cart.forEach((item) => {
      const match = /^(?:dyson|dinoson)-(\d+)$/.exec(item.id || '');
      const legacyPrice = /^\d+$/.test(item.id || '') ? legacyFeaturedPrices[item.id] : null;
      if (!match && legacyPrice) {
        if (item.price !== legacyPrice || item.samplePrice !== true) {
          item.price = legacyPrice;
          item.samplePrice = true;
          updated = true;
        }
        return;
      }
      const index = match ? Number(match[1]) : -1;
      const product = catalogProducts[index];
      if (!product || !Number.isFinite(product[3])) return;
      item.id = `dinoson-${index}`;
      item.name = product[0];
      item.price = formatCatalogPrice(product[3]);
      item.category = product[1];
      item.description = product[2];
      item.productIndex = index;
      item.visualType = product[4];
      item.samplePrice = true;
      updated = true;
    });
    if (updated) {
      localStorage.setItem('dinosonCart', JSON.stringify(cart));
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      ['cn', 'headerCartCount'].forEach((countId) => {
        const counter = document.getElementById(countId);
        if (counter) counter.textContent = String(count);
      });
      window.dispatchEvent(new Event('dinoson-cart-updated'));
    }
  }
} catch (error) {
  console.error('Unable to update saved product names in the cart.', error);
}
window.dispatchEvent(new Event('dinoson-product-art-ready'));
