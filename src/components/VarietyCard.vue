<template>
  <article
    class="variety-card"
    :class="`bg-${variety.color}`"
    @click="router.push(`/variety/${variety.slug}`)"
    role="button"
    tabindex="0"
    :aria-label="`${variety.name} — ${variety.price} грн за кг`"
    @keydown.enter="$router.push(`/variety/${variety.slug}`)"
  >
    <!-- Image zone -->
   <div class="card-img-zone">
  <span
    v-if="variety.badge"
    class="card-badge"
    :class="`badge-${variety.badgeType}`"
  >
    {{ variety.badge }}
  </span>

  <img
    v-if="variety.image"
    :src="variety.image"
    :alt="variety.name"
    class="apple-image"
  />

  <span class="card-leaf" aria-hidden="true">🍃</span>
</div>

  

    <!-- Body -->
    <div class="card-body">
      <div class="card-head">
        <h3 class="card-name">{{ variety.name }}</h3>
        <p class="card-origin">
          <i class="ti ti-map-pin" aria-hidden="true"></i>
          {{ variety.origin }} · {{ variety.seasonLabel }}
        </p>
      </div>

      <div class="card-tags">
        <span v-for="t in variety.tags.slice(0,3)" :key="t" class="tag">{{ t }}</span>
      </div>

      <div class="card-footer">
        <div class="card-price-block">
          <span class="card-price">{{ variety.price }} грн</span>
          <span class="card-unit"> / кг</span>
          <div class="card-stars">
            <span class="stars-visual">{{ starsFor(variety.rating) }}</span>
            <span class="stars-count">({{ variety.reviews }})</span>
          </div>
        </div>

        <button
          class="add-btn"
          :class="{ added }"
          @click.stop="handleAdd"
          :aria-label="`Додати ${variety.name} до кошика`"
        >
          <i :class="added ? 'ti ti-check' : 'ti ti-plus'" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  variety: { type: Object, required: true }
})

const cartStore = useCartStore()
const added = ref(false)

function handleAdd() {
  cartStore.add(props.variety)

  added.value = true
  setTimeout(() => {
    added.value = false
  }, 1400)
}

function starsFor(r) {
  const full = Math.floor(r)
  const half = r - full >= 0.5 ? 1 : 0
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half)
}
</script>

<style scoped>
.variety-card {
  background: var(--bg-alt);
  border: 0.5px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.22s, transform 0.22s;
}
.variety-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
.variety-card:focus-visible {
  outline: 2px solid var(--g300);
  outline-offset: 2px;
}

