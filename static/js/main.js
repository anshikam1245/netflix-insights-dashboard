/* ============================================================
   Netflix Dashboard — Main JS  v2.0
   Author: Anshika Mittal  |  USN: 1AUA23BIT005
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════════════
     1. NAVBAR — transparent → solid on scroll
  ══════════════════════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const updateNavbar = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    };
    updateNavbar(); // run once on load
    window.addEventListener('scroll', updateNavbar, { passive: true });
  }


  /* ══════════════════════════════════════════════════════════
     2. SOUND + DELAYED NAVIGATION on "Explore Dashboard"
  ══════════════════════════════════════════════════════════ */
  const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
  let audio = null;

  exploreBtn.addEventListener('click', (e) => {
    e.preventDefault();

    exploreBtn.disabled = true;
    exploreBtn.classList.add('playing');

    if (!audio) {
      audio = new Audio(exploreBtn.dataset.sound);
      audio.volume = 1;
    }

    audio.pause();
    audio.currentTime = 0;

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          const transition = document.getElementById("page-transition");

          setTimeout(() => {
            if (transition) {
              transition.classList.add("active");
            }
          }, 500);

          setTimeout(() => {
            window.location.href = exploreBtn.dataset.href;
          }, 2800);
        })
        .catch(() => {
          window.location.href = exploreBtn.dataset.href;
        });
    } else {
      window.location.href = exploreBtn.dataset.href;
    }
  });
}


  /* ══════════════════════════════════════════════════════════
     3. MOBILE HAMBURGER TOGGLE
  ══════════════════════════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }


  /* ══════════════════════════════════════════════════════════
     4. SCROLL-TRIGGERED FADE-UP for cards & sections
  ══════════════════════════════════════════════════════════ */
  const animatedEls = document.querySelectorAll(
    '.chart-card, .page-card, .fact-card, .spotlight-card, .finding-item, .stat-card'
  );

  // Apply base class for CSS transition
  animatedEls.forEach(el => el.classList.add('animate-on-scroll'));

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Slight stagger per batch
          const delay = (i % 6) * 60;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

    animatedEls.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: show all
    animatedEls.forEach(el => el.classList.add('is-visible'));
  }


  /* ══════════════════════════════════════════════════════════
     5. SPOTLIGHT BARS — animate width on scroll
  ══════════════════════════════════════════════════════════ */
  const spotlightBars = document.querySelectorAll('.spotlight-bar');

  if ('IntersectionObserver' in window && spotlightBars.length) {
    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.style.width;
          bar.style.width = '0%';
          requestAnimationFrame(() => {
            bar.style.width = target;
          });
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    spotlightBars.forEach(bar => barObserver.observe(bar));
  }


  /* ══════════════════════════════════════════════════════════
     6. CHART IMAGE — lightbox zoom on click
  ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('.chart-img-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const img = wrap.querySelector('img');
      if (!img) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:9999;
        background:rgba(0,0,0,0.93);
        display:flex;align-items:center;justify-content:center;
        cursor:zoom-out;padding:1.5rem;
        animation:_lbFade 0.2s ease forwards;
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes _lbFade { from{opacity:0} to{opacity:1} }
        @keyframes _lbImg  { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
      `;
      document.head.appendChild(style);

      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.style.cssText = `
        max-width:94vw;max-height:90vh;object-fit:contain;
        border-radius:10px;box-shadow:0 30px 80px rgba(0,0,0,0.8);
        animation:_lbImg 0.25s ease forwards;
      `;

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.cssText = `
        position:absolute;top:1.25rem;right:1.5rem;
        background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
        color:#fff;font-size:16px;width:36px;height:36px;border-radius:50%;
        cursor:pointer;display:flex;align-items:center;justify-content:center;
        transition:background 0.2s;
      `;
      closeBtn.addEventListener('mouseover', () => closeBtn.style.background = 'rgba(229,9,20,0.5)');
      closeBtn.addEventListener('mouseout',  () => closeBtn.style.background = 'rgba(255,255,255,0.1)');

      const close = () => {
        overlay.remove();
        style.remove();
        document.body.style.overflow = '';
      };

      overlay.appendChild(bigImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      closeBtn.addEventListener('click', close);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once: true });
    });
  });


  /* ══════════════════════════════════════════════════════════
     7. SMOOTH SCROLL for anchor links
  ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  console.log('%c🎬 Netflix Dashboard v2.0 loaded', 'color:#E50914;font-weight:700;font-size:13px;');
});
