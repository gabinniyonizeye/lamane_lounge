<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="container py-12">
        <h1 class="text-5xl font-bold text-dark mb-2">🛒 Shopping Cart</h1>
        <p class="text-lg text-gray-600">Review your items before checkout</p>
      </div>
    </div>

    <div class="container py-12">
      <!-- Empty Cart -->
      <div v-if="cartStore.items.length === 0" class="text-center py-24">
        <div class="mb-6">
          <svg class="w-32 h-32 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p class="text-gray-500 text-2xl font-bold mb-2">Your cart is empty</p>
        <p class="text-gray-400 mb-8">Add some delicious items to get started!</p>
        <router-link to="/shop" class="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-xl hover:shadow-lg transition-all">
          🛍️ Continue Shopping
        </router-link>
      </div>

      <!-- Cart with Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="space-y-4">
            <div v-for="item in cartStore.items" :key="item._id" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all">
              <div class="flex gap-6">
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <img
                    :src="item.image || 'https://via.placeholder.com/120x120?text=Product'"
                    :alt="item.name"
                    class="w-24 h-24 object-cover rounded-xl"
                  />
                </div>

                <!-- Product Info -->
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-dark mb-2">{{ item.name }}</h3>
                  <p class="text-sm text-gray-600 mb-4">{{ item.price.toLocaleString() }} RWF each</p>
                  
                  <!-- Quantity Control -->
                  <div class="flex items-center gap-4">
                    <div class="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                      <button
                        @click="cartStore.updateQuantity(item._id, item.quantity - 1)"
                        class="px-4 py-2 hover:bg-slate-200 transition font-bold text-lg"
                      >
                        −
                      </button>
                      <span class="px-6 py-2 border-l border-r border-slate-300 font-bold text-dark">{{ item.quantity }}</span>
                      <button
                        @click="cartStore.updateQuantity(item._id, item.quantity + 1)"
                        class="px-4 py-2 hover:bg-slate-200 transition font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      @click="cartStore.removeItem(item._id)"
                      class="ml-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-semibold"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>

                <!-- Item Total -->
                <div class="text-right">
                  <p class="text-2xl font-bold text-primary">{{ (item.price * item.quantity).toLocaleString() }}</p>
                  <p class="text-sm text-gray-600">RWF</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Continue Shopping -->
          <div class="mt-8">
            <router-link to="/shop" class="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold transition">
              ← Continue Shopping
            </router-link>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 sticky top-24">
            <h2 class="text-2xl font-bold text-dark mb-8">Order Summary</h2>

            <!-- Price Breakdown -->
            <div class="space-y-4 mb-8 pb-8 border-b border-slate-200">
              <div class="flex justify-between text-gray-700">
                <span class="font-medium">Subtotal</span>
                <span class="font-bold">{{ cartStore.subtotal.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span class="font-medium">Delivery Fee</span>
                <span v-if="cartStore.deliveryFee === 0" class="text-green-600 font-bold">FREE ✓</span>
                <span v-else class="font-bold">{{ cartStore.deliveryFee.toLocaleString() }} RWF</span>
              </div>
              <div v-if="cartStore.subtotal < 30000" class="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                💡 Add {{ (30000 - cartStore.subtotal).toLocaleString() }} RWF more for free delivery!
              </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between text-2xl font-bold text-dark mb-8 pb-8 border-b border-slate-200">
              <span>Total</span>
              <span class="text-primary">{{ cartStore.total.toLocaleString() }} RWF</span>
            </div>

            <!-- Checkout Button -->
            <router-link to="/checkout" class="w-full block py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-xl hover:shadow-lg transition-all text-center mb-4">
              Proceed to Checkout →
            </router-link>

            <!-- Clear Cart Button -->
            <button
              @click="cartStore.clearCart"
              class="w-full py-3 border-2 border-slate-300 text-dark font-bold rounded-xl hover:bg-slate-100 transition"
            >
              Clear Cart
            </button>

            <!-- Promo Code -->
            <div class="mt-8 pt-8 border-t border-slate-200">
              <label class="block text-sm font-bold text-dark mb-3">🎟️ Promo Code</label>
              <div class="flex gap-2">
                <input
                  v-model="promoCode"
                  type="text"
                  placeholder="Enter code"
                  class="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <button class="px-4 py-2 bg-slate-200 text-dark rounded-lg hover:bg-slate-300 text-sm font-bold transition">
                  Apply
                </button>
              </div>
            </div>

            <!-- Info -->
            <div class="mt-8 pt-8 border-t border-slate-200 text-xs text-gray-600 space-y-2">
              <p>✓ Free delivery on orders over 30,000 RWF</p>
              <p>✓ Secure checkout</p>
              <p>✓ Multiple payment options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const promoCode = ref('')
</script>
