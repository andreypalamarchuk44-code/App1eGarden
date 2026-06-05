<template>
  <div>
    <section v-if="variety" class="variety-page">
      <!-- Back -->
      <div class="container">
        <RouterLink to="/catalog" class="back-link">
          <i class="ti ti-arrow-left"></i> Назад до каталогу
        </RouterLink>
      </div>

      <div class="container variety-inner">
        <!-- Image -->
        <div class="variety-img-wrap" :class="`bg-${variety.color}`">
          <span v-if="variety.badge" class="vbadge" :class="`badge-${variety.badgeType}`">{{ variety.badge }}</span>
          <img :src="variety.image" :alt="variety.name" class="variety-big-img" />
        </div>

        <!-- Info -->
        <div class="variety-info">
          <div class="section-label">
            <i class="ti ti-map-pin"></i>
            {{ variety.origin }} · {{ variety.seasonLabel }}
          </div>

          <h1 class="variety-title">{{ variety.name }}</h1>
          <p class="variety-desc">{{ variety.desc }}</p>

          <div class="variety-tags">
            <span v-for="tag in variety.tags" :key="tag" class="tag tag-green">{{ tag }}</span>
          </div>

          <div class="variety-meta">
            <div class="meta-row">
              <span class="meta-label">Рейтинг</span>
              <span class="meta-val">⭐ {{ variety.rating }} <small>({{ variety.reviews }} відгуків)</small></span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Сезон</span>
              <span class="meta-val">{{ variety.seasonLabel }}</span>
            </div>
          </div>

          <div class="buy-block">
            <div class="price-big">{{ variety.price }} <small>грн / кг</small></div>
            <div class="qty-row">
              <button class="qty-btn" @click="qty > 1 ? qty-- : null">−</button>
              <span class="qty-val">{{ qty }} кг</span>
              <button class="qty-btn" @click="qty++">+</button>
            </div>
            <button class="btn btn-primary add-main-btn" :class="{ added }" @click="handleAdd">
              <i :class="added ? 'ti ti-check' : 'ti ti-shopping-bag'"></i>
              {{ added ? 'Додано!' : 'Додати до кошика' }}
            </button>
          </div>

          <div class="delivery-info">
            <span><i class="ti ti-truck"></i> Нова Пошта · 1–2 дні</span>
            <span><i class="ti ti-shield-check"></i> Свіже з саду</span>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="not-found container">
      <h1>Сорт не знайдено</h1>
      <RouterLink to="/catalog" class="btn btn-primary">До каталогу</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useVarieties } from '@/composables/useVarieties'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const { getBySlug } = useVarieties()
const cartStore = useCartStore()

const variety = computed(() => getBySlug(route.params.slug))
const qty = ref(1)
const added = ref(false)

function handleAdd() {
  cartStore.add({
    id: variety.value.id,
    name: variety.value.name,
    price: variety.value.price,
    image: variety.value.image,
    qty: qty.value
  })
  added.value = true
  setTimeout(() => { added.value = false }, 1500)
}
</script>

<style scoped>
.variety-page { padding-bottom: 80px; min-height: 80vh; }

.back-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--text-muted);
  padding: 28px 0 20px;
  transition: color 0.15s;
}
.back-link:hover { color: var(--g500); }

.variety-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

/* Image */
.variety-img-wrap {
  position: relative;
  border-radius: 28px;
  display: flex; align-items: center; justify-content: center;
  min-height: 420px;
  overflow: hidden;
}
.bg-green  { background: linear-gradient(145deg, #EBF4DC, #D0E8A0); }
.bg-red    { background: linear-gradient(145deg, #FAEAE6, #F5C4B8); }
.bg-yellow { background: linear-gradient(145deg, #FEF3E2, #FDE8B0); }
.bg-gold   { background: linear-gradient(145deg, #FEF0D0, #FAD988); }
.bg-pale   { background: linear-gradient(145deg, #F5F2EA, #EDE3CA); }

.variety-big-img {
  width: 85%;
  height: 360px;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.18));
  transition: transform 0.4s ease;
}
.variety-img-wrap:hover .variety-big-img { transform: scale(1.04); }

.vbadge {
  position: absolute; top: 16px; left: 16px;
  font-size: 11px; font-weight: 500;
  padding: 5px 12px; border-radius: 20px; z-index: 2;
}
.badge-popular { background: var(--g50); color: var(--g600); border: 0.5px solid rgba(94,153,24,0.3); }
.badge-hit     { background: #EEEDFE; color: #4B42B5; border: 0.5px solid rgba(75,66,181,0.25); }
.badge-new     { background: var(--a50); color: var(--a400); border: 0.5px solid rgba(186,117,23,0.25); }

/* Info */
.variety-title {
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 200; color: var(--warm900);
  margin: 10px 0 14px;
}
.variety-desc {
  font-size: 15px; color: var(--text-soft); line-height: 1.75;
  margin-bottom: 20px;
}
.variety-tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 24px; }

.variety-meta {
  background: var(--bg-alt);
  border: 0.5px solid var(--border);
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 28px;
  display: flex; flex-direction: column; gap: 10px;
}
.meta-row { display: flex; align-items: center; gap: 12px; font-size: 14px; }
.meta-label { color: var(--text-muted); min-width: 80px; }
.meta-val { color: var(--warm900); font-weight: 400; }
.meta-val small { font-size: 12px; color: var(--text-muted); }

/* Buy */
.buy-block { display: flex; flex-direction: column; gap: 14px; margin-bottom: 18px; }
.price-big {
  font-family: 'Fraunces', serif;
  font-size: 38px; font-weight: 200; color: var(--warm900);
}
.price-big small { font-size: 16px; color: var(--text-muted); }

.qty-row { display: flex; align-items: center; gap: 12px; }
.qty-btn {
  width: 36px; height: 36px; border-radius: 10px;
  border: 0.5px solid var(--border-md);
  background: var(--bg-alt);
  font-size: 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--warm700); transition: all 0.15s;
}
.qty-btn:hover { border-color: var(--g300); color: var(--g500); }
.qty-val { font-size: 16px; font-weight: 500; color: var(--warm900); min-width: 40px; text-align: center; }

.add-main-btn { width: 100%; justify-content: center; font-size: 15px; height: 52px; }
.add-main-btn.added { background: linear-gradient(140deg, var(--g300), var(--g400)); }

.delivery-info {
  display: flex; gap: 20px; flex-wrap: wrap;
  font-size: 12px; color: var(--text-muted);
}
.delivery-info span { display: flex; align-items: center; gap: 5px; }
.delivery-info i { font-size: 13px; color: var(--g400); }

.not-found { padding: 80px 0; text-align: center; }

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .variety-inner { grid-template-columns: 1fr; gap: 40px; }
  .variety-img-wrap { min-height: 320px; }
  .variety-big-img { height: 300px; }
}
@media (max-width: 768px) {
  .variety-inner { gap: 32px; }
  .variety-big-img { height: 240px; width: 100%; }
  .buy-block { gap: 12px; }
  .price-big { font-size: 32px; }
}
@media (max-width: 480px) {
  .variety-big-img { height: 200px; }
  .qty-btn { width: 32px; height: 32px; font-size: 16px; }
  .price-big { font-size: 28px; }
  .variety-title { font-size: clamp(22px, 5vw, 32px); }
  .variety-desc { font-size: 14px; }
}
</style>