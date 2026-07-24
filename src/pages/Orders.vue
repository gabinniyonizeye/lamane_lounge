<template>
  <div class="min-h-screen bg-black">
    <!-- Header -->
    <div class="bg-gradient-to-b from-black via-black to-transparent border-b border-amber-500/20">
      <div class="container py-16">
        <h1 class="text-6xl font-black text-white mb-3">📦 Your Orders</h1>
        <p class="text-lg text-gray-400">Track and manage your orders</p>
      </div>
    </div>

    <div class="container py-12">
      <!-- Empty State -->
      <div v-if="orders.length === 0" class="text-center py-24">
        <svg class="w-40 h-40 text-amber-500/20 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4v10M7 12l8 4m0 0l8-4" />
        </svg>
        <p class="text-gray-400 text-2xl font-bold mb-2">No orders yet</p>
        <p class="text-gray-500 mb-8">Start ordering from our premium menu</p>
        <router-link to="/shop" class="inline-block px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all">
          🛍️ Start Shopping
        </router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order._id" class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300">
          <!-- Hover Gradient -->
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div class="relative z-10 p-8">
            <!-- Header Row -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-8 border-b border-amber-500/20">
              <div>
                <p class="text-sm text-gray-500 mb-2">Order ID</p>
                <p class="text-2xl font-black text-amber-300">{{ order._id }}</p>
              </div>
              <div class="mt-4 lg:mt-0 text-right">
                <p class="text-sm text-gray-500 mb-2">{{ formatDate(order.createdAt) }}</p>
                <div class="flex items-center gap-2 justify-end">
                  <span class="inline-block px-4 py-2 rounded-full text-sm font-bold" :class="getStatusColor(order.status)">
                    {{ getStatusLabel(order.status) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Items Section -->
            <div class="mb-8 pb-8 border-b border-amber-500/20">
              <h3 class="text-sm font-bold text-amber-300 mb-4">Items</h3>
              <div class="space-y-3">
                <div v-for="(item, idx) in order.items" :key="idx" class="flex justify-between items-center">
                  <span class="text-gray-300">{{ item.name }} x {{ item.quantity }}</span>
                  <span class="text-amber-300 font-bold">{{ (item.price * item.quantity).toLocaleString() }} RWF</span>
                </div>
              </div>
            </div>

            <!-- Order Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-amber-500/20">
              <div>
                <p class="text-sm text-gray-500 mb-2">Total Amount</p>
                <p class="text-3xl font-black bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">{{ order.total.toLocaleString() }} RWF</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-2">Delivery Type</p>
                <p class="text-lg font-bold text-white capitalize">{{ order.deliveryType === 'pickup' ? '🏪 Pickup' : '🚚 Delivery' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-2">Payment Method</p>
                <p class="text-lg font-bold text-white">{{ getPaymentMethod(order.paymentMethod) }}</p>
              </div>
            </div>

            <!-- Order Status Timeline -->
            <div class="mb-8">
              <h3 class="text-sm font-bold text-amber-300 mb-6">Order Status</h3>
              <div class="space-y-4">
                <div v-for="(step, idx) in statusSteps" :key="idx" class="flex gap-4">
                  <!-- Step Number -->
                  <div class="flex flex-col items-center">
                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all', isStepCompleted(order.status, idx) ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30']">
                      {{ idx + 1 }}
                    </div>
                    <div v-if="idx < statusSteps.length - 1" :class="['w-1 h-8 mt-2', isStepCompleted(order.status, idx) ? 'bg-gradient-to-b from-amber-400 to-amber-500' : 'bg-amber-500/20']"></div>
                  </div>
                  <!-- Step Content -->
                  <div class="pt-1">
                    <p class="font-bold text-white">{{ step.label }}</p>
                    <p class="text-sm text-gray-500">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="flex-1 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all">
                👁️ View Details
              </button>
              <button v-if="order.status === 'delivered'" class="flex-1 px-6 py-3 border-2 border-amber-500/30 text-amber-300 font-bold rounded-xl hover:bg-amber-500/10 transition-all">
                🔄 Reorder
              </button>
              <button v-else class="flex-1 px-6 py-3 border-2 border-amber-500/30 text-amber-300 font-bold rounded-xl hover:bg-amber-500/10 transition-all">
                📍 Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const orders = ref([])

const statusSteps = [
  { label: 'Order Placed', description: 'Your order has been received' },
  { label: 'Confirmed', description: 'Order confirmed by restaurant' },
  { label: 'Preparing', description: 'Your order is being prepared' },
  { label: 'Out for Delivery', description: 'Your order is on the way' },
  { label: 'Delivered', description: 'Order delivered successfully' }
]

const statusMap = {
  'pending': 0,
  'confirmed': 1,
  'preparing': 2,
  'out_for_delivery': 3,
  'delivered': 4
}

onMounted(() => {
  // Load orders from localStorage
  const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
  orders.value = savedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const getStatusLabel = (status) => {
  const labels = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'preparing': 'Preparing',
    'out_for_delivery': 'Out for Delivery',
    'delivered': 'Delivered'
  }
  return labels[status] || status
}

const getStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    'confirmed': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    'preparing': 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    'out_for_delivery': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    'delivered': 'bg-green-500/20 text-green-300 border border-green-500/30'
  }
  return colors[status] || 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
}

const getPaymentMethod = (method) => {
  const methods = {
    'cash': '💵 Cash on Delivery',
    'mobile': '📱 Mobile Money',
    'card': '💳 Credit Card',
    'paypal': '🅿️ PayPal'
  }
  return methods[method] || method
}

const isStepCompleted = (status, stepIndex) => {
  const currentStep = statusMap[status] || 0
  return stepIndex <= currentStep
}
</script>
