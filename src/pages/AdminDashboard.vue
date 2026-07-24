<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-dark text-white shadow-lg">
      <div class="p-6 border-b border-amber-600">
        <h1 class="text-2xl font-bold">Admin Panel</h1>
      </div>
      
      <nav class="mt-6">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="activeSection = item.id"
          :class="['w-full text-left px-6 py-3 transition', activeSection === item.id ? 'bg-amber-600 border-l-4 border-amber-400' : 'hover:bg-gray-800']"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <div class="bg-white shadow-md p-6 flex justify-between items-center">
        <h2 class="text-3xl font-bold text-dark">{{ currentSectionTitle }}</h2>
        <div class="flex items-center gap-4">
          <span class="text-gray-600">{{ user.name }}</span>
          <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-6">
        <!-- Dashboard -->
        <SalesOverview v-if="activeSection === 'dashboard'" @navigate="activeSection = $event" />
        
        <!-- Product Management -->
        <ProductManagement v-if="activeSection === 'products'" />
        
        <!-- Order Management -->
        <OrderManagement v-if="activeSection === 'orders'" />
        
        <!-- Customer Management -->
        <CustomerManagement v-if="activeSection === 'customers'" />
        
        <!-- Promotions -->
        <PromotionsManagement v-if="activeSection === 'promotions'" />
        
        <!-- Reservations -->
        <ReservationManagement v-if="activeSection === 'reservations'" />
        
        <!-- Reports -->
        <ReportsAnalytics v-if="activeSection === 'reports'" />
        
        <!-- Store Locations -->
        <StoreLocationManagement v-if="activeSection === 'locations'" />
        
        <!-- Settings -->
        <AdminSettings v-if="activeSection === 'settings'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import SalesOverview from '../components/admin/SalesOverview.vue'
import ProductManagement from '../components/admin/ProductManagement.vue'
import OrderManagement from '../components/admin/OrderManagement.vue'
import CustomerManagement from '../components/admin/CustomerManagement.vue'
import PromotionsManagement from '../components/admin/PromotionsManagement.vue'
import ReservationManagement from '../components/admin/ReservationManagement.vue'
import ReportsAnalytics from '../components/admin/ReportsAnalytics.vue'
import StoreLocationManagement from '../components/admin/StoreLocationManagement.vue'
import AdminSettings from '../components/admin/AdminSettings.vue'

const router = useRouter()
const authStore = useAuthStore()
const activeSection = ref('dashboard')

const user = computed(() => authStore.user)

const menuItems = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'products', label: '📦 Products' },
  { id: 'orders', label: '📋 Orders' },
  { id: 'customers', label: '👥 Customers' },
  { id: 'promotions', label: '🎁 Promotions' },
  { id: 'reservations', label: '📅 Reservations' },
  { id: 'reports', label: '📈 Reports' },
  { id: 'locations', label: '📍 Locations' },
  { id: 'settings', label: '⚙️ Settings' }
]

const currentSectionTitle = computed(() => {
  const item = menuItems.find(m => m.id === activeSection.value)
  return item?.label || 'Dashboard'
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
