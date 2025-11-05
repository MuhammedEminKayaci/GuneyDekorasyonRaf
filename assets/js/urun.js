// Lightbox
    const img = document.getElementById("main-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const close = document.querySelector(".close-lightbox");

    img.onclick = function() {
      lightbox.style.display = "block";
      lightboxImg.src = this.src;
    };
    close.onclick = function() {
      lightbox.style.display = "none";
    };
    window.onclick = function(e) {
      if (e.target == lightbox) lightbox.style.display = "none";
    };

        const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('close-btn');
    const mankenlerBtn = document.getElementById('mankenler-btn');
    const submenu = document.getElementById('submenu');
    const plusBtn = document.getElementById('plus');

    menuToggle.addEventListener('click', () => {
      mobileNav.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });

    mankenlerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      submenu.classList.toggle('active');
      plusBtn.classList.toggle('rotate');
    });



   const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let current = 0;

// Noktaları oluştur
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');

function goToSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

nextBtn.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  goToSlide(current);
});

prevBtn.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  goToSlide(current);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToSlide(i));
});

setInterval(() => {
  current = (current + 1) % slides.length;
  goToSlide(current);
}, 7000);


/* ===== Footer Map & Year ===== */
function initFooterMap() {
  const el = document.getElementById('footer-map');
  if (!el || typeof L === 'undefined') return;

  // Güncel koordinatlar: İstanbul, Bakırköy
  const center = [41.013544, 28.8814898];

  const map = L.map(el, {
    center, 
    zoom: 15, 
    zoomControl: true, 
    scrollWheelZoom: false, 
    attributionControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  const marker = L.marker(center).addTo(map);
  marker.bindPopup('<b>Güney Mağaza Dekorasyon</b><br>İstanbul, Bakırköy');

  el.addEventListener('touchstart', () => {}, { passive: true });
}

function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  try { setYear(); initFooterMap(); } catch(e) { console.error(e); }
});
