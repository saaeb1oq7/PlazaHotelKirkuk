// =========================
// Block 8 — Dark Mode Toggle
// =========================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  };
  // On load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') setTheme('dark');
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// =========================
// Block 9 — Scroll Animations (Intersection Observer)
// =========================
const fadeEls = document.querySelectorAll('.fade-in-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));
}

// =========================
// Block 10 — Reviews Carousel
// =========================
(function() {
  const track = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.dot');
  const carousel = document.querySelector('.reviews-carousel');
  const cards = document.querySelectorAll('.review-card');
  const totalSlides = cards.length;
  let currentSlide = 0;
  let visibleCards = window.innerWidth < 768 ? 1 : 3;
  let autoAdvance;

  function updateVisibleCards() {
    visibleCards = window.innerWidth < 768 ? 1 : 3;
  }

  function showSlide(index) {
    updateVisibleCards();
    // Clamp and wrap
    if (index < 0) index = totalSlides - visibleCards;
    if (index > totalSlides - visibleCards) index = 0;
    currentSlide = index;
    const percent = (100 / visibleCards) * index;
    track.style.transform = `translateX(-${percent}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (prevBtn && nextBtn && track && dots.length) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
    });
    function startAuto() {
      autoAdvance = setInterval(nextSlide, 5000);
    }
    function stopAuto() {
      clearInterval(autoAdvance);
    }
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize', () => showSlide(currentSlide));
    showSlide(0);
    startAuto();
  }
})();
// Block 1 — Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// Block 2 — Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Block 3 — Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 70;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// Block 4 — Book This Room button pre-selection
const bookBtns = document.querySelectorAll('.book-btn');
bookBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const roomType = btn.getAttribute('data-room');
    const bookingSection = document.getElementById('booking');
    const roomSelect = bookingSection && bookingSection.querySelector('select[name="room"]');
    if (roomSelect) {
      roomSelect.value = roomType;
      const navHeight = navbar ? navbar.offsetHeight : 70;
      const targetPosition = bookingSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// Block 5 — Booking form validation
const bookingForm = document.querySelector('.booking-card form');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    let valid = true;
    bookingForm.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
      const errMsg = el.querySelector('.error-msg');
      if (errMsg) errMsg.remove();
    });
    const checkin = bookingForm.querySelector('input[name="checkin"]');
    const checkout = bookingForm.querySelector('input[name="checkout"]');
    const room = bookingForm.querySelector('select[name="room"]');
    const guests = bookingForm.querySelector('input[name="guests"]');
    const name = bookingForm.querySelector('input[name="name"]');
    const email = bookingForm.querySelector('input[name="email"]');
    [checkin, checkout, room, guests, name, email].forEach(field => {
      if (!field.value) {
        valid = false;
        field.parentElement.classList.add('error');
        field.parentElement.insertAdjacentHTML('beforeend', '<span class="error-msg">Required</span>');
      }
    });
    if (checkin.value && checkout.value && checkout.value <= checkin.value) {
      valid = false;
      checkout.parentElement.classList.add('error');
      checkout.parentElement.insertAdjacentHTML('beforeend', '<span class="error-msg">Check-out must be after check-in</span>');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
      valid = false;
      email.parentElement.classList.add('error');
      email.parentElement.insertAdjacentHTML('beforeend', '<span class="error-msg">Invalid email</span>');
    }
    if (!valid) {
      e.preventDefault();
    }
  });
}

// Block 6 — Gallery tab filtering
const tabs = document.querySelectorAll('.tab');
const galleryCells = document.querySelectorAll('.gallery-cell');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.getAttribute('data-filter');
    galleryCells.forEach(cell => {
      if (filter === 'all' || cell.getAttribute('data-room') === filter) {
        cell.classList.remove('hidden');
      } else {
        cell.classList.add('hidden');
      }
    });
  });
});

// =========================
// Map — Find Us Section (Leaflet)
// =========================
document.addEventListener('DOMContentLoaded', function() {
  var mapEl = document.getElementById('map');
  if (mapEl) {
    var map = L.map('map').setView([35.4587233, 44.382137], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([35.4587233, 44.382137]).addTo(map)
      .bindPopup('Kirkuk Plaza Hotel').openPopup();
  }
});

// Block 7 — Lightbox
const galleryData = [
  { emoji: '🛏', caption: 'Standard · Bedroom', badge: 'STANDARD', bg: 'standard-bg', url: 'https://source.unsplash.com/600x400/?hotel,bedroom,luxury' },
  { emoji: '🚿', caption: 'Standard · Bathroom', badge: 'STANDARD', bg: 'standard-bg', url: 'https://source.unsplash.com/600x400/?hotel,bathroom,modern' },
  { emoji: '🌆', caption: 'Standard · City View', badge: 'STANDARD', bg: 'standard-bg', url: 'https://source.unsplash.com/600x400/?city,view,window,night' },
  { emoji: '🛏', caption: 'Deluxe · Bedroom', badge: 'DELUXE', bg: 'deluxe-bg', url: 'https://source.unsplash.com/600x400/?deluxe,hotel,bedroom' },
  { emoji: '🌅', caption: 'Deluxe · Private Balcony', badge: 'DELUXE', bg: 'deluxe-bg', url: 'https://source.unsplash.com/600x400/?hotel,balcony,view' },
  { emoji: '🛁', caption: 'Deluxe · Soaking Tub', badge: 'DELUXE', bg: 'deluxe-bg', url: 'https://source.unsplash.com/600x400/?bathtub,luxury,spa' },
  { emoji: '🛋', caption: 'VIP · Living Room', badge: 'VIP SUITE', bg: 'vip-bg', url: 'https://source.unsplash.com/600x400/?luxury,suite,living,room' },
  { emoji: '🛏', caption: 'VIP · Master Bedroom', badge: 'VIP SUITE', bg: 'vip-bg', url: 'https://source.unsplash.com/600x400/?luxury,master,bedroom' },
  { emoji: '🛁', caption: 'VIP · Jacuzzi', badge: 'VIP SUITE', bg: 'vip-bg', url: 'https://source.unsplash.com/600x400/?jacuzzi,luxury,spa' },
  { emoji: '🌇', caption: 'VIP · Panoramic View', badge: 'VIP SUITE', bg: 'vip-bg', url: 'https://source.unsplash.com/600x400/?panoramic,city,skyline' },
  { emoji: '🚪', caption: 'Presidential · Grand Entrance', badge: 'PRESIDENTIAL', bg: 'presidential-bg', url: 'https://source.unsplash.com/600x400/?hotel,grand,entrance,lobby' },
  { emoji: '👑', caption: 'Presidential · Master Bedroom', badge: 'PRESIDENTIAL', bg: 'presidential-bg', url: 'https://source.unsplash.com/600x400/?presidential,suite,bedroom' },
  { emoji: '🏙', caption: 'Presidential · Private Terrace', badge: 'PRESIDENTIAL', bg: 'presidential-bg', url: 'https://source.unsplash.com/600x400/?penthouse,terrace,city' },
  { emoji: '🍳', caption: 'Presidential · Full Kitchen', badge: 'PRESIDENTIAL', bg: 'presidential-bg', url: 'https://source.unsplash.com/600x400/?luxury,kitchen,modern' }
];
let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox && lightbox.querySelector('.lightbox-img');
const lbCaption = lightbox && lightbox.querySelector('.lightbox-caption h4');
const lbBadge = lightbox && lightbox.querySelector('.lb-badge');
const lbPrev = lightbox && lightbox.querySelector('.lb-prev');
const lbNext = lightbox && lightbox.querySelector('.lb-next');
const lbClose = lightbox && lightbox.querySelector('.lb-close');

function showLightboxItem(index) {
  if (!lightbox) return;
  currentIndex = index;
  const item = galleryData[index];
  lbImg.style.backgroundImage = 'url(' + item.url + ')';
  lbImg.style.backgroundSize = 'cover';
  lbImg.style.backgroundPosition = 'center';
  lbImg.innerText = '';
  lbImg.className = 'lightbox-img';
  lbCaption.innerText = item.caption;
  lbBadge.innerText = item.badge;
}

galleryCells.forEach(cell => {
  cell.addEventListener('click', () => {
    const idx = parseInt(cell.getAttribute('data-index'), 10);
    showLightboxItem(idx);
    lightbox.style.display = 'flex';
  });
});

if (lbClose) {
  lbClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
}
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}
if (lbPrev) {
  lbPrev.addEventListener('click', () => {
    let idx = (currentIndex - 1 + galleryData.length) % galleryData.length;
    showLightboxItem(idx);
  });
}
if (lbNext) {
  lbNext.addEventListener('click', () => {
    let idx = (currentIndex + 1) % galleryData.length;
    showLightboxItem(idx);
  });
}
document.addEventListener('keydown', e => {
  if (lightbox && lightbox.style.display === 'flex') {
    if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    } else if (e.key === 'ArrowLeft') {
      let idx = (currentIndex - 1 + galleryData.length) % galleryData.length;
      showLightboxItem(idx);
    } else if (e.key === 'ArrowRight') {
      let idx = (currentIndex + 1) % galleryData.length;
      showLightboxItem(idx);
    }
  }
});
