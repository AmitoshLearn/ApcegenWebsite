'use strict';

const throttle = (fn, limit = 16) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= limit) { last = now; fn(...args); }
  };
};

const initNavigation = () => {
  const navbar = document.querySelector('.navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navbar) return;
  const onScroll = throttle(() => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.id;
    });
    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  }, 80);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    navLinks.addEventListener('click', e => {
      if (e.target.matches('a')) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
};

const initScrollAnimations = () => {
  const els = document.querySelectorAll('.animate-on-scroll');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => io.observe(el));
};

const initTypingAnimation = () => {
  const target = document.getElementById('hero-tagline');
  if (!target) return;
  const phrases = [
    'Solutions for a Healthier & Happier Life',
    'Translating Pathogenesis into Targeted Therapies',
    'Reversing the Cancer Mortality Trend',
    'Pioneering Affordable Human Therapeutics'
  ];
  let pi = 0, ci = 0, deleting = false;
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  const tick = () => {
    const text = phrases[pi];
    if (!deleting) {
      target.textContent = text.slice(0, ci + 1);
      ci++;
      if (ci === text.length) { deleting = true; setTimeout(tick, 2400); return; }
      setTimeout(tick, 55 + Math.random() * 50);
    } else {
      target.textContent = text.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 32);
    }
  };
  target.parentElement.appendChild(cursor);
  setTimeout(tick, 600);
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const ease = t => 1 - Math.pow(1 - t, 3);
  const animate = el => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      const value = ease(p) * target;
      el.textContent = (target % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => io.observe(c));
};

const initPipeline = () => {
  const bars = document.querySelectorAll('.pipeline-bar');
  if (!bars.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.dataset.width || '0%';
        setTimeout(() => { e.target.style.width = w; }, 220);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  bars.forEach(b => io.observe(b));
};

const initEventTabs = () => {
  const tabs = document.querySelectorAll('.event-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.event-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.events-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.querySelector('#events-' + tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
};

const initParticles = () => {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.offsetWidth, h = canvas.offsetHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  const count = Math.floor((w * h) / 16000);
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: 0.8 + Math.random() * 1.4
    });
  }
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212,175,55,0.55)';
      ctx.fill();
      for (let j = i + 1; j < dots.length; j++) {
        const d2 = dots[j];
        const dx = d.x - d2.x, dy = d.y - d2.y;
        const dist = dx * dx + dy * dy;
        if (dist < 14000) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.strokeStyle = 'rgba(212,175,55,' + (0.18 - dist / 78000) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
  window.addEventListener('resize', throttle(() => {
    w = canvas.offsetWidth; h = canvas.offsetHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  }, 200));
};

const initParallax = () => {
  const glow = document.querySelector('.hero-glow');
  if (!glow) return;
  window.addEventListener('scroll', throttle(() => {
    const y = window.scrollY;
    if (y < window.innerHeight) glow.style.transform = 'translateY(' + (y * 0.3) + 'px)';
  }, 16), { passive: true });
};

const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent';
    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 2400);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initTypingAnimation();
  initCounters();
  initPipeline();
  initEventTabs();
  initParticles();
  initParallax();
  initContactForm();
});
