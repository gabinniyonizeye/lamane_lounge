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
        <h1 class="text-4xl font-bold text-green-600 mb-2">Custom Cake Order Confirmed!</h1>
        <p class="text-xl text-gray-600">Your delicious custom cake is being prepared</p>
      </div>
    </div>

    <div class="container py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Order ID -->
          <div class="bg-white rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-dark mb-4">Order Details</h2>
            
            <div class="bg-gray-50 rounded-lg p-6 mb-6">
              <p class="text-sm text-gray-600 mb-2">Order ID</p>
              <p class="text-3xl font-bold text-primary">{{ orderId }}</p>
              <p class="text-sm text-gray-600 mt-2">{{ orderDate }}</p>
            </div>

            <!-- Cake Specifications -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">🎂 Your Custom Cake</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Size</span>
                  <span class="font-semibold text-dark">6" Cake (8-10 servings)</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Flavor</span>
                  <span class="font-semibold text-dark">Vanilla</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Filling</span>
                  <span class="font-semibold text-dark">Buttercream</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Color</span>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full" style="background-color: #FFB6C1;"></div>
                    <span class="font-semibold text-dark">Light Pink</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Message</span>
                  <span class="font-semibold text-dark">Happy Birthday!</span>
                </div>
              </div>
            </div>

            <!-- Pickup Information -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">📅 Pickup Information</h3>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-gray-600">Pickup Date</p>
                  <p class="font-semibold text-dark">December 20, 2024</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Pickup Time</p>
                  <p class="font-semibold text-dark">2:00 PM</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Status</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span class="font-semibold text-dark">Pending Confirmation</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- What's Next -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">What's Next?</h3>
              <div class="space-y-4">
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">Order Confirmation</p>
                    <p class="text-sm text-gray-600">We'll confirm your order within 2 hours</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-gray-300 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">Cake Preparation</p>
                    <p class="text-sm text-gray-600">Our pastry chef will create your custom cake</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-8 w-8 rounded-full bg-gray-300 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-dark">Ready for Pickup</p>
                    <p class="text-sm text-gray-600">Your cake will be ready at the scheduled time</p>
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
                  <p class="text-sm text-gray-600">We've sent details to {{ email }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <router-link to="/shop" class="btn-primary flex-1 text-center">
              Continue Shopping
            </router-link>
            <router-link to="/" class="btn-outline flex-1 text-center">
              Back to Home
            </router-link>
          </div>
        </div>

        <!-- Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-dark mb-6">Order Summary</h3>

            <div class="space-y-4 mb-6 pb-6 border-b">
              <div class="flex justify-between text-sm">
                <span>Base Price</span>
                <span class="font-semibold">25,000 RWF</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Filling</span>
                <span class="font-semibold">0 RWF</span>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-xl font-bold text-dark border-t pt-3">
                <span>Total</span>
                <span>25,000 RWF</span>
              </div>
            </div>

            <!-- Important Info -->
            <div class="mt-6 pt-6 border-t">
              <p class="text-sm font-semibold text-dark mb-3">Important Information</p>
              <ul class="text-xs text-gray-600 space-y-2">
                <li>✓ Please arrive on time for pickup</li>
                <li>✓ Cake should be consumed within 3 days</li>
                <li>✓ Store in cool, dry place</li>
                <li>✓ Refrigerate if needed</li>
              </ul>
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

const orderId = ref(route.params.orderId || 'CAKE-' + Date.now())
const email = ref(route.query.email || 'customer@example.com')
const orderDate = ref(new Date().toLocaleString())

onMounted(() => {
  console.log('Cake order confirmed:', orderId.value)
})
</script>
