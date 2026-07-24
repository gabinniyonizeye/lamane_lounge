<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="container py-8">
        <h1 class="text-4xl font-bold text-dark">Shopping Cart</h1>
      </div>
    </div>

    <div class="container py-8">
      <div v-if="cartStore.items.length === 0" class="text-center py-16">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-gray-500 text-xl mb-6">Your cart is empty</p>
        <router-link to="/shop" class="btn-primary inline-block">
          Continue Shopping
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-100 border-b">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-dark">Product</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-dark">Price</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-dark">Quantity</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-dark">Total</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-dark">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartStore.items" :key="item._id" class="border-b hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-4">
                        <img
                          :src="item.image || 'https://via.placeholder.com/80x80?text=Product'"
                          :alt="item.name"
                          class="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p class="font-semibold text-dark">{{ item.name }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-gray-700">{{ item.price.toLocaleString() }} RWF</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center border border-gray-300 rounded-lg w-fit">
                        <button
                          @click="cartStore.updateQuantity(item._id, item.quantity - 1)"
                          class="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span class="px-4 py-1 border-l border-r border-gray-300">{{ item.quantity }}</span>
                        <button
                          @click="cartStore.updateQuantity(item._id, item.quantity + 1)"
                          class="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-semibold text-dark">{{ (item.price * item.quantity).toLocaleString() }} RWF</td>
                    <td class="px-6 py-4">
                      <button
                        @click="cartStore.removeItem(item._id)"
                        class="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Continue Shopping -->
          <div class="mt-6">
            <router-link to="/shop" class="text-primary hover:text-secondary font-semibold">
              ← Continue Shopping
            </router-link>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-6 sticky top-24">
            <h2 class="text-2xl font-bold text-dark mb-6">Order Summary</h2>

            <div class="space-y-4 mb-6 pb-6 border-b">
              <div class="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{{ cartStore.subtotal.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Delivery Fee</span>
                <span v-if="cartStore.deliveryFee === 0" class="text-green-600 font-semibold">FREE</span>
                <span v-else>{{ cartStore.deliveryFee.toLocaleString() }} RWF</span>
              </div>
              <div v-if="cartStore.deliveryFee > 0" class="text-sm text-gray-500">
                Free delivery
              </div>
            </div>

            <div class="flex justify-between text-xl font-bold text-dark mb-6">
              <span>Total</span>
              <span>{{ cartStore.total.toLocaleString() }} RWF</span>
            </div>

            <router-link to="/checkout" class="w-full btn-primary mb-3 block text-center">
              Proceed to Checkout
            </router-link>

            <button
              @click="cartStore.clearCart"
              class="w-full btn-outline"
            >
              Clear Cart
            </button>

            <!-- Promo Code -->
            <div class="mt-6 pt-6 border-t">
              <label class="block text-sm font-semibold text-dark mb-2">Promo Code</label>
              <div class="flex gap-2">
                <input
                  v-model="promoCode"
                  type="text"
                  placeholder="Enter code"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-semibold">
                  Apply
                </button>
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
const freeDeliveryThreshold = 30
</script>
