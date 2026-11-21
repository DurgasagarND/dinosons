const themeRoot = document.documentElement;
const themeStorageKey = 'dinosonTheme';

function getSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
  } catch (error) {
    console.warn('Dinoson could not read the saved theme preference.', error);
    return null;
  }
}

function updateThemeButtons() {
  const isLight = themeRoot.dataset.theme === 'light';
  document.querySelectorAll('.theme-toggle').forEach((button) => {
    button.textContent = isLight ? '☀' : '☾';
    button.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
    button.setAttribute('aria-pressed', String(isLight));
    button.title = `Switch to ${isLight ? 'dark' : 'light'} mode`;
  });
}

const savedTheme = getSavedTheme();
themeRoot.dataset.theme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
updateThemeButtons();
document.addEventListener('DOMContentLoaded', updateThemeButtons, { once: true });

document.addEventListener('click', (event) => {
  const button = event.target.closest('.theme-toggle');
  if (!button) return;

  const nextTheme = themeRoot.dataset.theme === 'light' ? 'dark' : 'light';
  themeRoot.dataset.theme = nextTheme;
  updateThemeButtons();

  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (error) {
    console.warn('Dinoson could not save the theme preference.', error);
  }
});
