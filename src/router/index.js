import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Apple Garden — Яблука з нашого саду' }
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('@/views/CatalogView.vue'),
    meta: { title: 'Каталог сортів — Apple Garden' }
  },
  {
    path: '/variety/:slug',
    name: 'variety',
    component: () => import('@/components/VarietyView.vue'),
    meta: { title: 'Сорт — Apple Garden' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/components/AboutView.vue'),
    meta: { title: 'Про нас — Apple Garden' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/components/CartView.vue'),
    meta: { title: 'Кошик — Apple Garden' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'Apple Garden'
})

export default router
