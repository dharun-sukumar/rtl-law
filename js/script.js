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

  // Dropdowns are always visible on mobile; no tap-to-reveal needed

    // Close mobile menu when clicking on nav links (not dropdown parent)
    const navLinks = navbarNav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        // Also close all open dropdowns
        const openDropdowns = navbarNav.querySelectorAll('.nav-item.open');
        openDropdowns.forEach(item => item.classList.remove('open'));
      });
    });
  }
// Dropdown hover for desktop
function initDropdownHover() {
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (!toggle) return;
    // Desktop hover
    dropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth > 768) {
        dropdown.classList.add('open');
      }
    });
    dropdown.addEventListener('mouseleave', function() {
      if (window.innerWidth > 768) {
        dropdown.classList.remove('open');
      }
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
  // Register the zoom plugin if available
  if (window.ChartZoom) {
    Chart.register(window.ChartZoom);
  }
  
  console.log('Initializing dashboard charts...');
  
  // Revenue Chart
  const revenueChartElement = document.getElementById('revenueChart');
  
  if (revenueChartElement) {
    console.log('Revenue chart element found, initializing...');
    // Ensure proper canvas sizing
    const container = revenueChartElement.parentElement;
    revenueChartElement.style.width = '100%';
    revenueChartElement.style.height = '100%';
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(revenueChartElement);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = revenueChartElement.getContext('2d');
    
    // Monthly revenue data for the past 12 months
    const monthlyRevenue = [
      { month: 'Feb', revenue: 185000, cases: 45 },
      { month: 'Mar', revenue: 195000, cases: 52 },
      { month: 'Apr', revenue: 210000, cases: 48 },
      { month: 'May', revenue: 198000, cases: 55 },
      { month: 'Jun', revenue: 225000, cases: 58 },
      { month: 'Jul', revenue: 240000, cases: 62 },
      { month: 'Aug', revenue: 220000, cases: 57 },
      { month: 'Sep', revenue: 235000, cases: 61 },
      { month: 'Oct', revenue: 245000, cases: 65 },
      { month: 'Nov', revenue: 255000, cases: 68 },
      { month: 'Dec', revenue: 203421, cases: 59 },
      { month: 'Jan', revenue: 234567, cases: 63 }
    ];
    
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthlyRevenue.map(item => item.month),
        datasets: [{
          label: 'Monthly Revenue ($)',
          data: monthlyRevenue.map(item => item.revenue),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#f59e0b',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#f59e0b',
          pointHoverBorderColor: '#ffffff'
        }, {
          label: 'Cases Completed',
          data: monthlyRevenue.map(item => item.cases * 1000), // Multiply for scale
          borderColor: '#1e3a8a',
          backgroundColor: 'rgba(30, 58, 138, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#1e3a8a',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#1e3a8a',
          pointHoverBorderColor: '#ffffff',
          yAxisID: 'y1'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          zoom: window.ChartZoom ? {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            }
          } : undefined,
          title: {
            display: false
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              font: {
                size: 12
              },
              color: '#374151'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#f59e0b',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                if (context.datasetIndex === 0) {
                  return 'Revenue: $' + context.parsed.y.toLocaleString();
                } else {
                  return 'Cases: ' + (context.parsed.y / 1000).toFixed(0);
                }
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 11
              }
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 11
              },
              callback: function(value) {
                return '$' + (value / 1000).toFixed(0) + 'K';
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 11
              },
              callback: function(value) {
                return (value / 1000).toFixed(0);
              }
            }
          }
        }
      }
    });
    
    // Add double-click to reset zoom
    revenueChartElement.addEventListener('dblclick', () => {
      if (chart.resetZoom) {
        chart.resetZoom();
      }
    });
    
    console.log('Revenue chart initialized successfully');
  } else {
    console.log('Revenue chart element not found');
  }
  
  // Case Types Distribution Chart (Doughnut)
  const caseTypesChartElement = document.getElementById('caseTypesChart');
  
  if (caseTypesChartElement) {
    // Ensure proper canvas sizing
    caseTypesChartElement.style.width = '100%';
    caseTypesChartElement.style.height = '100%';
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(caseTypesChartElement);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = caseTypesChartElement.getContext('2d');
    
    const caseTypesChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Corporate Law', 'Family Law', 'Criminal Defense', 'Real Estate', 'Employment Law', 'Personal Injury'],
        datasets: [{
          data: [35, 22, 18, 12, 8, 5],
          backgroundColor: [
            '#1e3a8a',
            '#f59e0b',
            '#dc2626',
            '#059669',
            '#7c3aed',
            '#ea580c'
          ],
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          duration: 1200,
          easing: 'easeInOutQuart'
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 11
              },
              color: '#374151',
              padding: 15,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#f59e0b',
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return context.label + ': ' + context.parsed + '% (' + percentage + '%)';
              }
            }
          }
        }
      }
    });
  }
  
  // Case Status Overview Chart (Bar)
  const caseStatusChartElement = document.getElementById('caseStatusChart');
  
  if (caseStatusChartElement) {
    // Ensure proper canvas sizing
    caseStatusChartElement.style.width = '100%';
    caseStatusChartElement.style.height = '100%';
    
    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(caseStatusChartElement);
    if (existingChart) {
      existingChart.destroy();
    }
    
    const ctx = caseStatusChartElement.getContext('2d');
    
    const caseStatusChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Active Cases', 'Pending Review', 'In Court', 'Closed This Month', 'Urgent Priority'],
        datasets: [{
          label: 'Number of Cases',
          data: [87, 23, 15, 42, 8],
          backgroundColor: [
            '#10b981',
            '#f59e0b',
            '#3b82f6',
            '#6b7280',
            '#ef4444'
          ],
          borderColor: [
            '#059669',
            '#d97706',
            '#2563eb',
            '#4b5563',
            '#dc2626'
          ],
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#f59e0b',
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return context.parsed.y + ' cases';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 10
              },
              maxRotation: 45
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              color: '#6b7280',
              font: {
                size: 11
              },
              stepSize: 10
            }
          }
        }
      }
    });
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initRTLToggle();
  initMobileMenu();
  initDropdownHover();
  closeMobileMenuOnLTRToggle();
  setActiveNavLink();
  initFormValidation();
  initSmoothScrolling();
  initScrollAnimations();
  initCountdownTimer();
  initDashboardCharts();
  initImageSlider();
});
window.addEventListener('load', function() {
  initDashboardCharts();
  // Other initializations...
});
// Image Slider Functionality
let currentSlideIndex = 0;
let slideInterval;

