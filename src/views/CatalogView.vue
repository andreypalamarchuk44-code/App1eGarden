<template>
  <main class="catalog-page">
    <div class="cat-hero">
      <div class="container">
        <div class="section-label">
          <i class="ti ti-apple" aria-hidden="true"></i> Магазин
        </div>
        <h1>Всі сорти <em>яблук</em></h1>
        <p>{{ varieties.length }} сортів · свіжо зібрані · доставка по Україні</p>
      </div>
    </div>

    <div class="container cat-body">
      <!-- Filters -->
      <aside class="cat-sidebar">
        <h3>Фільтри</h3>

        <div class="filter-section">
          <h4>Сезон</h4>
          <label v-for="f in seasonOpts" :key="f.value" class="check-label">
            <input type="checkbox" v-model="activeSeasons" :value="f.value" />
            {{ f.label }}
          </label>
        </div>

        <div class="filter-section">
          <h4>Смак</h4>
          <label v-for="f in tasteOpts" :key="f.value" class="check-label">
            <input type="checkbox" v-model="activeTastes" :value="f.value" />
            {{ f.label }}
          </label>
        </div>

        <div class="filter-section">
          <h4>Ціна, грн/кг</h4>
          <div class="price-range">
            <input type="range" v-model="maxPrice" min="20" max="100" step="5" aria-label="Максимальна ціна" />
            <span>до {{ maxPrice }} грн</span>
          </div>
        </div>

        <button class="btn-ghost" @click="resetFilters">
          <i class="ti ti-refresh" aria-hidden="true"></i> Скинути
        </button>
      </aside>

      <!-- Grid -->
      <div class="cat-main">
        <div class="cat-toolbar">
          <p class="count-label">{{ filtered.length }} сортів</p>
          <select v-model="sortBy" class="sort-select" aria-label="Сортувати">
            <option value="popular">За популярністю</option>
            <option value="price-asc">Ціна ↑</option>
            <option value="price-desc">Ціна ↓</option>
            <option value="rating">За рейтингом</option>
          </select>
        </div>

        <div v-if="filtered.length" class="full-grid">
          <VarietyCard v-for="v in filtered" :key="v.id" :variety="v" />
        </div>
        <div v-else class="empty-state">
          <span>🍂</span>
          <p>Нічого не знайдено</p>
          <button class="btn-ghost" @click="resetFilters">Скинути фільтри</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVarieties } from '@/composables/useVarieties'
import VarietyCard from '@/components/VarietyCard.vue'

const { varieties } = useVarieties()

const activeSeasons = ref([])
const activeTastes  = ref([])
const maxPrice = ref(100)
const sortBy   = ref('popular')

const seasonOpts = [
  { value: 'summer', label: 'Літні' },
  { value: 'autumn', label: 'Осінні' },
  { value: 'winter', label: 'Зимові' },
]
const tasteOpts = [
  { value: 'sweet', label: 'Солодкі' },
  { value: 'mixed', label: 'Кисло-солодкі' },
]

const filtered = computed(() => {
  let list = varieties.filter(v => {
    const ms = !activeSeasons.value.length || activeSeasons.value.includes(v.season)
    const mt = !activeTastes.value.length  || activeTastes.value.includes(v.taste)
    const mp = v.price <= maxPrice.value
    return ms && mt && mp
  })
  if (sortBy.value === 'price-asc')  list = [...list].sort((a,b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list = [...list].sort((a,b) => b.price - a.price)
  if (sortBy.value === 'rating')     list = [...list].sort((a,b) => b.rating - a.rating)
  return list
})

function resetFilters() {
  activeSeasons.value = []
  activeTastes.value  = []
  maxPrice.value = 100
}
</script>

<style scoped>
.catalog-page { min-height: 80vh; }

.cat-hero {
  background: linear-gradient(160deg, var(--g50) 0%, var(--bg-alt) 100%);
  border-bottom: 0.5px solid var(--border);
  padding: 60px 0 40px;
}
.cat-hero h1 { font-size: 42px; font-weight: 200; margin: 8px 0 6px; }
.cat-hero h1 em { font-style: italic; color: var(--g400); }
.cat-hero p { font-size: 14px; color: var(--text-muted); }

.cat-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 40px;
  padding-top: 40px;
  padding-bottom: 60px;
}

.cat-sidebar h3 {
  font-size: 16px; font-weight: 300;
  margin-bottom: 24px;
  color: var(--warm900);
}

.filter-section {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 0.5px solid var(--border);
}
.filter-section h4 {
  font-size: 12px; font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 12px;
  font-family: 'DM Sans', sans-serif;
}

.check-label {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--warm700);
  margin-bottom: 8px; cursor: pointer;
}
.check-label input { accent-color: var(--g400); }

.price-range { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--warm700); }
.price-range input { width: 100%; accent-color: var(--g400); }

.cat-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px;
}
.count-label { font-size: 13px; color: var(--text-muted); }
.sort-select {
  height: 34px; padding: 0 12px;
  border-radius: 10px; border: 0.5px solid var(--border-md);
  background: var(--bg-alt); font-size: 12px; color: var(--text-soft);
  outline: none; cursor: pointer;
}

.full-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.empty-state {
  text-align: center; padding: 60px 20px;
  color: var(--text-muted);
}
.empty-state span { font-size: 48px; display: block; margin-bottom: 12px; }

@media (max-width: 768px) {
  .cat-body { grid-template-columns: 1fr; }
  .cat-sidebar { display: flex; flex-wrap: wrap; gap: 16px; }
  .filter-section { margin: 0; padding: 0; border: none; min-width: 140px; }
}
</style>
