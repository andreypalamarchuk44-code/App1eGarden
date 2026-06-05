<template>
  <section class="notify-section" id="contacts" aria-label="Підписка на сповіщення">
    <div class="container">
      <div class="notify-card">
        <!-- Decorative -->
        <span class="notify-dec-1" aria-hidden="true">🍎</span>
        <span class="notify-dec-2" aria-hidden="true">🌿</span>
        <span class="notify-dec-3" aria-hidden="true">🍏</span>

        <div class="notify-inner">
          <div class="notify-icon" aria-hidden="true">
            <i class="ti ti-bell-ringing"></i>
          </div>

          <div class="notify-content">
            <h2>Підпишіться на сповіщення</h2>
            <p>
              Повідомимо, коли з'явиться новий урожай або улюблений сорт знову буде в наявності.
              Тільки важливе — без спаму.
            </p>
          </div>

          <form class="notify-form" @submit.prevent="subscribe" novalidate>
            <div class="form-group">
              <input
                v-model="email"
                type="email"
                placeholder="ваш@email.com"
                aria-label="Email адреса"
                :class="{ error: hasError }"
                @input="hasError = false"
              />
              <button type="submit" class="btn btn-primary" :class="{ success: subscribed }">
                <i :class="subscribed ? 'ti ti-check' : 'ti ti-send'" aria-hidden="true"></i>
                {{ subscribed ? 'Підписано!' : 'Підписатись' }}
              </button>
            </div>
            <p v-if="hasError" class="form-error" role="alert">Введіть правильний email</p>
            <p class="form-note"><i class="ti ti-lock" aria-hidden="true"></i> Ваш email у безпеці. Без спаму.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)
const hasError = ref(false)

function subscribe() {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  if (!valid) { hasError.value = true; return }
  subscribed.value = true
  setTimeout(() => {
    subscribed.value = false
    email.value = ''
  }, 3000)
}
</script>

<style scoped>
.notify-section {
  padding: 60px 0 80px;
  background: var(--bg);
}

.notify-card {
  position: relative;
  border-radius: 28px;
  background: linear-gradient(135deg, #E8F3D0 0%, #F5EDD8 60%, #FEF6E4 100%);
  border: 0.5px solid rgba(168,210,80,0.3);
  padding: 48px 52px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

/* Decorative fruits */
.notify-dec-1,
.notify-dec-2,
.notify-dec-3 {
  position: absolute;
  pointer-events: none;
  opacity: 0.2;
}
.notify-dec-1 { font-size: 80px; top: -16px; right: 60px; transform: rotate(15deg); }
.notify-dec-2 { font-size: 52px; bottom: -8px; left: 80px; transform: rotate(-10deg); }
.notify-dec-3 { font-size: 64px; top: 20px; right: 200px; transform: rotate(-5deg); }

.notify-inner {
  position: relative; z-index: 1;
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}

.notify-icon {
  width: 60px; height: 60px;
  background: rgba(255,255,255,0.7);
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  color: var(--g500);
  font-size: 28px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(30,25,10,0.08);
}

.notify-content { flex: 1; min-width: 220px; }
.notify-content h2 {
  font-size: 22px; font-weight: 300;
  color: var(--warm900);
  margin-bottom: 6px;
}
.notify-content p {
  font-size: 14px; color: var(--text-soft);
  max-width: 380px; line-height: 1.6;
}

.notify-form { display: flex; flex-direction: column; gap: 8px; }

.form-group {
  display: flex; gap: 8px;
}
.form-group input {
  height: 46px; padding: 0 18px;
  border: 0.5px solid rgba(168,210,80,0.4);
  border-radius: 14px;
  background: rgba(255,255,255,0.7);
  font-size: 14px;
  width: 220px;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
  color: var(--text);
}
.form-group input:focus {
  border-color: var(--g300);
  background: rgba(255,255,255,0.92);
}
.form-group input.error { border-color: #E24B4A; }
.form-group input::placeholder { color: var(--text-muted); }

.form-error { font-size: 12px; color: #A32D2D; }
.form-note {
  font-size: 11px; color: var(--text-muted);
  display: flex; align-items: center; gap: 4px;
}
.form-note i { font-size: 11px; }

.btn.success { background: var(--g300) !important; }
</style>
