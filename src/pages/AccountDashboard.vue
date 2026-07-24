<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-4xl font-bold mb-8">My Account</h1>

      <!-- Tabs -->
      <div class="flex gap-4 mb-8 border-b">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="['px-4 py-2 font-semibold border-b-2 transition', activeTab === tab ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-600 hover:text-gray-800']"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'Profile'" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-4">Profile Information</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name</label>
              <p class="text-gray-700">{{ user.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <p class="text-gray-700">{{ user.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Phone</label>
              <p class="text-gray-700">{{ user.phone || 'Not set' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Birthday</label>
              <p class="text-gray-700">{{ user.birthday ? formatDate(user.birthday) : 'Not set' }}</p>
            </div>
          </div>
          <button class="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700">
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
      <div v-if="activeTab === 'Wishlist'" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-4">Saved Items</h2>
        <div v-if="wishlist.products?.length === 0" class="text-gray-500">
          No items in wishlist
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="item in wishlist.products" :key="item.productId._id" class="border rounded-lg p-4">
            <img :src="item.productId.image" :alt="item.productId.name" class="w-full h-32 object-cover rounded mb-2" />
            <p class="font-semibold">{{ item.productId.name }}</p>
            <p class="text-amber-600 font-bold">{{ item.productId.price.toLocaleString() }} RWF</p>
            <button
              @click="removeFromWishlist(item.productId._id)"
              class="mt-2 w-full bg-red-100 text-red-600 py-1 rounded hover:bg-red-200"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Addresses Tab -->
      <div v-if="activeTab === 'Addresses'" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-4">Saved Addresses</h2>
        <div v-if="addresses.length === 0" class="text-gray-500 mb-4">
          No saved addresses
        </div>
        <div v-else class="space-y-3 mb-4">
          <div v-for="(addr, idx) in addresses" :key="idx" class="border rounded-lg p-3">
            <p class="font-semibold">{{ addr.label }}</p>
            <p class="text-sm text-gray-600">{{ addr.address }}</p>
          </div>
        </div>
        <button class="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700">
          Add Address
        </button>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'Settings'" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-4">Account Settings</h2>
        <div class="space-y-4">
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="settings.emailNotifications" class="w-4 h-4" />
            <span>Email Notifications</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="settings.smsNotifications" class="w-4 h-4" />
            <span>SMS Notifications</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="settings.newsletter" class="w-4 h-4" />
            <span>Subscribe to Newsletter</span>
          </label>
          <button class="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700">
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
