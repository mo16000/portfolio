'use strict';

// October 5, 2026 at midnight in Toronto. This never implies publication.
const countdown = document.querySelector('[data-release]');
if (countdown) {
  const release = new Date(countdown.dataset.release).getTime();
  const value = document.getElementById('countdown-value');
  const label = document.getElementById('countdown-label');
  const status = document.getElementById('release-status');
  const updateCountdown = () => {
    const remaining = Math.max(0, Math.ceil((release - Date.now()) / 86400000));
    if (remaining > 0) {
      value.textContent = String(remaining).padStart(2, '0');
      label.textContent = remaining === 1 ? 'day to go' : 'days to go';
      countdown.setAttribute('aria-label', `${remaining} ${remaining === 1 ? 'day' : 'days'} until October 5, 2026`);
    } else {
      value.textContent = 'Coming soon';
      label.textContent = 'In preparation';
      status.textContent = 'Planned for';
      countdown.classList.add('is-due');
      countdown.setAttribute('aria-label', 'Case study coming soon, in preparation');
    }
  };
  updateCountdown();
  window.setInterval(updateCountdown, 60000);
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
