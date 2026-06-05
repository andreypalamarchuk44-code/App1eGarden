<template>
  <section class="hero" aria-label="Головна секція">

    <!-- Organic background decorations -->
    <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
    <div class="hero-orb hero-orb-2" aria-hidden="true"></div>
    <div class="hero-orb hero-orb-3" aria-hidden="true"></div>

    <!-- Floating leaves -->
    <div class="leaf leaf-1" aria-hidden="true">🌿</div>
    <div class="leaf leaf-2" aria-hidden="true">🍃</div>
    <div class="leaf leaf-3" aria-hidden="true">🌿</div>

    <!-- Content -->
    <div class="hero-content container">
      <div class="hero-left">
        <div class="hero-label fade-up">
          <i class="ti ti-map-pin" aria-hidden="true"></i>
          Вінницька область · власний сад · 5 гектарів
        </div>

        <h1 class="hero-title fade-up fade-up-1">
          Справжні яблука<br>
          без гербіцидів та посередників, <em>зібрані вручну й доставлені </em><br>
        до вас свіжими.
        </h1>

        <p class="hero-desc fade-up fade-up-2">
          Збираємо, пакуємо та відправляємо свіжі яблука без посередників.
          12+ сортів від ніжних літніх до міцних зимових.
        </p>

        <div class="hero-ctas fade-up fade-up-3">
          <RouterLink to="/catalog" class="btn btn-primary">
            <i class="ti ti-apple" aria-hidden="true"></i>
            Переглянути каталог
          </RouterLink>
          <RouterLink to="/about" class="btn btn-outline">
            Про наш сад →
          </RouterLink>
        </div>

        <!-- Stats -->
        <div class="hero-stats fade-up fade-up-4">
          <div class="stat">
            <span class="stat-n">12+</span>
            <span class="stat-l">сортів яблук</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat">
            <span class="stat-n">5 га</span>
            <span class="stat-l">власний сад</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat">
            <span class="stat-n">4 роки</span>
            <span class="stat-l">онлайн продажі</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat">
            <span class="stat-n">500+</span>
            <span class="stat-l">задоволених клієнтів</span>
          </div>
        </div>
      </div>

      <!-- Right: feature card + floaters -->
      <div class="hero-right" aria-hidden="true">
        <div class="feature-card">
  <div class="feature-image">
    <img src="../assets/styles/images/apple1.jpg" alt="Голден Делішес">
  </div>

          <div class="feature-info">
            <div class="feature-tag">Сезон зараз</div>
            <h3 class="feature-name">Голден делішес</h3>
            <p class="feature-origin"><i class="ti ti-map-pin"></i> Вінниця · осінній</p>
            <div class="feature-chips">
              <span class="tag tag-green">Солодкий</span>
              <span class="tag tag-green">Хрусткий</span>
              <span class="tag tag-green">Лежкий</span>
            </div>
            <div class="feature-bottom">
              <div class="feature-price">
                45 <small>грн/кг</small>
              </div>
              <button class="btn-add-hero" @click="cartStore.add({ id: 1, name: 'Голден делішес', price: 45 })">
                <i class="ti ti-shopping-bag"></i>
                В кошик
              </button>
            </div>
          </div>
        </div>

        <!-- Floating mini cards -->
      <div class="float-card float-card-1">
  <img
    src="../assets/styles/images/apple8.png"
    alt="Антонівка"
    class="fc-image"
  >

  <div>
    <div class="fc-name">Антонівка</div>
    <div class="fc-price">32 грн/кг</div>
  </div>
</div>

        <div class="float-card float-card-2">
          <span class="fc-emoji">⭐</span>
          <div>
            <div class="fc-name">4.9 рейтинг</div>
            <div class="fc-price">38 відгуків</div>
          </div>
        </div>

        <div class="float-card float-card-3">
          <span class="fc-emoji">🚚</span>
          <div>
            <div class="fc-name">Нова Пошта</div>
            <div class="fc-price">1–2 дні</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave divider -->
    <div class="hero-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z" fill="#FFFDF8"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 90vh;
  padding: 80px 0 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse 80% 60% at 70% 20%, rgba(168,210,80,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 10% 80%, rgba(250,195,100,0.12) 0%, transparent 50%),
    radial-gradient(ellipse 60% 60% at 90% 90%, rgba(144,200,60,0.10) 0%, transparent 50%),
    var(--bg);
}

