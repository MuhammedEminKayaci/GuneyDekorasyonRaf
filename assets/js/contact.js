// ...existing code...

/* ===== İletişim: Reveal on scroll ===== */
function initRevealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const show = (el) => el.classList.add('in');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries)=>entries.forEach(e=>e.isIntersecting && (show(e.target), io.unobserve(e.target))), {threshold:.12});
    els.forEach(el=>io.observe(el));
  } else {
    els.forEach(show);
  }
}

/* ===== İletişim: Basit form doğrulama + mesaj ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  const setInvalid = (fg, invalid) => fg.classList.toggle('invalid', invalid);

  const validate = () => {
    let ok = true;
    form.querySelectorAll('.form-group').forEach(fg => {
      const inp = fg.querySelector('input,textarea');
      if (!inp) return;
      const req = inp.hasAttribute('required');
      const val = (inp.value || '').trim();
      const invalid = req && (val === '' || (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)));
      setInvalid(fg, invalid);
      ok = ok && !invalid;
    });
    return ok;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';
    if (!validate()) {
      status.textContent = 'Lütfen gerekli alanları kontrol edin.';
      status.classList.add('error');
      return;
    }

    // Demo: Formspree/endpoint yoksa simüle et
    try {
      // Buraya gerçek endpoint ekleyebilirsiniz:
      // await fetch('FORM_ENDPOINT', { method:'POST', body: new FormData(form) });
      await new Promise(r=>setTimeout(r, 600));
      status.textContent = 'Teşekkürler! Mesajınız alındı. En kısa sürede dönüş yapacağız.';
      status.classList.add('success');
      form.reset();
    } catch {
      status.textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      status.classList.add('error');
    }
  });

  // Floating label için placeholder hilesi
  form.querySelectorAll('input,textarea').forEach(el => el.setAttribute('placeholder',' '));
}

document.addEventListener('DOMContentLoaded', () => {
  try { initRevealOnScroll(); initContactForm(); } catch(e){ console.error(e); }
});

// ...existing code...