import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

// === LENIS SMOOTH SCROLL ===
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// === HEADER HIDE/SHOW ON SCROLL ===
const header = document.getElementById('header');
let lastScroll = 0;
lenis.on('scroll', ({ scroll }) => {
  if (scroll > 120) {
    header.classList.toggle('hidden', scroll > lastScroll);
  } else {
    header.classList.remove('hidden');
  }
  lastScroll = scroll;
});

// === MOBILE MENU ===
const burger = document.getElementById('header-burger');
const nav = document.getElementById('header-nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
}

// === HERO ANIMATIONS ===
function initHero() {
  const heroSection = document.querySelector('.hero');
  const canvas = document.getElementById('hero-canvas');
  if (!heroSection || !canvas) return;

  const context = canvas.getContext('2d');
  
  // Set canvas size to match viewport
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  const frameCount = 241; // 000 to 240
  const currentFrame = index => (
    `/Frame/frame_${String(index).padStart(3, '0')}_delay-0.041s.png`
  );

  const images = [];
  const seq = { frame: 0 };

  let loadedCount = 0;
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
      loadedCount++;
      // Render the first frame as soon as it's ready
      if (loadedCount === 1) {
        render();
      }
    };
    images.push(img);
  }

  function render() {
    if (images[seq.frame] && images[seq.frame].complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[seq.frame];
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }

  // Frame sequence animation tied to hero section scroll
  gsap.to(seq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "bottom bottom",
      scrub: true // Smooth scrubbing via Lenis
    },
    onUpdate: render
  });

  // Phase 1 Text Animation (Moves UP out of viewport smoothly)
  const phase1 = document.querySelector('.phase-1 .hero-giant-title');
  if (phase1) {
    const text = phase1.textContent;
    phase1.innerHTML = '';
    [...text].forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      phase1.appendChild(span);
    });
    
    // Initial Load entrance
    gsap.fromTo(phase1.querySelectorAll('span'), 
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.08, ease: 'expo.out', delay: 0 }
    );

    // Scroll out effect - Move UP and out (like Lagom)
    gsap.to(phase1, {
      y: '-120vh',
      opacity: 0.2, // Subtle fade out as it moves up
      scrollTrigger: {
        trigger: '.phase-1',
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Phase 2 Text Animation (Moves up naturally from below)
  const phase2Content = document.querySelector('.phase-2 .hero-content');
  if (phase2Content) {
    // Scroll in effect - smooth rise from bottom
    gsap.fromTo(phase2Content, 
      { opacity: 0, y: '50vh' },
      { opacity: 1, y: 0,
        scrollTrigger: {
          trigger: '.phase-2',
          start: "top 90%",
          end: "center center",
          scrub: true
        }
      }
    );

    // Scroll out effect - continues moving up
    gsap.to(phase2Content, {
      opacity: 0, y: '-50vh',
      scrollTrigger: {
        trigger: '.phase-2',
        start: "center top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Phase 3 Text Animation
  const phase3Title = document.querySelector('.phase-3 .hero-page3-title');
  if (phase3Title) {
    // Scroll in effect - smooth rise from bottom
    gsap.fromTo(phase3Title,
      { opacity: 0, y: '50vh' },
      { opacity: 1, y: 0,
        scrollTrigger: {
          trigger: '.phase-3',
          start: "top 90%",
          end: "center center",
          scrub: true
        }
      }
    );
  }

  // Toggle pointer events dynamically for interactivity
  ['.phase-1', '.phase-2', '.phase-3'].forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => el.classList.add('active'),
        onLeave: () => el.classList.remove('active'),
        onEnterBack: () => el.classList.add('active'),
        onLeaveBack: () => el.classList.remove('active')
      });
    }
  });
}

// === VERTICAL PROJECT SCROLL ===
function initProjectSlider() {
  const slides = document.querySelectorAll('.project-slide');
  const dots = document.querySelectorAll('.projects-pagination .dot');
  if (slides.length === 0) return;

  // Make dots clickable to jump to a slide
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const targetSlide = slides[index];
      if (targetSlide) {
        targetSlide.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Update dots on scroll
  slides.forEach((slide, index) => {
    ScrollTrigger.create({
      trigger: slide,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) {
          dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }
      }
    });
  });
}

// === TEXT REVEAL ANIMATION (per-word stagger) ===
function initTextReveals() {
  const titles = document.querySelectorAll('.section-title');
  titles.forEach((title) => {
    // Split into words
    const text = title.textContent;
    const words = text.split(' ');
    title.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
    const wordEls = title.querySelectorAll('.word');
    gsap.set(wordEls, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: title,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(wordEls, {
          opacity: 1, y: 0,
          duration: 0.7, stagger: 0.06,
          ease: 'power2.out',
        });
      },
    });
  });
}

// === IMAGE CLIP REVEALS ===
function initImageReveals() {
  const images = document.querySelectorAll('.project-image, .location-image, .management-image');
  images.forEach((img) => {
    gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)' });
    ScrollTrigger.create({
      trigger: img,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(img, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2, ease: 'power3.out',
        });
      },
    });
  });
}

