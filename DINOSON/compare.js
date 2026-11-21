(() => {
  const products = window.dinosonCatalogProducts;
  const firstSelect = document.getElementById('compareProductA');
  const secondSelect = document.getElementById('compareProductB');
  const compareButton = document.getElementById('compareProducts');
  const compareMessage = document.getElementById('compareMessage');
  const compareResults = document.getElementById('compareResults');

  if (!Array.isArray(products) || !firstSelect || !secondSelect || !compareButton || !compareMessage || !compareResults) {
    console.error('The product comparison controls or catalog data are unavailable.');
    return;
  }

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);

  const typeNames = {
    'hair-dryer': 'Hair dryer',
    'multi-styler': 'Multi-styler',
    straightener: 'Hair straightener',
    'cordless-vacuum': 'Cordless vacuum',
    'ball-vacuum': 'Upright vacuum',
    'robot-vacuum': 'Robot vacuum',
    'wet-cleaner': 'Wet cleaner',
    'loop-purifier': 'Air purifier',
    'loop-humidifier': 'Air purifier and humidifier',
    'tower-fan': 'Tower fan',
    'tower-heater': 'Fan heater',
    headphones: 'Headphones',
    'hand-dryer': 'Hand dryer',
    'task-light': 'Task light'
  };

  const populateSelect = (select) => {
    select.innerHTML = '<option value="">Choose a product</option>' + products.map((product, index) =>
      `<option value="${index}">${escapeHTML(product[0])}</option>`
    ).join('');
  };

  populateSelect(firstSelect);
  populateSelect(secondSelect);

  const getSelectedProducts = () => {
    const firstIndex = Number(firstSelect.value);
    const secondIndex = Number(secondSelect.value);
    if (firstSelect.value === '' || secondSelect.value === '' || firstIndex === secondIndex) return null;
    const firstProduct = products[firstIndex];
    const secondProduct = products[secondIndex];
    if (!firstProduct || !secondProduct) return null;
    return [{ index: firstIndex, product: firstProduct }, { index: secondIndex, product: secondProduct }];
  };

  const updateControls = () => {
    const selectionsValid = Boolean(getSelectedProducts());
    compareButton.disabled = !selectionsValid;
    if (firstSelect.value && secondSelect.value && firstSelect.value === secondSelect.value) {
      compareMessage.textContent = 'Choose two different products to compare.';
    } else if (!selectionsValid) {
      compareMessage.textContent = 'Select two products to see their catalog details side by side.';
    } else {
      compareMessage.textContent = '';
    }
  };

  const renderComparison = () => {
    updateControls();
    const selected = getSelectedProducts();
    if (!selected) {
      return;
    }

    const productHeader = ({ index, product }) => {
      const artwork = typeof window.renderDinosonCatalogProduct === 'function'
        ? window.renderDinosonCatalogProduct(index, product)
        : '';
      return `<div class="compare-product-heading"><div class="compare-product-art">${artwork}</div><h3>${escapeHTML(product[0])}</h3></div>`;
    };

    const formatPrice = (price) => Number.isFinite(price)
      ? `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : 'Price coming soon';
    const rows = [
      ['Category', selected[0].product[1], selected[1].product[1]],
      ['Product type', typeNames[selected[0].product[4]] || 'Home appliance', typeNames[selected[1].product[4]] || 'Home appliance'],
      ['Description', selected[0].product[2], selected[1].product[2]],
      ['Sample price', formatPrice(selected[0].product[3]), formatPrice(selected[1].product[3])]
    ];

    compareResults.innerHTML = `<div class="compare-table-wrap"><table class="compare-table">
      <thead><tr><th scope="col">Product details</th><th scope="col">${productHeader(selected[0])}</th><th scope="col">${productHeader(selected[1])}</th></tr></thead>
      <tbody>${rows.map(([label, firstValue, secondValue]) => `<tr><th scope="row">${escapeHTML(label)}</th><td>${escapeHTML(firstValue)}</td><td>${escapeHTML(secondValue)}</td></tr>`).join('')}</tbody>
    </table></div>`;

    try {
      localStorage.setItem('dinosonCompare', JSON.stringify(selected.map(({ index }) => index)));
      compareMessage.textContent = 'Showing the selected products side by side.';
    } catch (error) {
      console.error('Unable to save the selected product comparison.', error);
      compareMessage.textContent = 'Comparison is shown, but could not be saved in browser storage.';
    }
  };

  const handleSelectionChange = () => {
    compareResults.replaceChildren();
    updateControls();
  };
  firstSelect.addEventListener('change', handleSelectionChange);
  secondSelect.addEventListener('change', handleSelectionChange);
  compareButton.addEventListener('click', renderComparison);

  try {
    const savedCompare = JSON.parse(localStorage.getItem('dinosonCompare') || '[]');
    if (!Array.isArray(savedCompare)) throw new TypeError('The saved comparison is not a list.');
    const selected = savedCompare.filter((index) => Number.isInteger(index) && products[index]).slice(0, 2);
    if (selected.length > 0) firstSelect.value = String(selected[0]);
    if (selected.length > 1 && selected[0] !== selected[1]) {
      secondSelect.value = String(selected[1]);
      renderComparison();
    } else {
      updateControls();
    }
  } catch (error) {
    console.error('Unable to read the saved product comparison.', error);
    compareMessage.textContent = 'Select two products to see their catalog details side by side.';
  }
})();