/* Orbs */
.hero-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.hero-orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(168,210,80,0.22) 0%, transparent 70%);
  top: -200px; right: -100px;
}
.hero-orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(250,195,100,0.16) 0%, transparent 70%);
  bottom: -100px; left: -80px;
}
.hero-orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(120,190,50,0.12) 0%, transparent 70%);
  top: 40%; left: 30%;
}

/* Floating leaves */
.leaf {
  position: absolute;
  font-size: 36px;
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}
.leaf-1 { top: 12%; left: 6%; animation: leafSway 5s ease-in-out infinite; transform-origin: bottom; }
.leaf-2 { top: 25%; right: 8%; font-size: 28px; animation: leafSway 6.5s ease-in-out infinite reverse; transform-origin: bottom; }
.leaf-3 { bottom: 20%; left: 45%; font-size: 24px; animation: leafSway 7s ease-in-out infinite; transform-origin: bottom; }

/* Content */
.hero-content {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
  padding-bottom: 80px;
}

/* Left */
.hero-left { max-width: 560px; }

.hero-label {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 12px; font-weight: 500; letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--g500);
  background: rgba(232,244,210,0.8);
  border: 0.5px solid rgba(94,153,24,0.25);
  border-radius: 30px;
  padding: 5px 14px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 200;
  color: var(--warm900);
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}
.hero-title em {
  font-style: italic;
  font-weight: 300;
  color: var(--g400);
}

.hero-desc {
  font-size: 17px;
  color: var(--text-soft);
  line-height: 1.7;
  max-width: 460px;
  margin-bottom: 32px;
}

.hero-ctas {
  display: flex; gap: 14px; flex-wrap: wrap; align-items: center;
  margin-bottom: 44px;
}

/* Stats */
.hero-stats {
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
}
.stat { display: flex; flex-direction: column; gap: 2px; }
.stat-n {
  font-family: 'Fraunces', serif;
  font-size: 24px; font-weight: 300;
  color: var(--warm900); line-height: 1;
}
.stat-l { font-size: 11px; color: var(--text-muted); }
.stat-sep {
  width: 1px; height: 36px;
  background: var(--warm200);
}

/* Right */
.hero-right {
  position: relative;
  display: flex; justify-content: center; align-items: center;
  padding: 30px 20px 30px 0;
}

/* Feature card */
.feature-image {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,.15));
  transition: transform .3s ease;
}

.feature-card:hover .feature-image img {
  transform: scale(1.05);
}
.feature-card {
  background: rgba(255, 253, 248, 0.85);
  backdrop-filter: blur(16px);
  border: 0.5px solid rgba(255, 255, 255, 0.9);
  border-radius: 28px;
  padding: 24px;
  width: 280px;
  box-shadow:
    0 20px 60px rgba(30,25,10,0.1),
    0 4px 12px rgba(30,25,10,0.06),
    inset 0 1px rgba(255,255,255,0.8);
  animation: float 6s ease-in-out infinite;
}

.apple-stage {
  position: relative;
  height: 140px;
  background: linear-gradient(160deg, var(--g50) 0%, rgba(232,244,185,0.5) 100%);
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
  overflow: hidden;
}
.apple-glow {
  position: absolute;
  width: 100px; height: 100px;
  background: radial-gradient(circle, rgba(168,210,80,0.4) 0%, transparent 70%);
  border-radius: 50%;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.apple-big {
  font-size: 80px;
  line-height: 1;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 8px 16px rgba(30,25,10,0.15));
}
.apple-leaf-dec {
  position: absolute;
  top: 12px; right: 16px;
  font-size: 24px;
  opacity: 0.7;
  animation: leafSway 4s ease-in-out infinite;
}

