<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Success Message -->
    <div class="bg-green-50 border-b border-green-200">
      <div class="container py-12 text-center">
        <div class="mb-4">
          <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        <p class="text-xl text-gray-600">Thank you for your order</p>
      </div>
    </div>

    <div class="container py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Order ID -->
          <div class="bg-white rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-dark mb-4">Order Details</h2>
            
            <div class="bg-gray-50 rounded-lg p-6 mb-6">
              <p class="text-sm text-gray-600 mb-2">Order ID</p>
              <p class="text-3xl font-bold text-primary">{{ orderId }}</p>
              <p class="text-sm text-gray-600 mt-2">{{ orderDate }}</p>
            </div>

            <!-- Delivery/Pickup Info -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">
                {{ deliveryType === 'delivery' ? '📦 Delivery Information' : '🏪 Pickup Information' }}
              </h3>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-gray-600">Estimated {{ deliveryType === 'delivery' ? 'Delivery' : 'Pickup' }} Time</p>
                  <p class="font-semibold text-dark">
                    {{ deliveryType === 'delivery' ? '30-45 minutes' : '15-20 minutes' }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Status</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span class="font-semibold text-dark">Pending Confirmation</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- What's Next -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">What's Next?</h3>
              <div class="space-y-4">
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">Order Confirmation</p>
                    <p class="text-sm text-gray-600">We'll confirm your order within 5 minutes</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-gray-300 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">Preparing Your Order</p>
                    <p class="text-sm text-gray-600">Our team will prepare your items</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-gray-300 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">{{ deliveryType === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup' }}</p>
                    <p class="text-sm text-gray-600">
                      {{ deliveryType === 'delivery' ? 'Your order is on its way' : 'Come pick up your order' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Email Confirmation -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div class="flex gap-4">
                <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="font-semibold text-dark">Confirmation Email Sent</p>
                  <p class="text-sm text-gray-600">We've sent a confirmation email to {{ email }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="bg-white rounded-lg p-8 mb-8">
            <h3 class="text-xl font-bold text-dark mb-6">Order Items</h3>
            <div class="space-y-4">
              <div v-for="item in orderItems" :key="item._id" class="flex justify-between items-center pb-4 border-b">
                <div>
                  <p class="font-semibold text-dark">{{ item.name }}</p>
                  <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
                </div>
                <span class="font-semibold text-dark">{{ (item.price * item.quantity).toLocaleString() }} RWF</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <router-link to="/orders" class="btn-primary flex-1 text-center">
              Track Order
            </router-link>
            <router-link to="/shop" class="btn-outline flex-1 text-center">
              Continue Shopping
            </router-link>
          </div>
        </div>

        <!-- Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-dark mb-6">Order Summary</h3>

            <div class="space-y-4 mb-6 pb-6 border-b">
              <div v-for="item in orderItems" :key="item._id" class="flex justify-between text-sm">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span class="font-semibold">{{ (item.price * item.quantity).toLocaleString() }} RWF</span>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{{ subtotal.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Delivery Fee</span>
                <span v-if="deliveryFee === 0" class="text-green-600 font-semibold">FREE</span>
                <span v-else>{{ deliveryFee.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-dark border-t pt-3">
                <span>Total</span>
                <span>{{ total.toLocaleString() }} RWF</span>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="mt-6 pt-6 border-t">
              <p class="text-sm text-gray-600 mb-2">Payment Method</p>
              <p class="font-semibold text-dark">{{ paymentMethod }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const orderId = ref(route.params.orderId || 'ORD-' + Date.now())
const email = ref(route.query.email || 'customer@example.com')
const deliveryType = ref(route.query.deliveryType || 'delivery')
const orderDate = ref(new Date().toLocaleString())

// Mock order items (in real app, fetch from backend)
const orderItems = ref([
  { _id: '1', name: 'Croissant', price: 3.99, quantity: 2 },
  { _id: '2', name: 'Espresso', price: 2.99, quantity: 1 },
])

const subtotal = ref(orderItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))
const deliveryFee = ref(deliveryType.value === 'pickup' ? 0 : 5)
const total = ref(subtotal.value + deliveryFee.value)
const paymentMethod = ref('Cash on Delivery')

onMounted(() => {
  // In real app, fetch order details from backend
  console.log('Order confirmed:', orderId.value)
})
</script>
