<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold mb-6">Order Tracking</h3>

    <div class="space-y-6">
      <div v-for="order in orders" :key="order._id" class="border rounded-lg p-4">
        <!-- Order Header -->
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="font-semibold">Order #{{ order._id.slice(-6).toUpperCase() }}</p>
            <p class="text-sm text-gray-600">{{ formatDate(order.createdAt) }}</p>
          </div>
          <span :class="['px-3 py-1 rounded-full text-sm font-semibold', statusColor(order.status)]">
            {{ order.status }}
          </span>
        </div>

        <!-- Timeline -->
        <div class="space-y-3">
          <div v-for="(step, index) in timeline" :key="index" class="flex gap-4">
            <!-- Timeline Dot -->
            <div class="flex flex-col items-center">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white text-sm', isStepCompleted(order.status, step.status) ? 'bg-green-500' : 'bg-gray-300']">
                {{ step.icon }}
              </div>
              <div v-if="index < timeline.length - 1" class="w-0.5 h-12 bg-gray-300 my-1"></div>
            </div>

            <!-- Step Info -->
            <div class="pb-4">
              <p class="font-semibold">{{ step.label }}</p>
              <p class="text-sm text-gray-600">{{ step.description }}</p>
            </div>
          </div>
        </div>

        <!-- Delivery Info -->
        <div v-if="order.deliveryType === 'delivery'" class="mt-4 pt-4 border-t">
          <p class="text-sm"><strong>Delivery Address:</strong> {{ order.deliveryAddress }}</p>
          <p class="text-sm"><strong>Estimated:</strong> {{ formatDate(order.estimatedDelivery) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const orders = ref([])

const timeline = [
  { status: 'confirmed', label: 'Order Confirmed', description: 'Your order has been received', icon: '✓' },
  { status: 'preparing', label: 'Preparing', description: 'Our team is preparing your order', icon: '👨‍🍳' },
  { status: 'ready', label: 'Ready for Pickup', description: 'Your order is ready', icon: '📦' },
  { status: 'delivered', label: 'Delivered', description: 'Order completed', icon: '✓' }
]

const statusColor = (status) => {
  const colors = {
    confirmed: 'bg-blue-100 text-blue-700',
    preparing: 'bg-yellow-100 text-yellow-700',
    ready: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const isStepCompleted = (orderStatus, stepStatus) => {
  const statusOrder = ['confirmed', 'preparing', 'ready', 'delivered']
  return statusOrder.indexOf(orderStatus) >= statusOrder.indexOf(stepStatus)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const fetchOrders = async () => {
  try {
    const response = await fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      orders.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
}

onMounted(() => {
  fetchOrders()
})
</script>
