'use strict';

// Fixed release instant: October 5, 2026, midnight in Toronto (EDT).
const countdown = document.querySelector('[data-release]');
if (countdown) {
  const release = new Date(countdown.dataset.release).getTime();
  const status = document.getElementById('release-status');
  const fields = Object.fromEntries(['days', 'hours', 'minutes', 'seconds'].map(unit =>
    [unit, countdown.querySelector(`[data-unit="${unit}"]`)]));
  let timer;
  const updateCountdown = () => {
    const total = Math.max(0, Math.floor((release - Date.now()) / 1000));
    const values = {
      days: Math.floor(total / 86400),
      hours: Math.floor(total % 86400 / 3600),
      minutes: Math.floor(total % 3600 / 60),
      seconds: total % 60,
    };
    for (const [unit, value] of Object.entries(values)) fields[unit].textContent = String(value).padStart(2, '0');
    countdown.hidden = false;
    countdown.setAttribute('aria-label', total > 0
      ? `${values.days} days, ${values.hours} hours, ${values.minutes} minutes, ${values.seconds} seconds until October 5, 2026, midnight Toronto time`
      : 'Countdown complete. Case study coming soon.');
    if (total === 0) {
      status.textContent = 'Coming soon · In preparation';
      window.clearInterval(timer);
    }
  };
  timer = window.setInterval(updateCountdown, 1000);
  updateCountdown();
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateCountdown();
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

// Content is visible without JavaScript. Navigation responds to reading position.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#top, #work, #about, #contact').forEach(section => observer.observe(section));
}


// Load the supplied Lottie only when its preview approaches the viewport.
const animationStage = document.getElementById('trigate-animation');
if (animationStage) {
  const preview = animationStage.closest('.trigate-visual');
  const button = preview.querySelector('.animation-control');
  const poster = document.getElementById('trigate-poster');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animation;
  let ready = false;
  let inView = false;
  let wantsPlayback = !motion.matches;
  const updatePlayback = () => {
    if (!ready) return;
    const playing = wantsPlayback && inView && !document.hidden;
    if (playing) animation.play();
    else animation.pause();
    preview.dataset.playing = String(playing);
    button.innerHTML = playing
      ? '<span aria-hidden="true">Ⅱ</span> Pause animation'
      : '<span aria-hidden="true">▶</span> Play animation';
    button.setAttribute('aria-label', playing ? 'Pause Trigate animation' : 'Play Trigate animation');
  };
  const initialize = () => {
    const script = document.createElement('script');
    script.src = 'assets/vendor/lottie-light.min.js';
    script.async = true;
    script.addEventListener('load', () => {
      animation = window.lottie.loadAnimation({
        container: animationStage,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/trigate-animation.json',
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet', progressiveLoad: false },
      });
      animation.addEventListener('DOMLoaded', () => {
        ready = true;
        animation.setSubframe(false);
        if (motion.matches) animation.goToAndStop(160, true);
        poster.hidden = true;
        button.hidden = false;
        preview.dataset.ready = 'true';
        updatePlayback();
      });
      animation.addEventListener('complete', () => {
        wantsPlayback = false;
        updatePlayback();
      });
      animation.addEventListener('data_failed', () => {
        ready = false;
        poster.hidden = false;
        button.hidden = true;
      });
    });
    document.head.append(script);
  };
  button.addEventListener('click', () => {
    if (!ready) return;
    wantsPlayback = !wantsPlayback;
    if (wantsPlayback && animation.currentFrame >= animation.totalFrames - 1) animation.goToAndStop(0, true);
    updatePlayback();
  });
  motion.addEventListener('change', () => {
    if (motion.matches) {
      wantsPlayback = false;
      if (ready) animation.goToAndStop(160, true);
      updatePlayback();
    }
  });
  document.addEventListener('visibilitychange', updatePlayback);
  if ('IntersectionObserver' in window) {
    const loader = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      loader.disconnect();
      initialize();
    }, { rootMargin: '300px' });
    loader.observe(preview);
    const visibility = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      updatePlayback();
    }, { threshold: 0.15 });
    visibility.observe(preview);
  } else {
    inView = true;
    initialize();
  }
}
