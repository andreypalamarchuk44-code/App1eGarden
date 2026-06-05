<template>
  <section class="catalog-section" id="catalog" aria-label="Каталог сортів">
    <div class="container">
      <!-- Header -->
      <div class="catalog-head">
        <div>
          <div class="section-label">
            <i class="ti ti-apple" aria-hidden="true"></i>
            Наші сорти
          </div>
          <h2 class="section-title">Свіжо зібрані сьогодні</h2>
          <p class="cat-sub">Фільтруйте за сезоном, смаком або ціною. Кожен сорт — прямо з нашого саду.</p>
        </div>
        <RouterLink to="/catalog" class="btn-ghost">
          Всі сорти <i class="ti ti-arrow-right" aria-hidden="true"></i>
        </RouterLink>
      </div>

      <!-- Filters -->
      <div class="filters" role="group" aria-label="Фільтри">
        <div class="filter-group">
          <button
            v-for="f in seasonFilters"
            :key="f.value"
            class="filter-chip"
            :class="{ active: activeSeason === f.value }"
            @click="activeSeason = f.value"
            :aria-pressed="activeSeason === f.value"
          >
            <i :class="`ti ti-${f.icon}`" aria-hidden="true"></i>
            {{ f.label }}
          </button>
        </div>

        <div class="filter-group">
          <button
            v-for="f in tasteFilters"
            :key="f.value"
            class="filter-chip"
            :class="{ active: activeTaste === f.value }"
            @click="activeTaste = f.value"
            :aria-pressed="activeTaste === f.value"
          >{{ f.label }}</button>
        </div>

        <select
          v-model="sortBy"
          class="sort-select"
          aria-label="Сортувати"
        >
          <option value="popular">За популярністю</option>
          <option value="price-asc">Ціна ↑</option>
          <option value="price-desc">Ціна ↓</option>
          <option value="rating">За рейтингом</option>
          <option value="new">Новинки</option>
        </select>
      </div>

      <!-- Grid -->
      <Transition name="fade">
        <div v-if="filtered.length" class="catalog-grid">
          <VarietyCard
            v-for="(v, i) in filtered"
            :key="v.id"
            :variety="v"
            :style="{ animationDelay: `${i * 0.06}s` }"
            class="card-fade-in"
          />
        </div>
        <div v-else class="empty-state">
          <span aria-hidden="true">🍂</span>
          <p>Нічого не знайдено. Спробуйте інші фільтри.</p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVarieties } from '@/composables/useVarieties'
import VarietyCard from '@/components/VarietyCard.vue'

const { varieties } = useVarieties()

const activeSeason = ref('all')
const activeTaste  = ref('all')
const sortBy       = ref('popular')

const seasonFilters = [
  { value: 'all',    label: 'Всі',     icon: 'sun' },
  { value: 'summer', label: 'Літні',   icon: 'sun' },
  { value: 'autumn', label: 'Осінні',  icon: 'leaf' },
  { value: 'winter', label: 'Зимові',  icon: 'snowflake' },
]
const tasteFilters = [
  { value: 'all',   label: 'Всі смаки' },
  { value: 'sweet', label: 'Солодкі' },
  { value: 'mixed', label: 'Кисло-солодкі' },
]

const filtered = computed(() => {
  let list = varieties.filter(v => {
    const ms = activeSeason.value === 'all' || v.season === activeSeason.value
    const mt = activeTaste.value  === 'all' || v.taste  === activeTaste.value
    return ms && mt
  })

  if (sortBy.value === 'price-asc')  list = [...list].sort((a,b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list = [...list].sort((a,b) => b.price - a.price)
  if (sortBy.value === 'rating')     list = [...list].sort((a,b) => b.rating - a.rating)
  if (sortBy.value === 'new')        list = [...list].filter(v => v.badgeType === 'new').concat(list.filter(v => v.badgeType !== 'new'))

  return list.slice(0, 8) // show first 8 on home
})
</script>

<style scoped>
.catalog-section {
  padding: 80px 0;
  background: var(--bg-alt);
}

.catalog-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.cat-sub {
  font-size: 15px;
  color: var(--text-soft);
  margin-top: 6px;
  max-width: 480px;
}

/* Filters */
.filters {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 0.5px solid var(--border);
}

.filter-group { display: flex; gap: 6px; }

.filter-chip {
  display: inline-flex; align-items: center; gap: 6px;
  height: 34px; padding: 0 14px;
  border-radius: 30px;
  border: 0.5px solid var(--border-md);
  background: rgba(255,255,255,0.6);
  font-size: 12px; font-weight: 500;
  color: var(--text-soft);
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'DM Sans', sans-serif;
}
.filter-chip i { font-size: 13px; }
.filter-chip:hover { border-color: var(--g200); background: var(--warm50); }
.filter-chip.active {
  background: var(--g50);
  border-color: var(--g200);
  color: var(--g600);
}

.sort-select {
  margin-left: auto;
  height: 34px; padding: 0 12px;
  border-radius: 10px;
  border: 0.5px solid var(--border-md);
  background: rgba(255,255,255,0.6);
  font-size: 12px;
  color: var(--text-soft);
  cursor: pointer;
  outline: none;
}
.sort-select:focus { border-color: var(--g200); }

/* Grid */
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 18px;
}

.card-fade-in {
  animation: fadeUp 0.5s ease both;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}
.empty-state span { font-size: 48px; display: block; margin-bottom: 12px; }
.empty-state p { font-size: 15px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
/* =========================
   TABLET
========================= */
@media (max-width: 992px) {

  .catalog-section {
    padding: 70px 0;
  }

  .catalog-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .btn-ghost {
    margin-top: 10px;
  }

  .catalog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* =========================
   MOBILE
========================= */
@media (max-width: 768px) {

  .catalog-section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 34px;
    line-height: 1.15;
  }

  .cat-sub {
    font-size: 14px;
    max-width: 100%;
  }

  .catalog-head {
    gap: 14px;
    margin-bottom: 24px;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }

  .filter-group {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }

  .filter-group::-webkit-scrollbar {
    display: none;
  }

  .filter-chip {
    flex-shrink: 0;
    height: 38px;
    font-size: 13px;
  }

  .sort-select {
    width: 100%;
    margin-left: 0;
    height: 42px;
    font-size: 14px;
  }

  .catalog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}

/* =========================
   SMALL MOBILE
========================= */
@media (max-width: 576px) {

  .catalog-section {
    padding: 50px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .section-label {
    font-size: 12px;
  }

  .catalog-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .filter-chip {
    padding: 0 12px;
    font-size: 12px;
  }

  .sort-select {
    height: 44px;
  }

  .empty-state {
    padding: 40px 10px;
  }

  .empty-state span {
    font-size: 40px;
  }
}

/* =========================
   VERY SMALL DEVICES
========================= */
@media (max-width: 360px) {

  .section-title {
    font-size: 24px;
  }

  .cat-sub {
    font-size: 13px;
  }

  .filter-chip {
    height: 36px;
    font-size: 11px;
    padding: 0 10px;
  }
}
</style>
