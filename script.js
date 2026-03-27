function scrollToNext() {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
}

const preloader = document.getElementById('preloader');
const themeColor = '#ff9a9e';

function applyThemeColor() {
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute('content', themeColor);
  });
  const navMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
  if (navMeta) navMeta.setAttribute('content', themeColor);
}

applyThemeColor();
window.addEventListener('load', () => {
  const preloaderDuration = 3800;
  const fadeDuration = 900;

  setTimeout(() => {
    applyThemeColor();
    preloader.classList.add('preloader--hide');
    document.body.classList.remove('is-loading');
    document.body.classList.add('shots-in');

    setTimeout(() => {
      preloader.remove();
    }, fadeDuration);
  }, preloaderDuration);
});

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 300);
