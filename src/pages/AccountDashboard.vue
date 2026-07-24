<template>
  <div class="min-h-screen bg-white dark:bg-black py-12">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">My Account</h1>

      <!-- Tabs -->
      <div class="flex gap-4 mb-8 border-b border-gray-200 dark:border-amber-500/20">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="['px-4 py-2 font-semibold border-b-2 transition', activeTab === tab ? 'border-amber-600 dark:border-amber-400 text-amber-600 dark:text-amber-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300']"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'Profile'" class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-amber-500/20">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Profile Information</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Name</label>
              <p class="text-gray-700 dark:text-gray-300">{{ user.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Email</label>
              <p class="text-gray-700 dark:text-gray-300">{{ user.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Phone</label>
              <p class="text-gray-700 dark:text-gray-300">{{ user.phone || 'Not set' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Birthday</label>
              <p class="text-gray-700 dark:text-gray-300">{{ user.birthday ? formatDate(user.birthday) : 'Not set' }}</p>
            </div>
          </div>
          <button class="bg-amber-600 dark:bg-amber-700 text-white px-6 py-2 rounded hover:bg-amber-700 dark:hover:bg-amber-800 transition">
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'Orders'" class="space-y-4">
        <OrderTracking />
      </div>

      <!-- Loyalty Tab -->
      <div v-if="activeTab === 'Loyalty'" class="space-y-4">
        <LoyaltyDashboard />
      </div>

      <!-- Wishlist Tab -->
      <div v-if="activeTab === 'Wishlist'" class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-amber-500/20">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Saved Items</h2>
        <div v-if="wishlist.products?.length === 0" class="text-gray-500 dark:text-gray-400">
          No items in wishlist
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="item in wishlist.products" :key="item.productId._id" class="border border-gray-200 dark:border-amber-500/20 rounded-lg p-4 bg-white dark:bg-gray-800">
            <img :src="item.productId.image" :alt="item.productId.name" class="w-full h-32 object-cover rounded mb-2" />
            <p class="font-semibold text-gray-900 dark:text-white">{{ item.productId.name }}</p>
            <p class="text-amber-600 dark:text-amber-400 font-bold">{{ item.productId.price.toLocaleString() }} RWF</p>
            <button
              @click="removeFromWishlist(item.productId._id)"
              class="mt-2 w-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 py-1 rounded hover:bg-red-200 dark:hover:bg-red-500/30 transition"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Addresses Tab -->
      <div v-if="activeTab === 'Addresses'" class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-amber-500/20">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Saved Addresses</h2>
        <div v-if="addresses.length === 0" class="text-gray-500 dark:text-gray-400 mb-4">
          No saved addresses
        </div>
        <div v-else class="space-y-3 mb-4">
          <div v-for="(addr, idx) in addresses" :key="idx" class="border border-gray-200 dark:border-amber-500/20 rounded-lg p-3 bg-white dark:bg-gray-800">
            <p class="font-semibold text-gray-900 dark:text-white">{{ addr.label }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ addr.address }}</p>
          </div>
        </div>
        <button class="bg-amber-600 dark:bg-amber-700 text-white px-6 py-2 rounded hover:bg-amber-700 dark:hover:bg-amber-800 transition">
          Add Address
        </button>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'Settings'" class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-amber-500/20">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Account Settings</h2>
        <div class="space-y-4">
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="settings.emailNotifications" class="w-4 h-4" />
            <span class="text-gray-900 dark:text-white">Email Notifications</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="settings.smsNotifications" class="w-4 h-4" />
            <span class="text-gray-900 dark:text-white">SMS Notifications</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="settings.newsletter" class="w-4 h-4" />
            <span class="text-gray-900 dark:text-white">Subscribe to Newsletter</span>
          </label>
          <button class="bg-amber-600 dark:bg-amber-700 text-white px-6 py-2 rounded hover:bg-amber-700 dark:hover:bg-amber-800 transition">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import OrderTracking from '../components/OrderTracking.vue'
import LoyaltyDashboard from '../components/LoyaltyDashboard.vue'
import apiClient from '@/utils/api'

const authStore = useAuthStore()
const activeTab = ref('Profile')
const tabs = ['Profile', 'Orders', 'Loyalty', 'Wishlist', 'Addresses', 'Settings']

const user = ref({
  name: '',
  email: '',
  phone: '',
  birthday: null
})

const wishlist = ref({ products: [] })
const addresses = ref([])
const settings = ref({
  emailNotifications: true,
  smsNotifications: false,
  newsletter: true
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const fetchUserData = async () => {
  try {
    const response = await apiClient.get('/auth/me')
    user.value = response.data
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

const fetchWishlist = async () => {
  try {
    const response = await apiClient.get('/wishlist')
    wishlist.value = response.data
  } catch (error) {
    console.error('Failed to fetch wishlist:', error)
  }
}

const removeFromWishlist = async (productId) => {
  try {
    await apiClient.post('/wishlist/remove', { productId })
    fetchWishlist()
  } catch (error) {
    console.error('Failed to remove from wishlist:', error)
  }
}

onMounted(() => {
  if (authStore.user) {
    fetchUserData()
    fetchWishlist()
  }
})
</script>
