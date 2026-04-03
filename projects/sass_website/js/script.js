// ===== DOM Elements =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const backToTopBtn = document.getElementById('backToTop');
const fadeElements = document.querySelectorAll('.fade-in');

// ===== Mobile Detection =====
const isMobile = () => window.innerWidth <= 768;
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// ===== Mobile Menu Toggle with Improved Accessibility =====
function toggleMenu() {
  navMenu.classList.toggle('active');
  const isExpanded = navMenu.classList.contains('active');
  hamburgerBtn.setAttribute('aria-expanded', isExpanded);
  
  // Prevent body scroll when menu is open
  if (isExpanded) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  
  const lines = hamburgerBtn.querySelectorAll('.hamburger-line');
  if (isExpanded) {
    lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    lines[1].style.opacity = '0';
    lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
  } else {
    lines[0].style.transform = 'none';
    lines[1].style.opacity = '1';
    lines[2].style.transform = 'none';
  }
}

function closeMenu() {
  navMenu.classList.remove('active');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  const lines = hamburgerBtn.querySelectorAll('.hamburger-line');
  lines[0].style.transform = 'none';
  lines[1].style.opacity = '1';
  lines[2].style.transform = 'none';
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', toggleMenu);
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (isMobile()) {
      closeMenu();
    }
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#') {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('active') && isMobile()) {
    if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  }
});

// ===== Sticky Navbar with Performance =====
let ticking = false;

function handleStickyNav() {
  if (!ticking) {
    requestAnimationFrame(() => {
      if (window.scrollY > 50) {
        header.classList.add('sticky-shadow');
      } else {
        header.classList.remove('sticky-shadow');
      }
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', handleStickyNav, { passive: true });

// ===== Back to Top Button =====
function handleBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.opacity = '1';
  } else {
    backToTopBtn.style.opacity = '0';
    setTimeout(() => {
      if (window.scrollY <= 300) {
        backToTopBtn.style.display = 'none';
      }
    }, 300);
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.addEventListener('scroll', handleBackToTop, { passive: true });

// ===== Scroll Spy with Throttle =====
const sections = document.querySelectorAll('section[id]');
let scrollTimeout;

function updateActiveNav() {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  
  scrollTimeout = setTimeout(() => {
    let current = '';
    const scrollPosition = window.scrollY + header.offsetHeight + 50;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }, 100);
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

// ===== Scroll Reveal Animation with Intersection Observer =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// ===== Dynamic Copyright Year =====
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== Button Interactions with Smooth Scroll =====
const getStartedBtns = document.querySelectorAll('.btn-primary, .navbar-cta .btn-primary');
getStartedBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      const headerOffset = header.offsetHeight;
      const elementPosition = pricingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const learnMoreBtn = document.querySelector('.btn-secondary');
if (learnMoreBtn) {
  learnMoreBtn.addEventListener('click', () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      const headerOffset = header.offsetHeight;
      const elementPosition = featuresSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}

// ===== Newsletter Subscription (Demo) =====
const subscribeBtn = document.querySelector('.newsletter-input button');
if (subscribeBtn) {
  subscribeBtn.addEventListener('click', () => {
    const emailInput = document.querySelector('.newsletter-input input');
    if (emailInput && emailInput.value) {
      alert(`Thanks for subscribing with ${emailInput.value}! We'll keep you updated.`);
      emailInput.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// ===== Handle Window Resize for Mobile Menu =====
let resizeTimer;
window.addEventListener('resize', () => {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      closeMenu();
    }
  }, 250);
});

// ===== Lazy Loading Images with Intersection Observer =====
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Performance: Reduce Motion for Users Who Prefer It =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}

// Initial calls
handleStickyNav();
handleBackToTop();
