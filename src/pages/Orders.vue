<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="container py-8">
        <h1 class="text-4xl font-bold text-dark">My Orders</h1>
      </div>
    </div>

    <div class="container py-8">
      <!-- Empty State -->
      <div v-if="orders.length === 0" class="text-center py-16">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-gray-500 text-xl mb-6">No orders yet</p>
        <router-link to="/shop" class="btn-primary inline-block">
          Start Shopping
        </router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order.id" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
          <!-- Order Header -->
          <div class="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-600">Order ID</p>
              <p class="text-lg font-bold text-dark">{{ order.id }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">{{ order.date }}</p>
              <span :class="['inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1', statusColor(order.status)]">
                {{ order.status }}
              </span>
            </div>
          </div>

          <!-- Order Content -->
          <div class="p-6">
            <!-- Order Items -->
            <div class="mb-6">
              <h3 class="font-semibold text-dark mb-3">Items</h3>
              <div class="space-y-2">
                <div v-for="item in order.items" :key="item.id" class="flex justify-between text-sm">
                  <span>{{ item.name }} x {{ item.quantity }}</span>
                  <span class="font-semibold">{{ (item.price * item.quantity).toLocaleString() }} RWF</span>
                </div>
              </div>
            </div>

            <!-- Order Details -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
              <div>
                <p class="text-sm text-gray-600 mb-1">Total Amount</p>
                <p class="text-2xl font-bold text-primary">{{ order.total.toLocaleString() }} RWF</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-1">Delivery Type</p>
                <p class="font-semibold text-dark capitalize">{{ order.deliveryType }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-1">Payment Method</p>
                <p class="font-semibold text-dark">{{ order.paymentMethod }}</p>
              </div>
            </div>

            <!-- Status Timeline -->
            <div class="mb-6">
              <h3 class="font-semibold text-dark mb-4">Order Status</h3>
              <div class="space-y-3">
                <div v-for="(step, index) in orderSteps" :key="index" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-white font-bold', isStepCompleted(order.status, step.status) ? 'bg-green-500' : 'bg-gray-300']">
                      {{ index + 1 }}
                    </div>
                    <div v-if="index < orderSteps.length - 1" class="w-1 h-8 bg-gray-300 mt-1" />
                  </div>
                  <div class="pt-1">
                    <p class="font-semibold text-dark">{{ step.label }}</p>
                    <p class="text-sm text-gray-600">{{ step.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <button class="flex-1 btn-outline">
                View Details
              </button>
              <button v-if="order.status === 'delivered'" class="flex-1 btn-primary">
                Reorder
              </button>
              <button v-else class="flex-1 btn-secondary">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: 'ORD-1234567890',
    date: 'Dec 15, 2024',
    status: 'delivered',
    items: [
      { id: 1, name: 'Croissant', price: 3.99, quantity: 2 },
      { id: 2, name: 'Espresso', price: 2.99, quantity: 1 },
    ],
    total: 10.97,
    deliveryType: 'delivery',
    paymentMethod: 'Cash on Delivery',
  },
  {
    id: 'ORD-1234567891',
    date: 'Dec 10, 2024',
    status: 'out_for_delivery',
    items: [
      { id: 3, name: 'Chocolate Cake', price: 24.99, quantity: 1 },
    ],
    total: 29.99,
    deliveryType: 'delivery',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-1234567892',
    date: 'Dec 5, 2024',
    status: 'confirmed',
    items: [
      { id: 4, name: 'Bread Loaf', price: 4.99, quantity: 1 },
      { id: 5, name: 'Cappuccino', price: 3.99, quantity: 2 },
    ],
    total: 12.97,
    deliveryType: 'pickup',
    paymentMethod: 'Mobile Money',
  },
])

const orderSteps = [
  { status: 'pending', label: 'Order Placed', description: 'Your order has been received' },
  { status: 'confirmed', label: 'Confirmed', description: 'Order confirmed by restaurant' },
  { status: 'preparing', label: 'Preparing', description: 'Your order is being prepared' },
  { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Your order is on the way' },
  { status: 'delivered', label: 'Delivered', description: 'Order delivered successfully' },
]

const statusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800',
    out_for_delivery: 'bg-orange-100 text-orange-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const isStepCompleted = (currentStatus, stepStatus) => {
  const statusOrder = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered']
  const currentIndex = statusOrder.indexOf(currentStatus)
  const stepIndex = statusOrder.indexOf(stepStatus)
  return stepIndex <= currentIndex
}
</script>
