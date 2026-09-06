// Goodall Electrical — shared site behaviour (no backend, all client-side)

document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Header shadow / condensed state on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.style.borderBottomColor = window.scrollY > 8 ? 'var(--border)' : 'var(--border-soft)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal-on-scroll, staggered when siblings share a grid/list parent
  var revealEls = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    var staggerCounts = new WeakMap();
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var i = staggerCounts.get(parent) || 0;
      if (i > 0 && i < 8) {
        el.style.transitionDelay = (i * 70) + 'ms';
      }
      staggerCounts.set(parent, i + 1);
    });
  }
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Animated count-up for stat numbers (skips anything without a leading digit)
  var statEls = document.querySelectorAll('.stat b, .stat-mini b');
  if (statEls.length && !reduceMotion && 'IntersectionObserver' in window) {
    var countUp = function (el) {
      var raw = el.textContent.trim();
      var match = raw.match(/^(\d+)(.*)$/);
      if (!match) return; // e.g. "Local", "Gippsland" — nothing numeric to animate
      var target = parseInt(match[1], 10);
      var suffix = match[2];
      var start = null;
      var duration = 900;
      var step = function (ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var statIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { statIo.observe(el); });
  }

  // Project filter (projects.html)
  var filterRow = document.querySelector('.filter-row');
  if (filterRow) {
    var buttons = filterRow.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.project-item');
    filterRow.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      items.forEach(function (item) {
        var match = cat === 'all' || item.getAttribute('data-category') === cat;
        item.hidden = !match;
      });
    });
  }

  // Contact form — posts to the server-side /api/enquiry endpoint, which
  // relays the enquiry into Fergus. See server/README.md for setup.
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var button = form.querySelector('button[type="submit"]');
      var setStatus = function (text, color) {
        if (status) {
          status.textContent = text;
          status.style.color = color;
        }
      };

      var data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        service: form.service.value,
        message: form.message.value.trim()
      };

      if (!data.name || !data.phone || !data.email || !data.message) {
        setStatus('Please fill in your name, phone, email and job details.', 'var(--danger)');
        return;
      }

      button.disabled = true;
      setStatus('Sending…', 'var(--gray)');

      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          return res.json();
        })
        .then(function () {
          setStatus('Thanks — your enquiry has been sent. We\'ll be in touch shortly.', 'var(--ok)');
          form.reset();
        })
        .catch(function () {
          setStatus('Something went wrong sending that. Please call 03 4130 5012 or email us directly.', 'var(--danger)');
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }
});
