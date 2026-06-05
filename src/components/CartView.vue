<template>
  <div class="cart-page">
    <div class="container">
      <div class="cart-header">
        <RouterLink to="/catalog" class="back-link">
          <i class="ti ti-arrow-left"></i> Продовжити покупки
        </RouterLink>
        <h1 class="cart-title">Кошик</h1>
      </div>

      <!-- Empty -->
      <div v-if="!cartStore.items.length" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h2>Кошик порожній</h2>
        <p>Додайте свіжі яблука з нашого саду</p>
        <RouterLink to="/catalog" class="btn btn-primary">
          <i class="ti ti-apple"></i> До каталогу
        </RouterLink>
      </div>

      <!-- Items -->
      <div v-else class="cart-layout">
        <div class="cart-items">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="cart-item"
          >
            <div class="item-img-wrap">
              <img :src="item.image" :alt="item.name" class="item-img" />
            </div>
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-price-unit">{{ item.price }} грн / кг</div>
            </div>
            <div class="item-qty">
              <button class="qty-btn" @click="cartStore.updateQty(item.id, item.qty - 1)">−</button>
              <span class="qty-val">{{ item.qty }} кг</span>
              <button class="qty-btn" @click="cartStore.updateQty(item.id, item.qty + 1)">+</button>
            </div>
            <div class="item-total">{{ item.price * item.qty }} грн</div>
            <button class="remove-btn" @click="cartStore.remove(item.id)" aria-label="Видалити">
              <i class="ti ti-x"></i>
            </button>
          </div>
        </div>

        <!-- Summary -->
        <div class="cart-summary">
          <h3>Ваше замовлення</h3>

          <div class="summary-rows">
            <div class="summary-row" v-for="item in cartStore.items" :key="item.id">
              <span>{{ item.name }} × {{ item.qty }} кг</span>
              <span>{{ item.price * item.qty }} грн</span>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-total">
            <span>Разом</span>
            <span class="total-price">{{ cartStore.total }} грн</span>
          </div>

          <div class="delivery-note">
            <i class="ti ti-truck"></i>
            Доставка Новою Поштою · 1–2 дні
          </div>

          <!-- Order form -->
          <div class="order-form">
            <h4>Дані для доставки</h4>
            <input v-model="form.name" type="text" placeholder="Ваше ім'я" class="form-input" />
            <input v-model="form.phone" type="tel" placeholder="+380 ___ ___ __ __" class="form-input" />
            <input v-model="form.city" type="text" placeholder="Місто / Відділення НП" class="form-input" />
            <textarea v-model="form.comment" placeholder="Коментар (необов'язково)" class="form-input form-textarea"></textarea>
          </div>

          <button class="btn btn-primary checkout-btn" @click="placeOrder" :disabled="!canOrder">
            <i class="ti ti-credit-card"></i>
            Оформити замовлення
          </button>

          <p class="secure-note">
            <i class="ti ti-shield-check"></i>
            Безпечна оплата · Свіжі яблука
          </p>
        </div>
      </div>

      <!-- Success modal -->
      <Transition name="fade">
        <div v-if="orderPlaced" class="order-success-overlay" @click.self="orderPlaced = false">
          <div class="order-success">
            <div class="success-icon">🍎</div>
            <h2>Замовлення прийнято!</h2>
            <p>Ми зв'яжемось з вами найближчим часом для підтвердження.</p>
            <RouterLink to="/" class="btn btn-primary" @click="cartStore.clear(); orderPlaced = false">
              На головну
            </RouterLink>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const orderPlaced = ref(false)

const form = ref({ name: '', phone: '', city: '', comment: '' })

const canOrder = computed(() =>
  form.value.name.trim() && form.value.phone.trim() && form.value.city.trim()
)

function placeOrder() {
  if (!canOrder.value) return
  orderPlaced.value = true
}
</script>

<style scoped>
.cart-page {
  min-height: 80vh;
  padding: 40px 0 80px;
  background: var(--bg);
}

.cart-header { margin-bottom: 32px; }

.back-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; color: var(--text-muted);
  margin-bottom: 16px;
  transition: color 0.15s;
}
.back-link:hover { color: var(--g500); }

.cart-title {
  font-size: 36px; font-weight: 200; color: var(--warm900);
}

