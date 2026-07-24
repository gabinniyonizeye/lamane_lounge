<template>
  <div class="space-y-6">
    <!-- Customers Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2 text-left">Phone</th>
            <th class="px-4 py-2 text-left">Orders</th>
            <th class="px-4 py-2 text-left">Total Spent</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer._id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2 font-semibold">{{ customer.name }}</td>
            <td class="px-4 py-2">{{ customer.email }}</td>
            <td class="px-4 py-2">{{ customer.phone }}</td>
            <td class="px-4 py-2">0</td>
            <td class="px-4 py-2 font-bold">0 RWF</td>
            <td class="px-4 py-2">
              <button
                @click="viewCustomer(customer)"
                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                View
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
const customers = ref([])

const fetchCustomers = async () => {
  try {
    const response = await fetch('/api/admin/customers', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      customers.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch customers:', error)
  }
}

const viewCustomer = (customer) => {
  alert(`Customer: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}`)
}

onMounted(() => {
  fetchCustomers()
})
</script>
