import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const DELIVERY_FEE = 0
const FREE_DELIVERY_THRESHOLD = 30

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const initializeCart = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        items.value = JSON.parse(savedCart)
      }
    }
  }

  const saveCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items.value))
    }
  }

  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item._id === product._id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      })
    }
    saveCart()
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(item => item._id !== productId)
    saveCart()
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item._id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    items.value = []
    saveCart()
  }

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const deliveryFee = computed(() => {
    return subtotal.value >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  })

  const total = computed(() => {
    return subtotal.value + deliveryFee.value
  })

  return {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    initializeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
