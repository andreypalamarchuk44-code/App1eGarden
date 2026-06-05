<template>
  <section class="garden-story" aria-label="Про наш сад">
    <div class="container story-inner">
      <!-- Visual side -->
      <div class="story-visual" aria-hidden="true">
        <div class="story-card main-card">
          <div class="story-image">
            <img src="../assets/styles/images/garden.jpg" alt="Яблуневий сад">
          </div>
        </div>

        <div class="story-mini-1 mini-glass">
          <i class="ti ti-sun"></i>
          <div>
            <strong>Сонячне місце</strong>
            <span>300+ сонячних днів</span>
          </div>
        </div>
        <div class="story-mini-2 mini-glass">
          <i class="ti ti-droplet"></i>
          <div>
            <strong>Живе зрошення</strong>
            <span>Артезіанська вода</span>
          </div>
        </div>
      </div>

      <!-- Text side -->
      <div class="story-text">
        <div class="section-label">
          <i class="ti ti-home" aria-hidden="true"></i>
          Наша історія
        </div>
        <h2 class="section-title">
          Сад, що почався<br>
          з <em>однієї яблуни</em>
        </h2>
        <p>
          У 2021 році ми посадили перші 50 дерев на нашій ділянці у Вінницькій області.
          Сьогодні — це 5 гектарів та більше ніж 800 плодових дерев різних сортів.
        </p>
        <p>
          Ми не використовуємо гербіциди. Мінімальна кількість обробок, тільки при потребі.
          Яблука збираємо вручну й відправляємо протягом 24 годин.
        </p>

        <ul class="story-points">
          <li v-for="p in points" :key="p.text">
            <span class="point-icon"><i :class="`ti ti-${p.icon}`" aria-hidden="true"></i></span>
            <span>{{ p.text }}</span>
          </li>
        </ul>

        <RouterLink to="/about" class="btn btn-outline">
          <i class="ti ti-photo" aria-hidden="true"></i>
          Побачити наш сад
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const points = [
  { icon: 'hand-stop', text: 'Збираємо вручну, без машин' },
  { icon: 'package',   text: 'Пакуємо в еко-ящики з паперу' },
  { icon: 'clock',     text: 'Відправляємо до 24 годин після замовлення' },
  { icon: 'certificate', text: 'Власний сад — жодних посередників' },
]
</script>

<style scoped>
.garden-story {
  padding: 80px 0;
  background: var(--bg-alt);
  border-top: 0.5px solid var(--border);
}

.story-inner {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 64px;
  align-items: center;
}

/* Visual */
.story-visual { position: relative; padding: 20px; }

.story-card {
  border-radius: 24px;
  background: linear-gradient(145deg, #D6EBA8, #B8DC6A);
  padding: 32px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}
.story-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.25) 0%, transparent 60%);
}

.story-mini-1 { bottom: 10px; left: -10px; animation: float 5s ease-in-out 0.3s infinite; }
.story-mini-2 { top: 10px; right: -10px; animation: float 6s ease-in-out 1s infinite; }
.mini-glass {
  position: absolute;
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,253,248,0.88);
  backdrop-filter: blur(12px);
  border: 0.5px solid rgba(255,255,255,0.9);
  border-radius: 14px;
  padding: 10px 16px;
  box-shadow: var(--shadow-sm);
  font-size: 12px;
}
.mini-glass i { font-size: 20px; color: var(--a300); }
.mini-glass strong { display: block; font-size: 12px; font-weight: 500; color: var(--warm800); }
.mini-glass span { font-size: 11px; color: var(--text-muted); }

/* Text */
.story-text p { font-size: 15px; color: var(--text-soft); line-height: 1.72; margin-bottom: 14px; }

.story-points {
  list-style: none;
  margin: 24px 0 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.story-points li {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 14px;
  color: var(--warm700);
}
.point-icon {
  width: 28px; height: 28px;
  background: var(--g50);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: var(--g500);
  font-size: 14px;
  flex-shrink: 0;
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .story-inner { grid-template-columns: 1fr; gap: 48px; }
  .story-visual { order: 2; }
  .story-mini-1, .story-mini-2 { position: relative; bottom: auto; top: auto; left: auto; right: auto; margin-top: 20px; }
}

@media (max-width: 768px) {
  .story-inner { gap: 32px; }
  .story-text p { font-size: 14px; line-height: 1.6; }
  .mini-glass { padding: 8px 12px; font-size: 11px; }
}

@media (max-width: 480px) {
  .story-text p { font-size: 13px; }
  .story-points li { font-size: 13px; gap: 8px; }
  .point-icon { width: 24px; height: 24px; font-size: 12px; }
}
</style>