.feature-info {
  flex: 1;
}
.feature-tag {
  font-size: 11px; font-weight: 500;
  color: var(--g500);
  background: var(--g50);
  border-radius: 20px;
  padding: 3px 10px;
  display: inline-block;
  margin-bottom: 8px;
}
.feature-name {
  font-size: 20px;
  font-weight: 300;
  color: var(--warm900);
  margin-bottom: 4px;
}
.feature-origin {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
}
.feature-origin i { font-size: 12px; }
.feature-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }

.feature-bottom {
  display: flex; 
  align-items: center;
   justify-content: space-between;
  padding-top: 12px;
  border-top: 0.5px solid var(--border);
}
.feature-price {
  font-family: 'Fraunces', serif;
  font-size: 22px; 
  font-weight: 300;
  color: var(--warm900);
}
.feature-price small { 
  font-size: 13px; 
  color: var(--text-muted);
   font-family: 'DM Sans', sans-serif; 
  }
.btn-add-hero {
  display: flex; 
  align-items: center;
   gap: 7px;
  height: 38px;
   padding: 0 16px;
  background: linear-gradient(140deg, var(--g300), var(--g500));
  border: none; 
  border-radius: 12px;
  color: #fff; 
  font-size: 13px;
   font-weight: 500;
  cursor: pointer; 
  transition: all 0.15s;
  font-family: 'DM Sans', sans-serif;
}
.btn-add-hero:hover { transform: scale(1.04); }

/* Float cards */
.float-card {
  position: absolute;
  display: flex; 
  align-items: center;
   gap: 10px;
  background: rgba(255,253,248,0.9);
  backdrop-filter: blur(12px);
  border: 0.5px solid rgba(255,255,255,0.9);
  border-radius: 14px;
  padding: 10px 16px;
  box-shadow: 0 8px 24px rgba(30,25,10,0.1);
  white-space: nowrap;
}
.fc-emoji { font-size: 22px; line-height: 1; }
.fc-name { font-size: 12px; font-weight: 500; color: var(--warm700); }
.fc-price { font-size: 11px; color: var(--text-muted); margin-top: 1px; }
.fc-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
  transition: transform .3s ease;
}

.float-card:hover .fc-image {
  transform: scale(1.15) rotate(-8deg);
}
.float-card-1 {
  top: 10px;
  left: -40px;
  animation: float 5s ease-in-out 0.5s infinite;
}

.float-card-1 img {
  width: 30px;
  height: 22px;
}
.float-card-2 {
  top: 50%; right: -30px;
  transform: translateY(-50%);
  animation: float 6.5s ease-in-out 1s infinite;
}
.float-card-3 {
  bottom: 20px; left: -20px;
  animation: float 7s ease-in-out 0.3s infinite;
}

/* Wave */
.hero-wave {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  line-height: 0;
}
.hero-wave svg {
  display: block;
  width: 100%; height: 80px;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    gap: 32px;
  }

  .hero-title {
    font-size: 52px;
  }

  .hero-stats {
    gap: 12px;
  }
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
    padding-top: 40px;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero-left {
    max-width: 100%;
  }

  .hero-desc {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-ctas {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .hero-right {
    display: none;
  }
  @media (max-width: 768px) {
  .hero {
    padding-top: 30px;
  }

  .hero-title {
    font-size: 42px;
    line-height: 1.1;
  }

  .hero-desc {
    font-size: 15px;
  }

  .hero-label {
    font-size: 11px;
  }

  .hero-stats {
    gap: 10px;
  }

  .stat-n {
    font-size: 20px;
  }

  .stat-sep {
    display: none;
  }
}
@media (max-width: 480px) {
  .hero {
    padding-top: 20px;
  }

  .hero-title {
    font-size: 34px;
  }

  .hero-desc {
    font-size: 14px;
    line-height: 1.6;
  }

  .hero-ctas {
    flex-direction: column;
    width: 100%;
  }

  .hero-ctas .btn {
    width: 100%;
    justify-content: center;
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stat {
    text-align: center;
  }

  .leaf {
    display: none;
  }

  .hero-orb-1,
  .hero-orb-2,
  .hero-orb-3 {
    opacity: 0.4;
  }
}
}
</style>
