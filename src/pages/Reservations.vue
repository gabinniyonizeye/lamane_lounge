<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="container py-8">
        <h1 class="text-4xl font-bold text-dark">Make a Reservation</h1>
        <p class="text-gray-600 mt-2">Reserve a table at LAMANE Bakery & Coffee</p>
      </div>
    </div>

    <div class="container py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg p-8">
            <form @submit.prevent="submitReservation" class="space-y-6">
              <!-- Date -->
              <div>
                <label class="block text-sm font-semibold text-dark mb-2">Reservation Date *</label>
                <input
                  v-model="form.date"
                  type="date"
                  :min="minDate"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <!-- Time -->
              <div>
                <label class="block text-sm font-semibold text-dark mb-2">Time *</label>
                <select
                  v-model="form.time"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select time</option>
                  <option v-for="time in availableTimeSlots" :key="time" :value="time">
                    {{ time }}
                  </option>
                </select>
              </div>

              <!-- Number of Guests -->
              <div>
                <label class="block text-sm font-semibold text-dark mb-2">Number of Guests *</label>
                <select
                  v-model.number="form.guests"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select number</option>
                  <option v-for="n in 20" :key="n" :value="n">{{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}</option>
                </select>
              </div>

              <!-- Reservation Type -->
              <div>
                <label class="block text-sm font-semibold text-dark mb-3">Reservation Type *</label>
                <div class="space-y-2">
                  <label v-for="type in reservationTypes" :key="type.id" class="flex items-center">
                    <input
                      v-model="form.type"
                      type="radio"
                      :value="type.id"
                      class="w-4 h-4 text-primary"
                    />
                    <span class="ml-2 text-gray-700">{{ type.name }}</span>
                  </label>
                </div>
              </div>

              <!-- Name -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-dark mb-2">Full Name *</label>
                  <input
                    v-model="form.fullName"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-dark mb-2">Phone Number *</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-dark mb-2">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="john@example.com"
                />
              </div>

              <!-- Special Requests -->
              <div>
                <label class="block text-sm font-semibold text-dark mb-2">Special Requests</label>
                <textarea
                  v-model="form.specialRequests"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any special requests or dietary requirements?"
                  rows="4"
                />
              </div>

              <!-- Terms -->
              <div class="flex items-start gap-3">
                <input
                  v-model="form.agreeTerms"
                  type="checkbox"
                  class="w-4 h-4 text-primary mt-1"
                  required
                />
                <label class="text-sm text-gray-700">
                  I agree to the reservation terms and conditions
                </label>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full btn-primary disabled:opacity-50"
              >
                {{ loading ? 'Processing...' : 'Confirm Reservation' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Info Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-6 sticky top-24 space-y-6">
            <!-- Hours -->
            <div>
              <h3 class="font-semibold text-dark mb-3">🕐 Hours</h3>
              <div class="text-sm text-gray-600 space-y-1">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 9:00 PM</p>
                <p>Sunday: 10:00 AM - 7:00 PM</p>
              </div>
            </div>

            <!-- Location -->
            <div class="border-t pt-6">
              <h3 class="font-semibold text-dark mb-3">📍 Location</h3>
              <p class="text-sm text-gray-600">
                123 Baker Street<br>
                New York, NY 10001<br>
                <a href="tel:+15551234567" class="text-primary hover:text-secondary">+1 (555) 123-4567</a>
              </p>
            </div>

            <!-- Policies -->
            <div class="border-t pt-6">
              <h3 class="font-semibold text-dark mb-3">📋 Policies</h3>
              <ul class="text-xs text-gray-600 space-y-2">
                <li>✓ Reservations held for 15 minutes</li>
                <li>✓ Cancellations 24 hours notice</li>
                <li>✓ Groups of 8+ require deposit</li>
                <li>✓ Private events available</li>
              </ul>
            </div>

            <!-- Reservation Summary -->
            <div class="border-t pt-6 bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-dark mb-3">Reservation Summary</h3>
              <div class="text-sm space-y-2">
                <div v-if="form.date" class="flex justify-between">
                  <span class="text-gray-600">Date</span>
                  <span class="font-semibold">{{ form.date }}</span>
                </div>
                <div v-if="form.time" class="flex justify-between">
                  <span class="text-gray-600">Time</span>
                  <span class="font-semibold">{{ form.time }}</span>
                </div>
                <div v-if="form.guests" class="flex justify-between">
                  <span class="text-gray-600">Guests</span>
                  <span class="font-semibold">{{ form.guests }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/utils/api'

const router = useRouter()
const loading = ref(false)

const form = ref({
  date: '',
  time: '',
  guests: '',
  type: 'table',
  fullName: '',
  phone: '',
  email: '',
  specialRequests: '',
  agreeTerms: false,
})

const reservationTypes = [
  { id: 'table', name: '🪑 Table' },
  { id: 'birthday', name: '🎂 Birthday Party' },
  { id: 'business', name: '💼 Business Meeting' },
  { id: 'family', name: '👨‍👩‍👧‍👦 Family Gathering' },
]

const availableTimeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
  '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
  '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
]

const minDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
})

const submitReservation = async () => {
  loading.value = true
  try {
    const reservationData = {
      date: form.value.date,
      time: form.value.time,
      guests: form.value.guests,
      type: form.value.type,
      customerInfo: {
        fullName: form.value.fullName,
        email: form.value.email,
        phone: form.value.phone,
      },
      specialRequests: form.value.specialRequests,
    }

    const response = await apiClient.post('/reservations', reservationData)
    const reservationId = response.data._id
    
    router.push({
      name: 'ReservationConfirmation',
      params: { reservationId },
      query: { email: form.value.email },
    })
  } catch (error) {
    console.error('Error submitting reservation:', error)
    alert('Error submitting reservation. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>
