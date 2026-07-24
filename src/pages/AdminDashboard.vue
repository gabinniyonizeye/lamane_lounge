<template>
  <div class="flex h-screen bg-black">
    <!-- Premium Sidebar -->
    <div class="w-72 bg-gradient-to-b from-black via-black to-black border-r border-amber-500/20 shadow-2xl">
      <!-- Logo Section -->
      <div class="p-8 border-b border-amber-500/20">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
            <span class="text-black font-black text-xl">L</span>
          </div>
          <div>
            <p class="text-amber-300 font-bold text-sm">LAMANE</p>
            <p class="text-gray-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>
      
      <!-- Navigation -->
      <nav class="mt-8 space-y-2 px-4">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="activeSection = item.id"
          :class="[
            'w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium',
            activeSection === item.id 
              ? 'bg-gradient-to-r from-amber-500/30 to-amber-600/20 text-amber-300 border-l-4 border-amber-400' 
              : 'text-gray-400 hover:text-amber-300 hover:bg-amber-500/10'
          ]"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- User Info -->
      <div class="absolute bottom-0 left-0 right-0 w-72 p-4 border-t border-amber-500/20 bg-gradient-to-t from-black to-transparent">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white font-bold text-sm">{{ user.name }}</p>
            <p class="text-gray-500 text-xs">Administrator</p>
          </div>
          <button @click="logout" class="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400 hover:text-red-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-black via-black to-black border-b border-amber-500/20 shadow-lg">
        <div class="px-8 py-6 flex justify-between items-center">
          <div>
            <h2 class="text-4xl font-black text-white mb-1">{{ currentSectionTitle }}</h2>
            <p class="text-gray-500 text-sm">Manage your business efficiently</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-gray-400 text-sm">Welcome back</p>
              <p class="text-amber-300 font-bold">{{ user.name }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <span class="text-black font-bold">👤</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 overflow-auto bg-black">
        <div class="p-8">
          <!-- Dashboard -->
          <SalesOverview v-if="activeSection === 'dashboard'" @navigate="activeSection = $event" />
          
          <!-- Product Management -->
          <div v-if="activeSection === 'products'" class="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6">📦 Product Management</h3>
            <p class="text-gray-400">Product management features coming soon...</p>
          </div>
          
          <!-- Order Management -->
          <div v-if="activeSection === 'orders'" class="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6">📋 Order Management</h3>
            <p class="text-gray-400">Order management features coming soon...</p>
          </div>
          
          <!-- Customer Management -->
          <div v-if="activeSection === 'customers'" class="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6">👥 Customer Management</h3>
            <p class="text-gray-400">Customer management features coming soon...</p>
          </div>
          
          <!-- Promotions -->
          <div v-if="activeSection === 'promotions'" class="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6">🎁 Promotions Management</h3>
            <p class="text-gray-400">Promotions management features coming soon...</p>
          </div>
          
          <!-- Reservations -->
          <div v-if="activeSection === 'reservations'" class="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6">📅 Reservations</h3>
            <p class="text-gray-400">Reservations management features coming soon...</p>
          </div>
          
          <!-- Reports -->
          <div v-if="activeSection === 'reports'" class="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6">📈 Reports & Analytics</h3>
            <p class="text-gray-400">Reports and analytics features coming soon...</p>
          </div>
          
          <!-- Store Locations -->
          <div v-if="activeSection === 'locations'" class="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6">📍 Store Locations</h3>
            <p class="text-gray-400">Store locations management features coming soon...</p>
          </div>
          
          <!-- Settings -->
          <div v-if="activeSection === 'settings'" class="bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h3 class="text-2xl font-bold text-white mb-6">⚙️ Settings</h3>
            <p class="text-gray-400">Settings features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import SalesOverview from '../components/admin/SalesOverview.vue'

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
