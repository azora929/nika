function scrollToNext() {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
}

const preloader = document.getElementById('preloader');
const birthdayGate = document.getElementById('birthdayGate');
const themeColor = '#ff9a9e';
const targetMonth = 3; // Апрель в 0-based формате
const targetDay = 29;

function applyThemeColor() {
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute('content', themeColor);
  });
  const navMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
  if (navMeta) navMeta.setAttribute('content', themeColor);
}

function getUpcomingBirthdayDate(now) {
  let year = now.getFullYear();
  let target = new Date(year, targetMonth, targetDay, 0, 0, 0, 0);
  if (now > target) {
    target = new Date(year + 1, targetMonth, targetDay, 0, 0, 0, 0);
  }
  return target;
}

function isBirthdayToday(now) {
  return now.getMonth() === targetMonth && now.getDate() === targetDay;
}

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

function showCountdownGate() {
  document.body.classList.remove('is-loading');
  document.body.classList.add('countdown-active');
  birthdayGate.hidden = false;
  if (preloader) preloader.remove();

  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');
  const markIfChanged = (el, next) => {
    if (el.textContent !== next) {
      el.textContent = next;
      const item = el.closest('.countdown-item');
      if (item) {
        item.classList.remove('is-updating');
        requestAnimationFrame(() => item.classList.add('is-updating'));
      }
    }
  };
  const tick = () => {
    const now = new Date();
    if (isBirthdayToday(now)) {
      window.location.reload();
      return;
    }
    const target = getUpcomingBirthdayDate(now);
    const countdown = formatCountdown(target - now);
    markIfChanged(daysEl, countdown.days);
    markIfChanged(hoursEl, countdown.hours);
    markIfChanged(minutesEl, countdown.minutes);
    markIfChanged(secondsEl, countdown.seconds);
  };

  tick();
  setInterval(tick, 1000);
}

applyThemeColor();
window.addEventListener('load', () => {
  const now = new Date();
  if (!isBirthdayToday(now)) {
    showCountdownGate();
    return;
  }

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
  if (document.body.classList.contains('countdown-active')) return;
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 300);
