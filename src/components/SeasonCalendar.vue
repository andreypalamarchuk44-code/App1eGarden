<template>
  <section class="cal-section" id="calendar" aria-label="Календар дозрівання">
    <div class="container">
      <div class="cal-header">
        <div>
          <div class="section-label">
            <i class="ti ti-calendar" aria-hidden="true"></i>
            Сезонність
          </div>
          <h2 class="section-title">Календар <em>дозрівання</em></h2>
          <p class="cal-sub">Знайте, коли саме ваш улюблений сорт буде в наявності.</p>
        </div>
        <div class="cal-legend">
          <div class="legend-item">
            <span class="legend-dot peak"></span> Пік сезону
          </div>
          <div class="legend-item">
            <span class="legend-dot on"></span> Є в наявності
          </div>
          <div class="legend-item">
            <span class="legend-dot off"></span> Не сезон
          </div>
        </div>
      </div>
<p class="mobile-scroll-tip">
  ← Проведіть таблицю вліво або вправо →
</p>
      <div class="cal-wrap">
        <div class="cal-grid" role="grid" :aria-label="'Таблиця сезонності'">
          <!-- Header row -->
          <div class="cal-row cal-header-row" role="row">
            <div class="cal-cell cal-label-cell" role="columnheader">Сорт</div>
            <div
              v-for="(m, i) in MONTHS"
              :key="m"
              class="cal-cell cal-month-cell"
              :class="{ 'current-month': i === currentMonth }"
              role="columnheader"
            >{{ m }}</div>
          </div>

          <!-- Variety rows -->
          <div
            v-for="v in calVarieties"
            :key="v.id"
            class="cal-row"
            role="row"
          >
            <div class="cal-cell cal-label-cell" role="rowheader">
             <img :src="v.image"
              :alt="v.name"
              class="row-image"
  >
              {{ v.name }}
            </div>
            <div
              v-for="(val, mi) in v.months"
              :key="mi"
              class="cal-cell cal-data-cell"
              :class="{
                peak: val === 2,
                on: val === 1,
                off: val === 0,
                'current-month': mi === currentMonth
              }"
              :aria-label="cellLabel(v.name, mi, val)"
              role="gridcell"
            >
              <span v-if="val === 2" class="peak-dot" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useVarieties } from '@/composables/useVarieties'

const { varieties, MONTHS } = useVarieties()

const currentMonth = new Date().getMonth()

const calVarieties = computed(() =>
  varieties.filter(v => v.months && v.months.some(m => m > 0))
)

function cellLabel(name, monthIdx, val) {
  const m = MONTHS[monthIdx]
  if (val === 2) return `${name} — ${m}: пік сезону`
  if (val === 1) return `${name} — ${m}: є в наявності`
  return `${name} — ${m}: не сезон`
}
</script>

<style scoped>
.cal-section {
  padding: 80px 0;
  background: var(--bg);
  border-top: 0.5px solid var(--border);
}

.cal-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}
.cal-sub { font-size: 14px; color: var(--text-soft); margin-top: 6px; max-width: 420px; }

.cal-legend {
  display: flex; gap: 20px; flex-wrap: wrap;
}
.legend-item {
  display: flex; align-items: center; gap: 7px;
  font-size: 12px; color: var(--text-muted);
}
.legend-dot {
  width: 14px; height: 14px; border-radius: 4px;
}
.legend-dot.peak { background: var(--g300); }
.legend-dot.on   { background: var(--g100); border: 0.5px solid var(--g200); }
.legend-dot.off  { background: var(--warm100); }


.mobile-scroll-tip {
  display: none;
}

@media (max-width: 768px) {
  .mobile-scroll-tip {
    display: block;
    margin-bottom: 12px;
    font-size: 12px;
    color: var(--text-muted);
  }
}

/* Grid */
.cal-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;

  border-radius: 20px;
  border: 0.5px solid var(--border);

  background: var(--bg-alt);

  box-shadow:
    0 10px 30px rgba(0,0,0,.04);
}
.cal-grid {
  min-width: 680px;
}
.cal-row {
  display: grid;
  grid-template-columns: 160px repeat(12, 1fr);
  border-bottom: 0.5px solid var(--border);
}
.cal-row:last-child { border-bottom: none; }

.cal-cell {
  padding: 8px 4px;
  display: flex; align-items: center; justify-content: center;
  min-height: 42px;
  transition: background 0.12s;
}

.cal-label-cell {
  justify-content: flex-start;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--warm700);
  background: rgba(245,242,234,0.6);
  border-right: 0.5px solid var(--border);
  gap: 8px;
  white-space: nowrap;
}
.row-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-right: 10px;
}

.cal-month-cell {
  font-size: 10px; font-weight: 500;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--text-muted);
  background: rgba(245,242,234,0.4);
  border-bottom: 0.5px solid var(--border);
}

.cal-header-row .cal-label-cell {
  font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--text-muted);
}

.cal-data-cell {
  border-left: 0.5px solid transparent;
}
.cal-data-cell.off  { background: transparent; }
.cal-data-cell.on   { background: rgba(192,221,151,0.35); }
.cal-data-cell.peak {
  background: var(--g50);
  position: relative;
}

.peak-dot {
  display: block;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--g300);
}

.current-month {
  background: rgba(125,181,44,0.08) !important;
  border-left: 1.5px solid var(--g200) !important;
  border-right: 1.5px solid var(--g200) !important;
}


/* ===================================
   TABLET
=================================== */
@media (max-width: 992px) {

  .cal-section {
    padding: 70px 0;
  }

  .cal-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  .cal-legend {
    gap: 12px;
  }

}

/* ===================================
   MOBILE
=================================== */
@media (max-width: 768px) {

  .cal-section {
    padding: 60px 0;
  }

  .section-title {
    font-size: 34px;
  }

  .cal-sub {
    max-width: 100%;
    font-size: 14px;
  }

  .cal-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .cal-grid {
    min-width: 760px;
  }

  .cal-row {
    grid-template-columns: 180px repeat(12, 1fr);
  }

  .cal-label-cell {
    font-size: 13px;
    position: sticky;
    left: 0;
    z-index: 10;
    background: var(--bg-alt);
  }

  .row-image {
    width: 36px;
    height: 36px;
  }

  .cal-month-cell {
    font-size: 11px;
  }

  .cal-cell {
    min-height: 46px;
  }

}

/* ===================================
   SMALL MOBILE
=================================== */
@media (max-width: 480px) {

  .cal-section {
    padding: 50px 0;
  }

  .section-title {
    font-size: 28px;
  }

  .cal-grid {
    min-width: 720px;
  }

  .cal-row {
    grid-template-columns: 150px repeat(12, 48px);
  }

  .cal-label-cell {
    font-size: 12px;
    padding: 8px;
  }

  .row-image {
    width: 28px;
    height: 28px;
    margin-right: 6px;
  }

  .cal-month-cell {
    font-size: 10px;
  }

  .legend-item {
    font-size: 11px;
  }

  .legend-dot {
    width: 12px;
    height: 12px;
  }

}

/* ===================================
   VERY SMALL DEVICES
=================================== */
@media (max-width: 360px) {

  .cal-grid {
    min-width: 680px;
  }

  .cal-row {
    grid-template-columns: 140px repeat(12, 44px);
  }

  .cal-label-cell {
    font-size: 11px;
  }

  .row-image {
    width: 24px;
    height: 24px;
  }

}
</style>
