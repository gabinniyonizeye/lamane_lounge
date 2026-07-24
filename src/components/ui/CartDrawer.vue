<template>
  <div>
    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="isOpen"
        @click="close"
        class="fixed inset-0 bg-black/50 z-40"
      />
    </transition>

    <!-- Drawer -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-2xl font-bold text-dark">Cart</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="cartStore.items.length === 0" class="text-center py-12">
            <p class="text-gray-500">Your cart is empty</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in cartStore.items" :key="item._id" class="flex gap-4 pb-4 border-b">
              <img
                :src="item.image || 'https://via.placeholder.com/60x60?text=Product'"
                :alt="item.name"
                class="w-16 h-16 object-cover rounded"
              />
              <div class="flex-1">
                <p class="font-semibold text-dark text-sm">{{ item.name }}</p>
                <p class="text-gray-600 text-sm">{{ item.price.toLocaleString() }} RWF</p>
                <div class="flex items-center gap-2 mt-2">
                  <button
                    @click="cartStore.updateQuantity(item._id, item.quantity - 1)"
                    class="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span class="text-sm">{{ item.quantity }}</span>
                  <button
                    @click="cartStore.updateQuantity(item._id, item.quantity + 1)"
                    class="px-2 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                  <button
                    @click="cartStore.removeItem(item._id)"
                    class="ml-auto text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartStore.items.length > 0" class="border-t p-6 space-y-4">
          <div class="flex justify-between font-semibold text-dark">
            <span>Total:</span>
            <span>{{ cartStore.total.toLocaleString() }} RWF</span>
          </div>
          <router-link
            to="/cart"
            @click="close"
            class="block w-full text-center btn-primary"
          >
            View Cart
          </router-link>
          <button
            @click="checkout"
            class="w-full btn-secondary"
          >
            Checkout
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])
const cartStore = useCartStore()
const router = useRouter()

const close = () => {
  emit('close')
}

const checkout = () => {
  router.push('/checkout')
  close()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
