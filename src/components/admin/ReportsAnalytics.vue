<template>
  <div class="space-y-6">
    <h3 class="text-2xl font-bold">Reports & Analytics</h3>
    
    <!-- Report Options -->
    <div class="bg-white rounded-lg shadow p-6 flex gap-4">
      <button
        @click="exportSalesReport"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        📊 Sales Report
      </button>
      <button
        @click="exportCustomerReport"
        class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        👥 Customer Report
      </button>
      <button
        @click="exportProductReport"
        class="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        📦 Product Report
      </button>
    </div>

    <!-- Sales Chart Data -->
    <div class="bg-white rounded-lg shadow p-6">
      <h4 class="text-xl font-bold mb-4">Last 30 Days Sales</h4>
      <div class="space-y-2">
        <div v-for="day in chartData" :key="day._id" class="flex items-center gap-4">
          <span class="w-20">{{ day._id }}</span>
          <div class="flex-1 bg-gray-200 rounded h-8" :style="{ width: (day.revenue / maxRevenue * 100) + '%' }">
            <div class="bg-amber-600 h-full rounded flex items-center justify-end pr-2 text-white text-sm">
              {{ day.revenue.toLocaleString() }} RWF
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const chartData = ref([])

const maxRevenue = computed(() => {
  return Math.max(...chartData.value.map(d => d.revenue), 1)
})

const fetchChartData = async () => {
  try {
    const response = await fetch('/api/admin/sales-chart', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      chartData.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch chart data:', error)
  }
}

const exportSalesReport = () => {
  alert('Sales report exported')
}

const exportCustomerReport = () => {
  alert('Customer report exported')
}

const exportProductReport = () => {
  alert('Product report exported')
}

onMounted(() => {
  fetchChartData()
})
</script>
