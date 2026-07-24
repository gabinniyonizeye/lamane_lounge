<template>
  <div class="space-y-6">
    <h3 class="text-2xl font-bold">Store Settings</h3>
    
    <!-- Settings Form -->
    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="saveSettings" class="space-y-6">
        <!-- Store Info -->
        <div>
          <h4 class="text-lg font-bold mb-4">Store Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="form.storeName"
              type="text"
              placeholder="Store Name"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model="form.storeEmail"
              type="email"
              placeholder="Store Email"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model="form.storePhone"
              type="tel"
              placeholder="Store Phone"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model="form.storeAddress"
              type="text"
              placeholder="Store Address"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>

        <!-- Delivery Fees -->
        <div>
          <h4 class="text-lg font-bold mb-4">Delivery Settings</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              v-model.number="form.deliveryFees.standard"
              type="number"
              placeholder="Standard Delivery Fee"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model.number="form.deliveryFees.express"
              type="number"
              placeholder="Express Delivery Fee"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model.number="form.deliveryFees.freeAbove"
              type="number"
              placeholder="Free Delivery Above"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>

        <!-- Tax Settings -->
        <div>
          <h4 class="text-lg font-bold mb-4">Tax Settings</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model.number="form.taxSettings.taxRate"
              type="number"
              placeholder="Tax Rate (%)"
              step="0.01"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model="form.taxSettings.taxId"
              type="text"
              placeholder="Tax ID"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>

        <!-- Payment Settings -->
        <div>
          <h4 class="text-lg font-bold mb-4">Payment Settings</h4>
          <div class="space-y-2">
            <label class="flex items-center gap-2">
              <input v-model="form.paymentSettings.acceptCash" type="checkbox" />
              <span>Accept Cash</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.paymentSettings.acceptCard" type="checkbox" />
              <span>Accept Card</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.paymentSettings.acceptMobilePayment" type="checkbox" />
              <span>Accept Mobile Payment</span>
            </label>
          </div>
        </div>

        <!-- Social Media -->
        <div>
          <h4 class="text-lg font-bold mb-4">Social Media</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="form.socialMedia.facebook"
              type="url"
              placeholder="Facebook URL"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model="form.socialMedia.instagram"
              type="url"
              placeholder="Instagram URL"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model="form.socialMedia.twitter"
              type="url"
              placeholder="Twitter URL"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              v-model="form.socialMedia.whatsapp"
              type="url"
              placeholder="WhatsApp URL"
              class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>

        <button
          type="submit"
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const form = ref({
  storeName: '',
  storeEmail: '',
  storePhone: '',
  storeAddress: '',
  deliveryFees: { standard: 0, express: 0, freeAbove: 0 },
  taxSettings: { taxRate: 0, taxId: '' },
  paymentSettings: { acceptCash: true, acceptCard: true, acceptMobilePayment: false },
  socialMedia: { facebook: '', instagram: '', twitter: '', whatsapp: '' }
})

const fetchSettings = async () => {
  try {
    const response = await fetch('/api/settings')
    if (response.ok) {
      const settings = await response.json()
      form.value = { ...form.value, ...settings }
    }
  } catch (error) {
    console.error('Failed to fetch settings:', error)
  }
}

const saveSettings = async () => {
  try {
    const response = await fetch('/api/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      alert('Settings saved successfully')
    }
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

onMounted(() => {
  fetchSettings()
})
</script>
