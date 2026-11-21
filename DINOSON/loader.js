(() => {
  const introKey = 'dinosonIntroSeen';
  const navigationEntry = performance.getEntriesByType('navigation')[0];
  const isRefresh = navigationEntry?.type === 'reload';
  const currentUrl = new URL(window.location.href);
  const currentPage = currentUrl.pathname.split('/').pop()?.toLowerCase();
  const isHomePage = currentPage === '' || currentPage === 'index.html';

  if (isRefresh) {
    const homeUrl = new URL('index.html', currentUrl);
    if (!isHomePage || currentUrl.search || currentUrl.hash) {
      window.location.replace(homeUrl.href);
      return;
    }

    window.history.scrollRestoration = 'manual';
    window.addEventListener('pageshow', () => window.scrollTo(0, 0), { once: true });
  }

  let firstVisit = false;

  try {
    firstVisit = localStorage.getItem(introKey) !== 'true';
    if (firstVisit) localStorage.setItem(introKey, 'true');
  } catch (error) {
    console.error('Unable to save the Dinoson intro state in local storage:', error);
    try {
      firstVisit = sessionStorage.getItem(introKey) !== 'true';
      if (firstVisit) sessionStorage.setItem(introKey, 'true');
    } catch (sessionError) {
      console.error('Unable to save the Dinoson intro state in session storage:', sessionError);
      firstVisit = true;
    }
  }

  const showIntro = firstVisit || isRefresh;
  document.documentElement.dataset.loaderMode = showIntro ? 'intro' : 'transition';

  const initializeLoader = () => {
    const loader = document.getElementById('ld');
    if (!loader) {
      console.error('The Dinoson page loader element (#ld) is missing.');
      return;
    }
    if (showIntro) {
      const mark = loader.querySelector('.loader-mark');
      const imageSource = mark?.dataset.src;
      if (mark && imageSource) mark.src = imageSource;
    } else {
      const brand = loader.querySelector('.loader-brand');
      if (brand && !brand.querySelector('.loader-vacuum')) {
        const vacuum = document.createElement('img');
        vacuum.className = 'loader-vacuum';
        vacuum.src = 'dinoson-vacuum.svg';
        vacuum.alt = '';
        vacuum.setAttribute('aria-hidden', 'true');
        brand.append(vacuum);
      }
    }

    const duration = showIntro ? 3000 : 950;
    let hideTimer;
    const hideLoader = () => {
      if (hideTimer !== undefined) return;
      hideTimer = window.setTimeout(() => loader.classList.add('x'), duration);
    };

    window.addEventListener('load', hideLoader, { once: true });
    window.setTimeout(hideLoader, duration + 2000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoader, { once: true });
  } else {
    initializeLoader();
  }
})();
