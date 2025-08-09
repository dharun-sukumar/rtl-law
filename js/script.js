// Law Firm Website Template - Main JavaScript

// RTL Toggle Functionality
function initRTLToggle() {
  const rtlToggle = document.getElementById('rtl-toggle');
  const body = document.body;
  
  if (rtlToggle) {
    // Check for saved RTL preference
    const isRTL = localStorage.getItem('rtl-mode') === 'true';
    if (isRTL) {
      body.setAttribute('dir', 'rtl');
      rtlToggle.textContent = 'LTR';
    }
    
    rtlToggle.addEventListener('click', function() {
      const currentDir = body.getAttribute('dir');
      if (currentDir === 'rtl') {
        body.removeAttribute('dir');
        rtlToggle.textContent = 'RTL';
        localStorage.setItem('rtl-mode', 'false');
      } else {
        body.setAttribute('dir', 'rtl');
        rtlToggle.textContent = 'LTR';
        localStorage.setItem('rtl-mode', 'true');
      }
    });
  }
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navbarNav = document.getElementById('navbar-nav');
  
  if (mobileToggle && navbarNav) {
    mobileToggle.addEventListener('click', function() {
      navbarNav.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const isExpanded = navbarNav.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = navbarNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Close mobile menu when LTR button is clicked
function closeMobileMenuOnLTRToggle() {
  const rtlToggle = document.getElementById('rtl-toggle');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navbarNav = document.getElementById('navbar-nav');

  if (rtlToggle && mobileToggle && navbarNav) {
    rtlToggle.addEventListener('click', function() {
      if (navbarNav.classList.contains('active')) {
        navbarNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Active Navigation Link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const formObject = {};
      
      // Convert FormData to object
      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }
      
      // Basic validation
      if (validateForm(formObject)) {
        // Simulate form submission
        showNotification('Form submitted successfully!', 'success');
        form.reset();
      } else {
        showNotification('Please fill in all required fields.', 'error');
      }
    });
  });
}

function validateForm(formData) {
  // Basic validation - check if required fields are filled
  for (let [key, value] of Object.entries(formData)) {
    const input = document.querySelector(`[name="${key}"]`);
    if (input && input.hasAttribute('required') && !value.trim()) {
      return false;
    }
  }
  return true;
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
  `;
  
  // Add notification styles if not already present
  if (!document.querySelector('#notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease-out;
      }
      .notification-success { background: #10b981; }
      .notification-error { background: #ef4444; }
      .notification-info { background: #3b82f6; }
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
      }
    `;
    document.head.appendChild(styles);
  }
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
  });
}

// Countdown Timer for Coming Soon Page
function initCountdownTimer() {
  const countdownElements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };
  
  // Check if countdown elements exist
  if (!countdownElements.days) return;
  
  // Set target date (30 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    if (distance < 0) {
      // Countdown finished
      Object.values(countdownElements).forEach(element => {
        if (element) element.textContent = '00';
      });
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (countdownElements.days) countdownElements.days.textContent = String(days).padStart(2, '0');
    if (countdownElements.hours) countdownElements.hours.textContent = String(hours).padStart(2, '0');
    if (countdownElements.minutes) countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
    if (countdownElements.seconds) countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Dashboard Chart Simulation (Simple)
function initDashboardCharts() {
  const chartElements = document.querySelectorAll('.chart-placeholder');
  
  chartElements.forEach(element => {
    const canvas = document.createElement('canvas');
    canvas.width = element.offsetWidth;
    canvas.height = 200;
    
    const ctx = canvas.getContext('2d');
    
    // Simple bar chart simulation
    const data = [65, 59, 80, 81, 56, 55, 40];
    const max = Math.max(...data);
    const barWidth = canvas.width / data.length;
    
    ctx.fillStyle = '#f59e0b';
    
    data.forEach((value, index) => {
      const barHeight = (value / max) * (canvas.height - 20);
      const x = index * barWidth + 10;
      const y = canvas.height - barHeight - 10;
      
      ctx.fillRect(x, y, barWidth - 20, barHeight);
    });
    
    element.appendChild(canvas);
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initRTLToggle();
  initMobileMenu();
  closeMobileMenuOnLTRToggle();
  setActiveNavLink();
  initFormValidation();
  initSmoothScrolling();
  initScrollAnimations();
  initCountdownTimer();
  initDashboardCharts();
});

// Handle window resize for responsive charts
window.addEventListener('resize', function() {
  // Reinitialize charts on resize
  setTimeout(initDashboardCharts, 100);
});

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for potential external use
window.LawFirmTemplate = {
  showNotification,
  initCountdownTimer,
  initDashboardCharts
};