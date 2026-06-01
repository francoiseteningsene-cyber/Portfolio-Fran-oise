
// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 2800);
});

// CURSOR
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});
(function animateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx - 18 + 'px';
  trail.style.top = ty - 18 + 'px';
  requestAnimationFrame(animateTrail);
})();
document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// REVEAL
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(r => revealObs.observe(r));

// SKILLS ANIMATION
const skillFills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(s => skillObs.observe(s));

// COUNTER ANIMATION
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
    else el.textContent = Math.floor(start);
  }, 16);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = 1;
      animateCounter(e.target, parseInt(e.target.dataset.target));
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-anim').forEach(c => counterObs.observe(c));

// PROJECT IMAGE UPLOAD
function setProjectImage(input, bgId) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const bg = document.getElementById(bgId);
    bg.innerHTML = '<img src="' + e.target.result + '" alt="Projet">';
  };
  reader.readAsDataURL(file);
}

// FORM SUBMIT
function handleSubmit(btn) {
  const orig = btn.textContent;
  btn.textContent = 'Message envoyé ✓';
  btn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
  }, 3000);
}
