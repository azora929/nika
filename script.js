function scrollToNext() {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
}

const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  const preloaderDuration = 3800;
  const fadeDuration = 900;

  setTimeout(() => {
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