function initImageSlider() {
  const slider = document.getElementById('whyChooseSlider');
  if (!slider) return;
  
  // Start auto-slide
  startAutoSlide();
  
  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
  
  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  });
  
  slider.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoSlide();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        changeSlide(1); // Swipe left - next slide
      } else {
        changeSlide(-1); // Swipe right - previous slide
      }
    }
  }
}

function changeSlide(direction) {
  const sliderTrack = document.getElementById('sliderTrack');
  const indicators = document.querySelectorAll('.indicator');
  const slides = document.querySelectorAll('.slide');
  
  if (!sliderTrack || !indicators.length || !slides.length) return;
  
  // Remove active classes
  slides[currentSlideIndex].classList.remove('active');
  indicators[currentSlideIndex].classList.remove('active');
  
  // Calculate new slide index
  currentSlideIndex += direction;
  
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  // Apply transform and active classes
  const translateX = -currentSlideIndex * (100 / slides.length);
  sliderTrack.style.transform = `translateX(${translateX}%)`;
  
  slides[currentSlideIndex].classList.add('active');
  indicators[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
  const sliderTrack = document.getElementById('sliderTrack');
  const indicators = document.querySelectorAll('.indicator');
  const slides = document.querySelectorAll('.slide');
  
  if (!sliderTrack || !indicators.length || !slides.length) return;
  
  // Remove active classes
  slides[currentSlideIndex].classList.remove('active');
  indicators[currentSlideIndex].classList.remove('active');
  
  // Set new index
  currentSlideIndex = index - 1;
  
  // Apply transform and active classes
  const translateX = -currentSlideIndex * (100 / slides.length);
  sliderTrack.style.transform = `translateX(${translateX}%)`;
  
  slides[currentSlideIndex].classList.add('active');
  indicators[currentSlideIndex].classList.add('active');
  
  // Restart auto-slide
  stopAutoSlide();
  startAutoSlide();
}

function startAutoSlide() {
  slideInterval = setInterval(function() {
    changeSlide(1);
  }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

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
  initDashboardCharts,
  changeSlide,
  currentSlide
};