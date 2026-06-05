<template>
  <section class="trust-bar" aria-label="Наші переваги">
    <div class="container trust-inner">
      <div v-for="item in items" :key="item.icon" class="trust-item">
        <div class="trust-icon">
          <i :class="`ti ti-${item.icon}`" aria-hidden="true"></i>
        </div>
        <div class="trust-text">
          <strong>{{ item.title }}</strong>
          <span>{{ item.sub }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const items = [
  { icon: 'truck-delivery', title: 'Доставка по Україні', sub: 'Нова Пошта, Укрпошта' },
  { icon: 'leaf',           title: 'Без хімії',          sub: 'Мінімум обробок, ЕКО' },
  { icon: 'shield-check',   title: 'Гарантія якості',    sub: 'Повернення у 24 год' },
  { icon: 'message-circle', title: 'Жива підтримка',     sub: 'Відповідаємо швидко' },
]
</script>

<style scoped>
.trust-bar {
  background: var(--bg-alt);
  border-top: 0.5px solid var(--border);
  border-bottom: 0.5px solid var(--border);
}
.trust-inner {
  display: flex;
}
.trust-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  border-right: 0.5px solid var(--border);
  transition: background 0.15s;
}
.trust-item:last-child { border-right: none; }
.trust-item:hover { background: var(--warm50); }

.trust-icon {
  width: 40px; height: 40px;
  border-radius: 12px;
  background: var(--g50);
  border: 0.5px solid rgba(94,153,24,0.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--g500);
  font-size: 19px;
  flex-shrink: 0;
}
.trust-text strong {
  display: block;
  font-size: 13px; font-weight: 500;
  color: var(--warm900);
  margin-bottom: 2px;
}
.trust-text span {
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .trust-inner { flex-wrap: wrap; }
  .trust-item { min-width: 50%; border-bottom: 0.5px solid var(--border); }
}
</style>
