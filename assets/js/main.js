/**
 * AHMAD AFZAL PORTFOLIO — MAIN JS
 * Powered by GSAP + Custom Animations
 */

// ─── Wait for DOM ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  /* ─── GSAP Registration ─── */
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  CustomEase.create("smooth", "M0,0 C0.25,0.1 0.25,1 1,1");
  CustomEase.create("expo", "M0,0 C0.16,1 0.3,1 1,1");

  /* =====================================================
     1. CUSTOM CURSOR
  ===================================================== */
  const cursor        = document.querySelector('.cursor');
  const cursorFollow  = document.querySelector('.cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followX = 0, followY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, {
      x: mouseX, y: mouseY,
      duration: 0.12,
      ease: 'power2.out'
    });
  });

  // Smooth follower
  (function loopFollower() {
    followX += (mouseX - followX) * 0.1;
    followY += (mouseY - followY) * 0.1;
    gsap.set(cursorFollow, { x: followX, y: followY });
    requestAnimationFrame(loopFollower);
  })();

  // Hover expand
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor,       { width: 6,  height: 6,  duration: 0.3 });
      gsap.to(cursorFollow, { width: 56, height: 56, borderColor: 'var(--accent)', duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor,       { width: 10, height: 10, duration: 0.3 });
      gsap.to(cursorFollow, { width: 36, height: 36, borderColor: 'var(--accent)', duration: 0.3 });
    });
  });

  /* =====================================================
     2. LOADER / PAGE INTRO
  ===================================================== */
  const loader    = document.querySelector('.loader');
  const loaderBar = document.querySelector('.loader-bar');
  const loaderTxt = document.querySelector('.loader-text');

  const tl = gsap.timeline({
    onComplete: initPage
  });

  // Loader bar fill
  tl.to(loaderBar, {
    width: '100%',
    duration: 1.2,
    ease: 'power2.inOut'
  });

  // Loader text char reveal
  tl.from(loaderTxt, {
    y: 60,
    opacity: 0,
    duration: 0.6,
    ease: 'expo'
  }, 0);

  // Exit loader
  tl.to(loader, {
    yPercent: -100,
    duration: 0.9,
    ease: 'power3.inOut',
    delay: 0.2
  });

  /* =====================================================
     3. PAGE INIT — Reveal all elements
  ===================================================== */
  function initPage() {
    // Greeting
    gsap.to('.greeting-label', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'expo',
      delay: 0.1
    });

    // Header items stagger
    gsap.from(['.greeting-text', '.hero-name .first-name', '.hero-name .last-name'], {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'expo',
      delay: 0.2
    });

    // Designer rows stagger
    gsap.from('.designer-row', {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1.1,
      ease: 'expo',
      delay: 0.3
    });

    // Circle reveal
    gsap.from('.red-circle', {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.6
    });

    // Model slide up
    gsap.from('.model-img', {
      y: 120,
      opacity: 0,
      duration: 1.3,
      ease: 'expo',
      delay: 0.5
    });

    // Nav items
    gsap.from('.vertical-nav a', {
      opacity: 0,
      x: 20,
      stagger: 0.1,
      duration: 0.7,
      ease: 'expo',
      delay: 0.8
    });

    // Bottom items
    gsap.from(['.tagline', '.social-bar'], {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.7,
      ease: 'expo',
      delay: 0.9
    });

    // Start continuous animations
    startCircleAnimation();
    startModelFloat();
    startTypingEffect();
  }

  /* =====================================================
     4. CIRCLE PULSE ANIMATION — GSAP
  ===================================================== */
  function startCircleAnimation() {
    gsap.to('.circle-wrap', {
      scale: 1.2,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      transformOrigin: 'center center'
    });

    // Also animate the glow box-shadow via CSS variable trick
    gsap.to('.red-circle', {
      boxShadow: '0 0 50px 14px rgba(255,51,0,0.5), 0 0 100px 24px rgba(255,51,0,0.2), inset 0 0 40px 6px rgba(255,51,0,0.12)',
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  /* =====================================================
     5. MODEL FLOAT — 3D Parallax Feeling
  ===================================================== */
  function startModelFloat() {
    gsap.to('.model-wrap', {
      y: -18,
      duration: 3.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Subtle rotate for depth
    gsap.to('.model-img', {
      rotateY: 4,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.5
    });
  }

  /* =====================================================
     6. MULTILINGUAL TYPING EFFECT
  ===================================================== */
  function startTypingEffect() {
    const greetings = [
      { text: 'HOLA',        lang: 'es' },  // Spanish
      { text: '안녕하세요',   lang: 'ko' },  // Korean
      { text: 'こんにちは',  lang: 'ja' },  // Japanese
      { text: 'BONJOUR',     lang: 'fr' },  // French
      { text: 'HALLO',       lang: 'de' },  // German
      { text: 'مرحباً',      lang: 'ar' },  // Arabic
      { text: 'ہیلو',        lang: 'ur' },  // Urdu
      { text: 'CIAO',        lang: 'it' },  // Italian
    ];

    const el = document.querySelector('.greeting-text');
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function type() {
      const current = greetings[currentIndex];
      const fullText = current.text;

      // Update direction for Arabic/Urdu
      el.style.direction = (current.lang === 'ar' || current.lang === 'ur') ? 'rtl' : 'ltr';

      if (!isDeleting) {
        // Typing forward
        el.textContent = fullText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === fullText.length) {
          // Pause at end then start deleting
          isDeleting = true;
          timeoutId = setTimeout(type, 1800);
          return;
        }
      } else {
        // Deleting
        el.textContent = fullText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % greetings.length;
        }
      }

      const speed = isDeleting ? 60 : 110;
      timeoutId = setTimeout(type, speed);
    }

    // Small delay then start
    setTimeout(type, 1400);
  }

  /* =====================================================
     7. PARALLAX — Mouse Move on Designer Text
  ===================================================== */
  const hero = document.querySelector('#hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx; // -1 to 1
      const dy = (clientY - cy) / cy; // -1 to 1

      gsap.to('.designer-row.outline', {
        x: dx * 12,
        y: dy * 6,
        duration: 1.5,
        ease: 'power2.out'
      });
      gsap.to('.designer-row.filled', {
        x: dx * 7,
        y: dy * 4,
        duration: 1.5,
        ease: 'power2.out'
      });
      gsap.to('.designer-row.solid', {
        x: dx * 4,
        y: dy * 2,
        duration: 1.5,
        ease: 'power2.out'
      });
    });
  }

  /* =====================================================
     8. NAV ACTIVE STATE
  ===================================================== */
  document.querySelectorAll('.vertical-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.vertical-nav a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

});
