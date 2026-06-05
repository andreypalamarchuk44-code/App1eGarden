<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="logo-row">
          <span class="footer-logo-mark" aria-hidden="true">
            <i class="ti ti-leaf"></i>
          </span>
          <span class="footer-logo-name">Apple Garden</span>
        </div>
        <p class="footer-tagline">Свіжі яблука прямо з саду.<br>Вінницька область.</p>
        <div class="footer-socials">
          <a href="#" aria-label="Instagram" class="social-btn"><i class="ti ti-brand-instagram" aria-hidden="true"></i></a>
          <a href="#" aria-label="Facebook"  class="social-btn"><i class="ti ti-brand-facebook" aria-hidden="true"></i></a>
          <a href="#" aria-label="Telegram"  class="social-btn"><i class="ti ti-brand-telegram" aria-hidden="true"></i></a>
        </div>
      </div>

      <!-- Links -->
      <div class="footer-nav">
        <div class="footer-col">
          <h4>Каталог</h4>
          <ul>
            <li><RouterLink to="/catalog">Всі сорти</RouterLink></li>
            <li><RouterLink to="/catalog?season=summer">Літні</RouterLink></li>
            <li><RouterLink to="/catalog?season=autumn">Осінні</RouterLink></li>
            <li><RouterLink to="/catalog?season=winter">Зимові</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Інформація</h4>
          <ul>
            <li><RouterLink to="/about">Про нас</RouterLink></li>
            <li><a href="/#calendar">Сезони</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Оплата</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Контакти</h4>
          <ul>
            <li><a href="tel:+380000000000"><i class="ti ti-phone" aria-hidden="true"></i> +38 (000) 000-00-00</a></li>
            <li><a href="mailto:hello@applegarden.ua"><i class="ti ti-mail" aria-hidden="true"></i> hello@applegarden.ua</a></li>
            <li><span><i class="ti ti-map-pin" aria-hidden="true"></i> Вінницька область</span></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom container">
      <p>© {{ year }} Apple Garden. Усі права захищені.</p>
      <div class="footer-links">
        <a href="#">Конфіденційність</a>
        <a href="#">Умови використання</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  background: var(--warm900);
  color: rgba(255,255,255,0.65);
  margin-top: auto;
}

.footer-inner {
  display: flex;
  gap: 60px;
  padding-top: 56px;
  padding-bottom: 40px;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Brand */
.footer-brand { min-width: 200px; }
.logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.footer-logo-mark {
  width: 32px; height: 32px;
  background: rgba(168,210,80,0.2);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  color: var(--g100);
  font-size: 16px;
}
.footer-logo-name {
  font-family: 'Fraunces', serif;
  font-size: 18px; font-weight: 300;
  color: rgba(255,255,255,0.92);
}
.footer-tagline { font-size: 13px; line-height: 1.6; margin-bottom: 20px; }

.footer-socials { display: flex; gap: 8px; flex-wrap: wrap; }
.social-btn {
  width: 34px; height: 34px;
  border-radius: 9px;
  background: rgba(255,255,255,0.08);
  border: 0.5px solid rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.55);
  font-size: 15px;
  transition: all 0.15s;
}
.social-btn:hover { background: rgba(168,210,80,0.2); color: var(--g100); }

/* Nav */
.footer-nav {
  flex: 2;
  display: flex; gap: 40px;
  flex-wrap: wrap;
}
.footer-col h4 {
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 16px;
  font-family: 'DM Sans', sans-serif;
}
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.footer-col a,
.footer-col span {
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  display: flex; align-items: center; gap: 6px;
  transition: color 0.15s;
}
.footer-col a:hover { color: var(--g100); }
.footer-col i { font-size: 13px; opacity: 0.7; }

/* Bottom */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 24px;
  border-top: 0.5px solid rgba(255,255,255,0.08);
  font-size: 12px;
  flex-wrap: wrap; gap: 10px;
}
.footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
.footer-links a { color: rgba(255,255,255,0.4); transition: color 0.15s; }
.footer-links a:hover { color: rgba(255,255,255,0.7); }

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .footer-inner { gap: 40px; padding-top: 40px; padding-bottom: 32px; }
  .footer-nav { gap: 30px; }
}

@media (max-width: 768px) {
  .footer-inner { flex-direction: column; align-items: flex-start; gap: 24px; padding-top: 32px; padding-bottom: 24px; }
  .footer-nav { flex-direction: column; gap: 20px; }
  .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
  .footer-socials { justify-content: flex-start; }
}

@media (max-width: 480px) {
  .footer-inner { padding-top: 24px; padding-bottom: 16px; }
  .footer-col h4 { font-size: 11px; }
  .footer-col a, .footer-col span { font-size: 12px; }
  .footer-logo-name { font-size: 16px; }
  .footer-tagline { font-size: 12px; }
  .social-btn { width: 28px; height: 28px; font-size: 13px; }
}
</style>