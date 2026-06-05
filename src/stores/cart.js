import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const count = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )

  function add(variety) {
    const existing = items.value.find(i => i.id === variety.id)
    const qtyToAdd = variety.qty && variety.qty > 0 ? variety.qty : 1
    if (existing) {
      existing.qty += qtyToAdd
    } else {
      items.value.push({ ...variety, qty: qtyToAdd })
    }
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQty(id, qty) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      if (qty <= 0) remove(id)
      else item.qty = qty
    }
  }

  function clear() {
    items.value = []
  }

  return { items, count, total, add, remove, updateQty, clear }
})  