/* Image zone */
.card-img-zone {
  height: 170px;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.bg-green  .card-img-zone { background: linear-gradient(145deg, #EBF4DC, #D0E8A0); }
.bg-red    .card-img-zone { background: linear-gradient(145deg, #FAEAE6, #F5C4B8); }
.bg-yellow .card-img-zone { background: linear-gradient(145deg, #FEF3E2, #FDE8B0); }
.bg-gold   .card-img-zone { background: linear-gradient(145deg, #FEF0D0, #FAD988); }
.bg-pale   .card-img-zone { background: linear-gradient(145deg, #F5F2EA, #EDE3CA); }

.variety-emoji {
  font-size: 72px;
  line-height: 1;
  filter: drop-shadow(0 6px 12px rgba(30,25,10,0.12));
  transition: transform 0.3s;
  position: relative; z-index: 1;
}
.variety-card:hover .variety-emoji { transform: scale(1.08) rotate(-3deg); }

.card-leaf {
  position: absolute;
  top: 12px; right: 14px;
  font-size: 20px;
  opacity: 0.55;
  transition: transform 0.4s;
}
.variety-card:hover .card-leaf { transform: rotate(15deg) scale(1.15); }

/* Badge */
.card-badge {
  position: absolute;
  top: 10px; left: 12px;
  font-size: 10px; font-weight: 500;
  padding: 4px 10px; border-radius: 20px;
  z-index: 2;
}
.badge-popular { background: var(--g50); color: var(--g600); border: 0.5px solid rgba(94,153,24,0.3); }
.badge-hit     { background: #EEEDFE; color: #4B42B5; border: 0.5px solid rgba(75,66,181,0.25); }
.badge-new     { background: var(--a50); color: var(--a400); border: 0.5px solid rgba(186,117,23,0.25); }

/* Body */
.card-body { padding: 16px 18px 18px; }
.card-head { margin-bottom: 10px; }
.card-name {
  font-size: 18px; font-weight: 300;
  color: var(--warm900);
  margin-bottom: 3px;
}
.card-origin {
  font-size: 11px; color: var(--text-muted);
  display: flex; align-items: center; gap: 4px;
}
.card-origin i { font-size: 11px; }

.card-tags {
  display: flex; gap: 5px; flex-wrap: wrap;
  margin-bottom: 13px;
}

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 12px;
  border-top: 0.5px solid var(--border);
}
.card-price {
  font-size: 17px; font-weight: 500;
  color: var(--warm900);
}
.card-unit { font-size: 12px; color: var(--text-muted); }
.card-stars {
  display: flex; align-items: center; gap: 4px;
  margin-top: 3px;
}
.stars-visual { font-size: 11px; color: var(--a300); letter-spacing: 1px; }
.stars-count  { font-size: 11px; color: var(--text-muted); }

.add-btn {
  width: 34px; height: 34px;
  border-radius: 10px;
  border: none;
  background: var(--g500);
  color: #fff;
  font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}
.add-btn:hover { background: var(--g400); transform: scale(1.08); }
.add-btn.added { background: var(--g300); }
.apple-image {
  width: 85%;
  max-width: 180px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 18px rgba(30,25,10,.15));
  transition: transform .3s ease;
  position: relative;
  z-index: 1;
}

.variety-card:hover .apple-image {
  transform: scale(1.08) rotate(-2deg);
}

/* ===================================
   TABLET
=================================== */
@media (max-width: 992px) {

  .card-img-zone {
    height: 150px;
  }

  .apple-image {
    height: 120px;
  }

  .card-name {
    font-size: 17px;
  }

}

/* ===================================
   MOBILE
=================================== */
@media (max-width: 768px) {

  .variety-card {
    border-radius: 18px;
  }

  .card-img-zone {
    height: 140px;
  }

  .apple-image {
    height: 110px;
  }

  .card-body {
    padding: 14px;
  }

  .card-name {
    font-size: 16px;
    line-height: 1.25;
  }

  .card-origin {
    font-size: 10px;
  }

  .card-tags {
    gap: 4px;
    margin-bottom: 10px;
  }

  .tag {
    font-size: 10px;
    padding: 4px 8px;
  }

  .card-footer {
    gap: 10px;
  }

  .card-price {
    font-size: 16px;
  }

  .card-unit {
    font-size: 11px;
  }

  .stars-visual {
    font-size: 10px;
  }

  .stars-count {
    font-size: 10px;
  }

  .add-btn {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
}

/* ===================================
   SMALL MOBILE
=================================== */
@media (max-width: 480px) {

  .card-img-zone {
    height: 130px;
  }

  .apple-image {
    height: 95px;
  }

  .card-body {
    padding: 12px;
  }

  .card-name {
    font-size: 15px;
  }

  .card-badge {
    font-size: 9px;
    padding: 3px 8px;
  }

  .card-price {
    font-size: 15px;
  }

  .card-footer {
    align-items: center;
  }

  .add-btn {
    width: 42px;
    height: 42px;
    min-width: 42px;
  }

  .card-stars {
    flex-wrap: wrap;
  }
}

/* ===================================
   VERY SMALL DEVICES
=================================== */
@media (max-width: 360px) {

  .card-tags {
    display: none;
  }

  .card-img-zone {
    height: 120px;
  }

  .apple-image {
    height: 85px;
  }

  .card-name {
    font-size: 14px;
  }

  .card-price {
    font-size: 14px;
  }

  .add-btn {
    width: 40px;
    height: 40px;
  }

}
</style>