// === STAGGERED FADE-UPS ===
function initFadeUps() {
  const fadeEls = document.querySelectorAll('[data-fade]');
  fadeEls.forEach((el) => {
    const type = el.getAttribute('data-fade');
    let fromVars = { opacity: 0, y: 40 };
    
    if (type === 'left') {
      fromVars = { opacity: 0, x: 40, y: 0 };
    } else if (type === 'right') {
      fromVars = { opacity: 0, x: -40, y: 0 };
    } else if (type === 'up') {
      fromVars = { opacity: 0, y: 40 };
    }

    gsap.set(el, fromVars);
    
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1, x: 0, y: 0,
          duration: 0.8, ease: 'power2.out',
        });
      },
    });
  });
}

// === LOCATION CARDS STAGGER ===
function initLocationCards() {
  const cards = document.querySelectorAll('.location-card');
  cards.forEach((card, i) => {
    gsap.set(card, { opacity: 0, y: 60 });
    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1, y: 0,
          duration: 0.9, delay: i * 0.2,
          ease: 'power2.out',
        });
      },
    });
  });
}

// === ACCORDION ===
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach((item) => {
    const hdr = item.querySelector('.accordion-header');
    hdr.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      items.forEach(i => {
        i.classList.remove('active');
        const body = i.querySelector('.accordion-body');
        gsap.to(body, { height: 0, duration: 0.45, ease: 'power2.inOut' });
      });
      if (!wasActive) {
        item.classList.add('active');
        const body = item.querySelector('.accordion-body');
        gsap.set(body, { height: 'auto' });
        const h = body.offsetHeight;
        gsap.fromTo(body, { height: 0 }, { height: h, duration: 0.55, ease: 'power2.out' });
      }
    });
  });

  // Set initial accordion body heights
  items.forEach((item) => {
    const body = item.querySelector('.accordion-body');
    if (item.classList.contains('active')) {
      body.style.height = 'auto';
    } else {
      body.style.height = '0px';
    }
  });

  // Stagger accordion items on scroll
  gsap.set(items, { opacity: 0, x: 40 });
  ScrollTrigger.create({
    trigger: '.management-accordion',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(items, {
        opacity: 1, x: 0,
        duration: 0.7, stagger: 0.15,
        ease: 'power2.out',
      });
    },
  });
}

// === CONTACT FORM REVEAL ===
function initContactReveal() {
  const container = document.querySelector('.contact-container');
  if (!container) return;
  const children = container.children;
  gsap.set(children, { opacity: 0, y: 50 });
  ScrollTrigger.create({
    trigger: container,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to(children, {
        opacity: 1, y: 0,
        duration: 0.8, stagger: 0.15,
        ease: 'power2.out',
      });
    },
  });
}

// === FOOTER STICKY REVEAL ===
function initFooterReveal() {
  const footer = document.querySelector('.footer');
  const contact = document.querySelector('.contact');
  if (!footer || !contact) return;

  // The footer sits behind the contact section
  // Contact section clips over the footer
  ScrollTrigger.create({
    trigger: footer,
    start: 'top bottom',
    end: 'top top',
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set('.footer-inner', {
        opacity: 0.3 + p * 0.7,
        y: 30 * (1 - p),
      });
    },
  });
}

// === PARALLAX ELEMENTS ===
function initParallax() {
  // Location images subtle parallax
  document.querySelectorAll('.location-image img').forEach((img) => {
    gsap.to(img, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.location-card'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Management image parallax
  const mgmtImg = document.querySelector('.management-image img');
  if (mgmtImg) {
    gsap.to(mgmtImg, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.management',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

// === FORM HANDLING ===
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.textContent = 'Дякуємо! ✓';
    btn.style.background = '#1e7536';
    setTimeout(() => {
      btn.textContent = 'Отримати консультацію';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// === S ANIMATION: s-split section card reveal ===
function initSAnimation() {
  const cards     = document.getElementById('s-split-cards');
  const cardLeft  = document.getElementById('s-card-sti');
  const cardRight = document.getElementById('s-card-ssp');

  if (!cards || !cardLeft || !cardRight) return;

  // Start hidden
  gsap.set(cards,     { opacity: 0 });
  gsap.set(cardLeft,  { x: -80, opacity: 0 });
  gsap.set(cardRight, { x:  80, opacity: 0 });

  // Reveal when the section scrolls into view
  ScrollTrigger.create({
    trigger: '#s-split',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to(cards, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(cardLeft,  { x: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'expo.out' });
      gsap.to(cardRight, { x: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: 'expo.out' });
    }
  });
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initProjectSlider();
  initTextReveals();
  initImageReveals();
  initFadeUps();
  initLocationCards();
  initAccordion();
  initContactReveal();
  initFooterReveal();
  initParallax();
  initForm();
  initSAnimation();
});

