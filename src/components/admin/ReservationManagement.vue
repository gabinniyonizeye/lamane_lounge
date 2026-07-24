<template>
  <div class="space-y-6">
    <h3 class="text-2xl font-bold">Reservation Management</h3>
    
    <!-- Reservations Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Date</th>
            <th class="px-4 py-2 text-left">Time</th>
            <th class="px-4 py-2 text-left">Guests</th>
            <th class="px-4 py-2 text-left">Type</th>
            <th class="px-4 py-2 text-left">Status</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation._id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2">{{ formatDate(reservation.date) }}</td>
            <td class="px-4 py-2">{{ reservation.time }}</td>
            <td class="px-4 py-2">{{ reservation.guests }}</td>
            <td class="px-4 py-2">{{ reservation.type }}</td>
            <td class="px-4 py-2">
              <span :class="['px-3 py-1 rounded-full text-sm', statusColor(reservation.status)]">
                {{ reservation.status }}
              </span>
            </td>
            <td class="px-4 py-2 space-x-2">
              <button
                @click="updateStatus(reservation._id, 'confirmed')"
                class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
              >
                Confirm
              </button>
              <button
                @click="updateStatus(reservation._id, 'cancelled')"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Cancel
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
const reservations = ref([])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const statusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

const fetchReservations = async () => {
  try {
    const response = await fetch('/api/reservations', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      reservations.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch reservations:', error)
  }
}

const updateStatus = async (id, status) => {
  try {
    const response = await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ status })
    })
    if (response.ok) {
      fetchReservations()
    }
  } catch (error) {
    console.error('Failed to update reservation:', error)
  }
}

onMounted(() => {
  fetchReservations()
})
</script>