/* Empty */
.empty-cart {
  text-align: center; padding: 80px 20px;
}
.empty-icon { font-size: 64px; margin-bottom: 20px; }
.empty-cart h2 { font-size: 24px; font-weight: 300; color: var(--warm900); margin-bottom: 8px; }
.empty-cart p { font-size: 15px; color: var(--text-muted); margin-bottom: 28px; }

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: start;
}

/* Items */
.cart-items { display: flex; flex-direction: column; gap: 14px; }

.cart-item {
  display: flex; align-items: center; gap: 16px;
  background: var(--bg-alt);
  border: 0.5px solid var(--border);
  border-radius: 18px;
  padding: 16px 20px;
}

.item-img-wrap {
  width: 72px; height: 72px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--warm50);
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.item-img {
  width: 100%; height: 100%;
  object-fit: contain;
}

.item-info { flex: 1; min-width: 0; }
.item-name { font-size: 15px; font-weight: 400; color: var(--warm900); margin-bottom: 3px; }
.item-price-unit { font-size: 12px; color: var(--text-muted); }

.item-qty { display: flex; align-items: center; gap: 8px; }
.qty-btn {
  width: 30px; height: 30px; border-radius: 8px;
  border: 0.5px solid var(--border-md);
  background: var(--bg);
  font-size: 16px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--warm700); transition: all 0.15s;
}
.qty-btn:hover { border-color: var(--g300); color: var(--g500); }
.qty-val { font-size: 14px; font-weight: 500; min-width: 36px; text-align: center; }

.item-total { font-size: 16px; font-weight: 500; color: var(--warm900); min-width: 70px; text-align: right; }

.remove-btn {
  width: 28px; height: 28px; border-radius: 7px;
  border: none; background: transparent;
  color: var(--text-muted); font-size: 14px;
  cursor: pointer; transition: all 0.15s;
  display: flex; align-items: center; justify-content: center;
}
.remove-btn:hover { background: #FAEAE6; color: #c0392b; }

/* Summary */
.cart-summary {
  background: var(--bg-alt);
  border: 0.5px solid var(--border);
  border-radius: 24px;
  padding: 28px;
  position: sticky; top: 100px;
}
.cart-summary h3 {
  font-size: 18px; font-weight: 300; color: var(--warm900);
  margin-bottom: 20px;
}

.summary-rows { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.summary-row {
  display: flex; justify-content: space-between;
  font-size: 13px; color: var(--text-soft);
}

.summary-divider { height: 0.5px; background: var(--border); margin: 4px 0 16px; }

.summary-total {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 12px;
  font-size: 15px; font-weight: 500; color: var(--warm900);
}
.total-price {
  font-family: 'Fraunces', serif;
  font-size: 26px; font-weight: 300;
}

.delivery-note {
  font-size: 12px; color: var(--text-muted);
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 20px;
}
.delivery-note i { color: var(--g400); }

/* Order form */
.order-form { margin-bottom: 18px; }
.order-form h4 {
  font-size: 12px; font-weight: 500; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--text-muted);
  margin-bottom: 12px; font-family: 'DM Sans', sans-serif;
}
.form-input {
  width: 100%;
  height: 40px;
  border: 0.5px solid var(--border-md);
  border-radius: 10px;
  padding: 0 12px;
  font-size: 13px; color: var(--text);
  background: var(--bg);
  outline: none;
  margin-bottom: 8px;
  font-family: 'DM Sans', sans-serif;
  transition: border-color 0.15s;
}
.form-input:focus { border-color: var(--g300); }
.form-textarea { height: 72px; padding: 10px 12px; resize: none; }

.checkout-btn {
  width: 100%; justify-content: center;
  height: 50px; font-size: 15px;
  margin-bottom: 12px;
}
.checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

.secure-note {
  font-size: 11px; color: var(--text-muted);
  display: flex; align-items: center; gap: 5px; justify-content: center;
}
.secure-note i { color: var(--g400); font-size: 13px; }

/* Success overlay */
.order-success-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
}
.order-success {
  background: var(--bg-alt);
  border-radius: 28px;
  padding: 48px 40px;
  text-align: center;
  max-width: 380px; width: 90%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
.success-icon { font-size: 64px; margin-bottom: 20px; }
.order-success h2 { font-size: 26px; font-weight: 300; color: var(--warm900); margin-bottom: 10px; }
.order-success p { font-size: 14px; color: var(--text-soft); margin-bottom: 28px; line-height: 1.6; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-summary { position: static; }
}
@media (max-width: 600px) {
  .cart-item { flex-wrap: wrap; }
  .item-total { flex: 1; }
}
</style>