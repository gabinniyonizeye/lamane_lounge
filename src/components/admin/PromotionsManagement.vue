<template>
  <div class="space-y-6">
    <!-- Add Coupon Button -->
    <div class="flex justify-between items-center">
      <h3 class="text-2xl font-bold">Promotions & Coupons</h3>
      <button
        @click="showForm = !showForm"
        class="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700"
      >
        {{ showForm ? 'Cancel' : '+ Add Coupon' }}
      </button>
    </div>

    <!-- Add Coupon Form -->
    <div v-if="showForm" class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="saveCoupon" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            v-model="form.code"
            type="text"
            placeholder="Coupon Code"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <select
            v-model="form.discountType"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
          <input
            v-model.number="form.discountValue"
            type="number"
            placeholder="Discount Value"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <input
            v-model="form.expirationDate"
            type="date"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <input
            v-model.number="form.maxUsage"
            type="number"
            placeholder="Max Usage (leave empty for unlimited)"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <input
            v-model.number="form.minPurchaseAmount"
            type="number"
            placeholder="Minimum Purchase Amount"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <button
          type="submit"
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Create Coupon
        </button>
      </form>
    </div>

    <!-- Coupons Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Code</th>
            <th class="px-4 py-2 text-left">Discount</th>
            <th class="px-4 py-2 text-left">Expiration</th>
            <th class="px-4 py-2 text-left">Usage</th>
            <th class="px-4 py-2 text-left">Status</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon._id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2 font-bold">{{ coupon.code }}</td>
            <td class="px-4 py-2">
              {{ coupon.discountValue }}{{ coupon.discountType === 'percentage' ? '%' : ' RWF' }}
            </td>
            <td class="px-4 py-2">{{ formatDate(coupon.expirationDate) }}</td>
            <td class="px-4 py-2">
              {{ coupon.currentUsage }}{{ coupon.maxUsage ? ` / ${coupon.maxUsage}` : ' / ∞' }}
            </td>
            <td class="px-4 py-2">
              <span :class="['px-3 py-1 rounded-full text-sm', coupon.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
                {{ coupon.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-4 py-2 space-x-2">
              <button
                @click="deleteCoupon(coupon._id)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const showForm = ref(false)
const coupons = ref([])
const form = ref({
  code: '',
  discountType: 'percentage',
  discountValue: 0,
  expirationDate: '',
  maxUsage: null,
  minPurchaseAmount: 0
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const fetchCoupons = async () => {
  try {
    const response = await fetch('/api/coupons', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      coupons.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch coupons:', error)
  }
}

const saveCoupon = async () => {
  try {
    const response = await fetch('/api/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      fetchCoupons()
      form.value = { code: '', discountType: 'percentage', discountValue: 0, expirationDate: '', maxUsage: null, minPurchaseAmount: 0 }
      showForm.value = false
    }
  } catch (error) {
    console.error('Failed to save coupon:', error)
  }
}

const deleteCoupon = async (id) => {
  if (!confirm('Are you sure?')) return
  
  try {
    const response = await fetch(`/api/coupons/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      fetchCoupons()
    }
  } catch (error) {
    console.error('Failed to delete coupon:', error)
  }
}

onMounted(() => {
  fetchCoupons()
})
</script>
