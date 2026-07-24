<template>
  <div class="min-h-screen bg-black">
    <!-- Header -->
    <div class="bg-gradient-to-b from-black via-black to-transparent border-b border-amber-500/20">
      <div class="container py-16">
        <h1 class="text-6xl font-black text-white mb-3">🛒 Your Cart</h1>
        <p class="text-lg text-gray-400">Review and finalize your premium selection</p>
      </div>
    </div>

    <div class="container py-12">
      <!-- Empty Cart -->
      <div v-if="cartStore.items.length === 0" class="text-center py-32">
        <div class="mb-8">
          <svg class="w-40 h-40 text-amber-500/20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p class="text-gray-400 text-2xl font-bold mb-2">Your cart is empty</p>
        <p class="text-gray-500 mb-8">Discover our premium selection of artisan products</p>
        <router-link to="/shop" class="inline-block px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all">
          🛍️ Start Shopping
        </router-link>
      </div>

      <!-- Cart with Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartStore.items" :key="item._id" class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300 p-6">
            <!-- Hover Gradient -->
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div class="relative z-10 flex gap-6">
              <!-- Product Image -->
              <div class="flex-shrink-0">
                <img
                  :src="item.image || 'https://via.placeholder.com/120x120?text=Product'"
                  :alt="item.name"
                  class="w-28 h-28 object-cover rounded-xl border border-amber-500/20"
                />
              </div>

              <!-- Product Info -->
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-2">{{ item.name }}</h3>
                <p class="text-amber-300 font-bold mb-4">{{ item.price.toLocaleString() }} RWF each</p>
                
                <!-- Quantity Control -->
                <div class="flex items-center gap-4">
                  <div class="flex items-center border border-amber-500/30 rounded-lg bg-black/50 backdrop-blur-xl">
                    <button
                      @click="cartStore.updateQuantity(item._id, item.quantity - 1)"
                      class="px-4 py-2 hover:bg-amber-500/20 transition font-bold text-lg text-amber-300"
                    >
                      −
                    </button>
                    <span class="px-6 py-2 border-l border-r border-amber-500/30 font-bold text-white">{{ item.quantity }}</span>
                    <button
                      @click="cartStore.updateQuantity(item._id, item.quantity + 1)"
                      class="px-4 py-2 hover:bg-amber-500/20 transition font-bold text-lg text-amber-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="cartStore.removeItem(item._id)"
                    class="ml-auto px-4 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition font-semibold"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>

              <!-- Item Total -->
              <div class="text-right">
                <p class="text-3xl font-black bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{{ (item.price * item.quantity).toLocaleString() }}</p>
                <p class="text-sm text-gray-500">RWF</p>
              </div>
            </div>
          </div>

          <!-- Continue Shopping -->
          <div class="mt-8">
            <router-link to="/shop" class="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-bold transition">
              ← Continue Shopping
            </router-link>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-6">
            <!-- Summary Card -->
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/30 to-black border border-amber-500/30 backdrop-blur-xl p-8">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-50"></div>
              
              <div class="relative z-10">
                <h2 class="text-2xl font-black text-white mb-8">Order Summary</h2>

                <!-- Price Breakdown -->
                <div class="space-y-4 mb-8 pb-8 border-b border-amber-500/20">
                  <div class="flex justify-between">
                    <span class="text-gray-400">Subtotal</span>
                    <span class="font-bold text-white">{{ cartStore.subtotal.toLocaleString() }} RWF</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">Delivery Fee</span>
                    <span v-if="cartStore.deliveryFee === 0" class="text-green-400 font-bold">FREE ✓</span>
                    <span v-else class="font-bold text-white">{{ cartStore.deliveryFee.toLocaleString() }} RWF</span>
                  </div>
                  <div v-if="cartStore.subtotal < 30000" class="text-xs text-gray-400 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    💡 Add {{ (30000 - cartStore.subtotal).toLocaleString() }} RWF more for free delivery!
                  </div>
                </div>

                <!-- Total -->
                <div class="flex justify-between text-2xl font-black mb-8 pb-8 border-b border-amber-500/20">
                  <span class="text-white">Total</span>
                  <span class="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{{ cartStore.total.toLocaleString() }} RWF</span>
                </div>

                <!-- Checkout Button -->
                <router-link to="/checkout" class="w-full block py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all text-center mb-4">
                  Proceed to Checkout →
                </router-link>

                <!-- Clear Cart Button -->
                <button
                  @click="cartStore.clearCart"
                  class="w-full py-3 border-2 border-amber-500/30 text-amber-300 font-bold rounded-xl hover:bg-amber-500/10 transition"
                >
                  Clear Cart
                </button>

                <!-- Promo Code -->
                <div class="mt-8 pt-8 border-t border-amber-500/20">
                  <label class="block text-sm font-bold text-amber-300 mb-3">🎟️ Promo Code</label>
                  <div class="flex gap-2">
                    <input
                      v-model="promoCode"
                      type="text"
                      placeholder="Enter code"
                      class="flex-1 px-4 py-2 bg-black/50 border border-amber-500/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    />
                    <button class="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-lg hover:bg-amber-500/30 text-sm font-bold transition border border-amber-500/30">
                      Apply
                    </button>
                  </div>
                </div>

                <!-- Info -->
                <div class="mt-8 pt-8 border-t border-amber-500/20 text-xs text-gray-500 space-y-2">
                  <p>✓ Free delivery on orders over 30,000 RWF</p>
                  <p>✓ Secure checkout</p>
                  <p>✓ Multiple payment options</p>
                </div>
              </div>
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
