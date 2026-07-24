<template>
  <div class="space-y-6">
    <!-- Add Location Button -->
    <div class="flex justify-between items-center">
      <h3 class="text-2xl font-bold">Store Locations</h3>
      <button
        @click="showForm = !showForm"
        class="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700"
      >
        {{ showForm ? 'Cancel' : '+ Add Location' }}
      </button>
    </div>

    <!-- Add Location Form -->
    <div v-if="showForm" class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="saveLocation" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            v-model="form.name"
            type="text"
            placeholder="Location Name"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <input
            v-model="form.address"
            type="text"
            placeholder="Address"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <input
            v-model="form.phone"
            type="tel"
            placeholder="Phone"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <input
            v-model.number="form.latitude"
            type="number"
            placeholder="Latitude"
            step="0.0001"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <input
            v-model.number="form.longitude"
            type="number"
            placeholder="Longitude"
            step="0.0001"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <label class="flex items-center gap-2">
          <input v-model="form.isMainBranch" type="checkbox" />
          <span>Main Branch</span>
        </label>
        <button
          type="submit"
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Create Location
        </button>
      </form>
    </div>

    <!-- Locations Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Address</th>
            <th class="px-4 py-2 text-left">Phone</th>
            <th class="px-4 py-2 text-left">Type</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in locations" :key="location._id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2 font-semibold">{{ location.name }}</td>
            <td class="px-4 py-2">{{ location.address }}</td>
            <td class="px-4 py-2">{{ location.phone }}</td>
            <td class="px-4 py-2">
              <span v-if="location.isMainBranch" class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                Main Branch
              </span>
              <span v-else class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                Branch
              </span>
            </td>
            <td class="px-4 py-2 space-x-2">
              <button
                @click="deleteLocation(location._id)"
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
const locations = ref([])
const form = ref({
  name: '',
  address: '',
  phone: '',
  email: '',
  latitude: 0,
  longitude: 0,
  isMainBranch: false
})

const fetchLocations = async () => {
  try {
    const response = await fetch('/api/locations', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      locations.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch locations:', error)
  }
}

const saveLocation = async () => {
  try {
    const response = await fetch('/api/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      fetchLocations()
      form.value = { name: '', address: '', phone: '', email: '', latitude: 0, longitude: 0, isMainBranch: false }
      showForm.value = false
    }
  } catch (error) {
    console.error('Failed to save location:', error)
  }
}

const deleteLocation = async (id) => {
  if (!confirm('Are you sure?')) return
  
  try {
    const response = await fetch(`/api/locations/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      fetchLocations()
    }
  } catch (error) {
    console.error('Failed to delete location:', error)
  }
}

onMounted(() => {
  fetchLocations()
})
</script>
