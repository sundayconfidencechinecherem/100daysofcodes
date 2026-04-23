// ============================================================
// DOM Elements
// ============================================================

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

// Contact Form
const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');

// Smooth scroll for all anchor links
const allLinks = document.querySelectorAll('a[href^="#"]');

// ============================================================
// Mobile Menu Functions
// ============================================================

function openMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Event listeners for mobile menu
if (menuToggle) {
  menuToggle.addEventListener('click', openMobileMenu);
}

if (closeMenu) {
  closeMenu.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-links a');
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

// ============================================================
// Smooth Scroll
// ============================================================

allLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    
    // Skip if it's just "#" or empty
    if (!targetId || targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================================
// Active Navigation Highlight
// ============================================================

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-links a');
  
  let currentSection = '';
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ============================================================
// Header Background Change on Scroll
// ============================================================

const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

// ============================================================
// Parallax Effect for Hero (Optional)
// ============================================================

const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
}

// ============================================================
// Scroll Animations (Intersection Observer)
// ============================================================

const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .philosophy-grid > *');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ============================================================
// BOOKING PAGE FUNCTIONALITY
// ============================================================

// Check if we're on the booking page
if (document.querySelector('.booking-section')) {
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all other items
        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
          }
        });
        // Toggle current item
        if (!isOpen) {
          item.classList.add('open');
        } else {
          item.classList.remove('open');
        }
      });
    }
  });
  
  // Set minimum date for date picker
  const dateInput = document.getElementById('eventDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
  
  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0) {
        if (value.length <= 3) {
          value = '+' + value;
        } else if (value.length <= 6) {
          value = '+' + value.slice(0, 3) + ' ' + value.slice(3);
        } else {
          value = '+' + value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
        }
        e.target.value = value;
      }
    });
  }
  
  // Guest count validation
  const guestCountInput = document.getElementById('guestCount');
  if (guestCountInput) {
    guestCountInput.addEventListener('input', function(e) {
      let value = parseInt(e.target.value);
      if (value < 1) {
        e.target.value = '';
      } else if (value > 5000) {
        e.target.value = 5000;
      }
    });
  }
}

// ============================================================
// Form Validation and Submission (Main Contact Form)
// ============================================================

function validateField(field, value) {
  const fieldName = field.id || field.name;
  const errorSpan = field.parentElement?.querySelector('.error-msg');
  
  if (!value.trim()) {
    if (errorSpan) errorSpan.textContent = 'This field is required';
    field.classList.add('error');
    return false;
  }
  
  if (fieldName === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      if (errorSpan) errorSpan.textContent = 'Please enter a valid email address';
      field.classList.add('error');
      return false;
    }
  }
  
  if (fieldName === 'phone' && value.trim()) {
    const phoneRegex = /^[\+\d\s\-\(\)]{8,}$/;
    if (!phoneRegex.test(value)) {
      if (errorSpan) errorSpan.textContent = 'Please enter a valid phone number';
      field.classList.add('error');
      return false;
    }
  }
  
  if (errorSpan) errorSpan.textContent = '';
  field.classList.remove('error');
  return true;
}

// Clear validation errors on input
const formInputs = document.querySelectorAll('#bookingForm input, #bookingForm select, #bookingForm textarea');
formInputs.forEach(input => {
  input.addEventListener('input', function() {
    const errorSpan = this.parentElement?.querySelector('.error-msg');
    if (errorSpan) errorSpan.textContent = '';
    this.classList.remove('error');
  });
});

// Booking Form Submission
if (bookingForm) {
  
  function validateBookingForm() {
    let isValid = true;
    
    // Required fields for booking form
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const experienceType = document.getElementById('experienceType');
    const eventDate = document.getElementById('eventDate');
    const location = document.getElementById('location');
    const message = document.getElementById('message');
    
    if (firstName && !validateField(firstName, firstName.value)) isValid = false;
    if (lastName && !validateField(lastName, lastName.value)) isValid = false;
    if (email && !validateField(email, email.value)) isValid = false;
    if (experienceType && !validateField(experienceType, experienceType.value)) isValid = false;
    if (eventDate && !validateField(eventDate, eventDate.value)) isValid = false;
    if (location && !validateField(location, location.value)) isValid = false;
    if (message && !validateField(message, message.value)) isValid = false;
    
    // Optional phone
    const phone = document.getElementById('phone');
    if (phone && phone.value.trim()) {
      if (!validateField(phone, phone.value)) isValid = false;
    }
    
    return isValid;
  }
  
  function showStatus(message, type) {
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.className = `form-status ${type}`;
      formStatus.style.display = 'block';
      
      setTimeout(() => {
        if (formStatus) {
          formStatus.style.display = 'none';
          formStatus.className = 'form-status';
        }
      }, 5000);
    }
  }
  
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateBookingForm()) {
      showStatus('Please fill in all required fields correctly.', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) {
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
    }
    
    // Honeypot anti-spam check
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value) {
      // Bot detected - pretend success
      showStatus('Your request has been received. We will contact you soon.', 'success');
      bookingForm.reset();
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
      return;
    }
    
    try {
      // Simulate API call - Replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showStatus('Thank you! Your booking request has been submitted. We will contact you within 24 hours.', 'success');
      bookingForm.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      showStatus('Something went wrong. Please try again or contact us directly.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  });
}

// ============================================================
// Console Log for Initialization
// ============================================================

console.log('Chef Bio Portfolio — Initialized');