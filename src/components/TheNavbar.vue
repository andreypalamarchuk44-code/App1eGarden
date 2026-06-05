```vue
<template>
  <header class="nav-wrapper" :class="{ scrolled: isScrolled }">
    <nav class="nav-inner container">

      <RouterLink to="/" class="logo">
        <span class="logo-mark">
          <i class="ti ti-leaf"></i>
        </span>
        <span class="logo-name">Apple Garden</span>
      </RouterLink>

      <ul class="nav-links">
        <li><RouterLink to="/">Головна</RouterLink></li>
        <li><RouterLink to="/catalog">Каталог</RouterLink></li>
        <li><RouterLink to="/about">Про нас</RouterLink></li>
        <li><a href="/#calendar">Сезон</a></li>
        <li><a href="/#contacts">Контакти</a></li>
      </ul>

      <div class="nav-right">

        <div class="search-pill">
          <i class="ti ti-search"></i>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Пошук сорту..."
            aria-label="Пошук яблук"
            @keydown.enter="doSearch"
          />
        </div>

        <RouterLink
          to="/cart"
          class="cart-btn"
          :aria-label="`Кошик, ${cartStore.count} товарів`"
        >
          <i class="ti ti-shopping-bag"></i>

          <span
            v-if="cartStore.count > 0"
            class="cart-count"
          >
            {{ cartStore.count }}
          </span>
        </RouterLink>

        <button
          class="burger"
          @click="menuOpen = !menuOpen"
          :aria-label="menuOpen ? 'Закрити меню' : 'Відкрити меню'"
        >
          <i
            class="ti"
            :class="menuOpen ? 'ti-x' : 'ti-menu-2'"
          ></i>
        </button>

      </div>
    </nav>

    <Transition name="mobile-menu">
      <div
        v-if="menuOpen"
        class="mobile-menu"
      >
        <RouterLink to="/" @click="closeMenu">
          Головна
        </RouterLink>

        <RouterLink to="/catalog" @click="closeMenu">
          Каталог
        </RouterLink>

        <RouterLink to="/about" @click="closeMenu">
          Про нас
        </RouterLink>

        <a href="/#calendar" @click="closeMenu">
          Сезон
        </a>

        <a href="/#contacts" @click="closeMenu">
          Контакти
        </a>

        <div class="mobile-search">
          <i class="ti ti-search"></i>

          <input
            v-model="searchQuery"
            type="search"
            placeholder="Пошук сорту..."
            @keydown.enter="doSearch"
          />
        </div>
      </div>
    </Transition>

  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const searchQuery = ref('')
const menuOpen = ref(false)

const { y } = useWindowScroll()

const isScrolled = ref(false)

watch(y, (val) => {
  isScrolled.value = val > 40
})

function closeMenu() {
  menuOpen.value = false
}

function doSearch() {
  if (!searchQuery.value.trim()) return

  router.push({
    path: '/catalog',
    query: {
      q: searchQuery.value.trim()
    }
  })

  searchQuery.value = ''
  menuOpen.value = false
}
</script>

<style scoped>
.nav-wrapper {
  position: sticky;
  top: 12px;
  z-index: 200;
  padding: 0 16px;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 64px;
  padding: 0 24px;

  background: rgba(245,242,234,.78);
  backdrop-filter: blur(20px);

  border-radius: 22px;

  border: 1px solid rgba(255,255,255,.55);

  box-shadow:
    0 6px 32px rgba(30,25,10,.07),
    inset 0 1px rgba(255,255,255,.6);

  transition: .25s;
}

.nav-wrapper.scrolled .nav-inner {
  background: rgba(248,245,238,.95);

  box-shadow:
    0 12px 40px rgba(30,25,10,.12),
    inset 0 1px rgba(255,255,255,.6);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-mark {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--g50);

  border-radius: 10px;

  color: var(--g500);
}

.logo-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--warm900);
}

.nav-links {
  display: flex;
  gap: 28px;
  list-style: none;
}

.nav-links a {
  color: var(--text-muted);
  transition: .2s;
}

.nav-links a:hover,
.nav-links .router-link-active {
  color: var(--g500);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-pill {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 14px;

  background: rgba(255,255,255,.5);

  border-radius: 12px;
}

.search-pill input {
  width: 140px;

  border: none;
  outline: none;

  background: transparent;
}

.cart-btn,
.burger {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: rgba(255,255,255,.5);

  color: var(--warm700);

  position: relative;
}

.cart-count {
  position: absolute;
  top: -4px;
  right: -4px;

  min-width: 18px;
  height: 18px;

  border-radius: 50%;

  background: var(--g400);

  color: white;

  font-size: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.burger {
  display: none;

  border: none;
  cursor: pointer;
}

.mobile-menu {
  position: absolute;

  top: calc(100% + 10px);
  left: 16px;
  right: 16px;

  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 18px;

  background: rgba(248,245,238,.96);

  backdrop-filter: blur(20px);

  border-radius: 20px;

  box-shadow: 0 10px 40px rgba(0,0,0,.08);
}

.mobile-menu a {
  padding: 12px;
  border-radius: 10px;
}

.mobile-menu a:hover {
  background: var(--g50);
}

.mobile-search {
  margin-top: 10px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 12px;

  border-radius: 12px;

  background: rgba(255,255,255,.6);
}

.mobile-search input {
  width: 100%;

  border: none;
  outline: none;
  background: transparent;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: .2s;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 1024px) {
  .nav-links {
    gap: 18px;
  }

  .search-pill input {
    width: 110px;
  }
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .search-pill {
    display: none;
  }

  .burger {
    display: flex;
  }

  .logo-name {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .nav-wrapper {
    top: 8px;
    padding: 0 10px;
  }

  .nav-inner {
    height: 58px;
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .logo-name {
    display: none;
  }

  .nav-inner {
    padding: 0 12px;
  }

  .mobile-menu {
    left: 10px;
    right: 10px;
  }
}
</style>
```
