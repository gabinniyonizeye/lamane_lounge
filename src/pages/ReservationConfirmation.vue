<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Success Message -->
    <div class="bg-green-50 border-b border-green-200">
      <div class="container py-12 text-center">
        <div class="mb-4">
          <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-green-600 mb-2">Reservation Confirmed!</h1>
        <p class="text-xl text-gray-600">We look forward to seeing you</p>
      </div>
    </div>

    <div class="container py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Reservation ID -->
          <div class="bg-white rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-dark mb-4">Reservation Details</h2>
            
            <div class="bg-gray-50 rounded-lg p-6 mb-6">
              <p class="text-sm text-gray-600 mb-2">Reservation ID</p>
              <p class="text-3xl font-bold text-primary">{{ reservationId }}</p>
              <p class="text-sm text-gray-600 mt-2">{{ reservationDate }}</p>
            </div>

            <!-- Reservation Info -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">📅 Your Reservation</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Date</span>
                  <span class="font-semibold text-dark">December 20, 2024</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Time</span>
                  <span class="font-semibold text-dark">6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Number of Guests</span>
                  <span class="font-semibold text-dark">4 Guests</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Type</span>
                  <span class="font-semibold text-dark">Family Gathering</span>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">📍 Location</h3>
              <div class="space-y-2">
                <p class="text-gray-700">LAMANE Bakery & Coffee</p>
                <p class="text-gray-600">123 Baker Street</p>
                <p class="text-gray-600">New York, NY 10001</p>
                <a href="tel:+15551234567" class="text-primary hover:text-secondary font-semibold">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>

            <!-- What to Expect -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">What to Expect</h3>
              <div class="space-y-4">
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">Arrive on Time</p>
                    <p class="text-sm text-gray-600">Please arrive 5-10 minutes early</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">Check In</p>
                    <p class="text-sm text-gray-600">Tell staff your name and reservation ID</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">Enjoy Your Visit</p>
                    <p class="text-sm text-gray-600">Relax and enjoy our delicious food and coffee</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Email Confirmation -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div class="flex gap-4">
                <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="font-semibold text-dark">Confirmation Email Sent</p>
                  <p class="text-sm text-gray-600">We've sent confirmation details to {{ email }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <router-link to="/shop" class="btn-primary flex-1 text-center">
              Browse Menu
            </router-link>
            <router-link to="/" class="btn-outline flex-1 text-center">
              Back to Home
            </router-link>
          </div>
        </div>

        <!-- Info Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-6 sticky top-24 space-y-6">
            <!-- Important Info -->
            <div>
              <h3 class="font-semibold text-dark mb-3">ℹ️ Important Information</h3>
              <ul class="text-xs text-gray-600 space-y-2">
                <li>✓ Reservation held for 15 minutes</li>
                <li>✓ To cancel, call 24 hours before</li>
                <li>✓ Groups of 8+ require deposit</li>
                <li>✓ Private events available</li>
              </ul>
            </div>

            <!-- Cancellation Policy -->
            <div class="border-t pt-6">
              <h3 class="font-semibold text-dark mb-3">❌ Cancellation</h3>
              <p class="text-xs text-gray-600">
                To cancel or modify your reservation, please call us at least 24 hours in advance.
              </p>
              <a href="tel:+15551234567" class="text-primary hover:text-secondary font-semibold text-sm mt-2 inline-block">
                Call +1 (555) 123-4567
              </a>
            </div>

            <!-- Contact -->
            <div class="border-t pt-6 bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-dark mb-3">📞 Contact Us</h3>
              <div class="text-sm space-y-2">
                <p class="text-gray-600">
                  <strong>Phone:</strong><br>
                  <a href="tel:+15551234567" class="text-primary hover:text-secondary">+1 (555) 123-4567</a>
                </p>
                <p class="text-gray-600">
                  <strong>Email:</strong><br>
                  <a href="mailto:info@lamane.com" class="text-primary hover:text-secondary">info@lamane.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const reservationId = ref(route.params.reservationId || 'RES-' + Date.now())
const email = ref(route.query.email || 'customer@example.com')
const reservationDate = ref(new Date().toLocaleString())

onMounted(() => {
  console.log('Reservation confirmed:', reservationId.value)
})
</script>
