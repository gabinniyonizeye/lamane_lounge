<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <!-- Header -->
    <div class="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-black border-b border-gray-200 dark:border-amber-500/20">
      <div class="container py-8">
        <h1 class="text-4xl font-black text-gray-900 dark:text-white">Custom Cake Builder</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Design your perfect cake</p>
      </div>
    </div>

    <div class="container py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Progress Steps -->
          <div class="mb-8">
            <div class="flex justify-between mb-8">
              <div v-for="(step, index) in steps" :key="index" class="flex-1">
                <div class="flex items-center">
                  <div
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center font-bold text-white',
                      currentStep > index ? 'bg-green-500' : currentStep === index ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-700'
                    ]"
                  >
                    {{ index + 1 }}
                  </div>
                  <div v-if="index < steps.length - 1" :class="['flex-1 h-1 mx-2', currentStep > index ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700']" />
                </div>
                <p class="text-xs font-semibold text-gray-900 dark:text-white mt-2 text-center">{{ step }}</p>
              </div>
            </div>
          </div>

          <!-- Step 1: Size -->
          <div v-if="currentStep === 0" class="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-amber-500/20">
            <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-6">Select Cake Size</h2>
            
            <form @submit.prevent="nextStep" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <label v-for="size in sizes" :key="size.id" class="border-2 rounded-lg p-4 cursor-pointer bg-white dark:bg-gray-800" :class="form.size === size.id ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-500/10' : 'border-gray-300 dark:border-gray-700'">
                  <input v-model="form.size" type="radio" :value="size.id" class="w-4 h-4 text-amber-600" />
                  <p class="font-semibold text-gray-900 dark:text-white mt-2">{{ size.name }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ size.servings }} servings</p>
                  <p class="text-lg font-bold text-amber-600 dark:text-amber-400 mt-2">{{ size.price.toLocaleString() }} RWF</p>
                </label>
              </div>

              <div class="flex gap-4 pt-6">
                <button type="submit" class="btn-primary flex-1">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <!-- Step 2: Flavor -->
          <div v-if="currentStep === 1" class="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-amber-500/20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Flavor</h2>
            
            <form @submit.prevent="nextStep" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label v-for="flavor in flavors" :key="flavor.id" class="border-2 rounded-lg p-4 cursor-pointer bg-white dark:bg-gray-800" :class="form.flavor === flavor.id ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-500/10' : 'border-gray-300 dark:border-gray-700'">
                  <input v-model="form.flavor" type="radio" :value="flavor.id" class="w-4 h-4 text-amber-600" />
                  <p class="font-semibold text-gray-900 dark:text-white mt-2">{{ flavor.name }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ flavor.description }}</p>
                </label>
              </div>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" class="btn-primary flex-1">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <!-- Step 3: Filling -->
          <div v-if="currentStep === 2" class="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-amber-500/20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Filling</h2>
            
            <form @submit.prevent="nextStep" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label v-for="filling in fillings" :key="filling.id" class="border-2 rounded-lg p-4 cursor-pointer bg-white dark:bg-gray-800" :class="form.filling === filling.id ? 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-500/10' : 'border-gray-300 dark:border-gray-700'">
                  <input v-model="form.filling" type="radio" :value="filling.id" class="w-4 h-4 text-amber-600" />
                  <p class="font-semibold text-gray-900 dark:text-white mt-2">{{ filling.name }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ filling.description }}</p>
                  <p class="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-2">+{{ filling.price.toLocaleString() }} RWF</p>
                </label>
              </div>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" class="btn-primary flex-1">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <!-- Step 4: Color -->
          <div v-if="currentStep === 3" class="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-amber-500/20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Color</h2>
            
            <form @submit.prevent="nextStep" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-4">Frosting Color</label>
                <div class="flex gap-4 flex-wrap">
                  <label v-for="color in colors" :key="color" class="cursor-pointer">
                    <input v-model="form.color" type="radio" :value="color" class="sr-only" />
                    <div
                      :style="{ backgroundColor: color }"
                      :class="['w-12 h-12 rounded-full border-4', form.color === color ? 'border-gray-900 dark:border-white' : 'border-gray-300 dark:border-gray-700']"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Custom Color</label>
                <input
                  v-model="form.customColor"
                  type="color"
                  class="w-20 h-10 rounded cursor-pointer"
                />
              </div>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" class="btn-primary flex-1">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <!-- Step 5: Message -->
          <div v-if="currentStep === 4" class="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-amber-500/20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Message</h2>
            
            <form @submit.prevent="nextStep" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Message on Cake (Optional)</label>
                <textarea
                  v-model="form.message"
                  maxlength="50"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Happy Birthday!"
                  rows="3"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ form.message.length }}/50 characters</p>
              </div>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" class="btn-primary flex-1">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <!-- Step 6: Inspiration Photo -->
          <div v-if="currentStep === 5" class="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-amber-500/20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload Inspiration Photo</h2>
            
            <form @submit.prevent="nextStep" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Reference Photo (Optional)</label>
                <div class="border-2 border-dashed border-gray-300 dark:border-amber-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-amber-500 dark:hover:border-amber-400 transition bg-gray-50 dark:bg-gray-800">
                  <svg class="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">PNG, JPG up to 5MB</p>
                  <input type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
                </div>
                <p v-if="form.inspirationPhoto" class="text-sm text-green-600 dark:text-green-400 mt-2">✓ Photo uploaded</p>
              </div>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" class="btn-primary flex-1">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <!-- Step 7: Pickup Date/Time -->
          <div v-if="currentStep === 6" class="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-amber-500/20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pickup Date & Time</h2>
            
            <form @submit.prevent="nextStep" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Pickup Date *</label>
                <input
                  v-model="form.pickupDate"
                  type="date"
                  :min="minDate"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Pickup Time *</label>
                <select
                  v-model="form.pickupTime"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select time</option>
                  <option v-for="time in timeSlots" :key="time" :value="time">
                    {{ time }}
                  </option>
                </select>
              </div>

              <div class="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-4">
                <p class="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Note:</strong> Custom cakes require at least 2 days advance notice.
                </p>
              </div>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" class="btn-primary flex-1">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <!-- Step 8: Contact Information -->
          <div v-if="currentStep === 7" class="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-amber-500/20">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
            
            <form @submit.prevent="submitCake" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Full Name *</label>
                  <input
                    v-model="form.fullName"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Phone Number *</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-2 border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Special Requests</label>
                <textarea
                  v-model="form.specialRequests"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Any special requests or allergies?"
                  rows="3"
                />
              </div>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" :disabled="loading" class="btn-primary flex-1 disabled:opacity-50">
                  {{ loading ? 'Processing...' : 'Place Custom Cake Order' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Price Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-900 rounded-lg p-6 sticky top-24 border border-gray-200 dark:border-amber-500/20">
            <h3 class="text-xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h3>

            <div class="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-amber-500/20">
              <div v-if="form.size" class="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Size</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ getSizeLabel(form.size) }}</span>
              </div>
              <div v-if="form.flavor" class="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Flavor</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ getFlavorLabel(form.flavor) }}</span>
              </div>
              <div v-if="form.filling" class="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Filling</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ getFillingLabel(form.filling) }}</span>
              </div>
              <div v-if="form.pickupDate" class="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                <span>Pickup</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ form.pickupDate }}</span>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Base Price</span>
                <span class="text-gray-900 dark:text-white">{{ basePrice.toLocaleString() }} RWF</span>
              </div>
              <div v-if="fillingPrice > 0" class="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Filling</span>
                <span class="text-gray-900 dark:text-white">+{{ fillingPrice.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-xl font-black text-gray-900 dark:text-white border-t border-gray-200 dark:border-amber-500/20 pt-3">
                <span>Total</span>
                <span class="text-amber-600 dark:text-amber-400">{{ totalPrice.toLocaleString() }} RWF</span>
              </div>
            </div>

            <!-- Progress -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-amber-500/20">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Progress</p>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  class="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all"
                  :style="{ width: `${(currentStep + 1) / steps.length * 100}%` }"
                />
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Step {{ currentStep + 1 }} of {{ steps.length }}</p>
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

const router = useRouter()
const currentStep = ref(0)
const loading = ref(false)

const steps = ['Size', 'Flavor', 'Filling', 'Color', 'Message', 'Photo', 'Date/Time', 'Contact']

const sizes = [
  { id: '6', name: '6" Cake', servings: '8-10', price: 25000 },
  { id: '8', name: '8" Cake', servings: '12-15', price: 35000 },
  { id: '10', name: '10" Cake', servings: '20-25', price: 45000 },
  { id: '12', name: '12" Cake', servings: '30-40', price: 55000 },
]

const flavors = [
  { id: 'vanilla', name: 'Vanilla', description: 'Classic vanilla cake' },
  { id: 'chocolate', name: 'Chocolate', description: 'Rich chocolate cake' },
  { id: 'strawberry', name: 'Strawberry', description: 'Fresh strawberry cake' },
  { id: 'redvelvet', name: 'Red Velvet', description: 'Elegant red velvet' },
  { id: 'carrot', name: 'Carrot', description: 'Moist carrot cake' },
]

const fillings = [
  { id: 'buttercream', name: 'Buttercream', description: 'Classic buttercream', price: 0 },
  { id: 'creamcheese', name: 'Cream Cheese', description: 'Tangy cream cheese', price: 3000 },
  { id: 'ganache', name: 'Ganache', description: 'Rich chocolate ganache', price: 5000 },
  { id: 'fruit', name: 'Fruit', description: 'Fresh fruit filling', price: 4000 },
]

const colors = ['#FFFFFF', '#FFB6C1', '#FFD700', '#87CEEB', '#DDA0DD', '#F08080', '#98D8C8']

const form = ref({
  size: '',
  flavor: '',
  filling: '',
  color: '#FFFFFF',
  customColor: '#FFFFFF',
  message: '',
  inspirationPhoto: null,
  pickupDate: '',
  pickupTime: '',
  fullName: '',
  phone: '',
  email: '',
  specialRequests: '',
})

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

const minDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  return date.toISOString().split('T')[0]
})

const basePrice = computed(() => {
  const size = sizes.find(s => s.id === form.value.size)
  return size ? size.price : 0
})

const fillingPrice = computed(() => {
  const filling = fillings.find(f => f.id === form.value.filling)
  return filling ? filling.price : 0
})

const totalPrice = computed(() => {
  return basePrice.value + fillingPrice.value
})

const getSizeLabel = (id) => {
  const size = sizes.find(s => s.id === id)
  return size ? size.name : ''
}

const getFlavorLabel = (id) => {
  const flavor = flavors.find(f => f.id === id)
  return flavor ? flavor.name : ''
}

const getFillingLabel = (id) => {
  const filling = fillings.find(f => f.id === id)
  return filling ? filling.name : ''
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.inspirationPhoto = file
  }
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const submitCake = async () => {
  loading.value = true
  try {
    const cakeData = {
      _id: Date.now().toString(),
      size: form.value.size,
      flavor: form.value.flavor,
      filling: form.value.filling,
      color: form.value.customColor || form.value.color,
      message: form.value.message,
      pickupDate: form.value.pickupDate,
      pickupTime: form.value.pickupTime,
      totalPrice: totalPrice.value,
      customerInfo: {
        fullName: form.value.fullName,
        email: form.value.email,
        phone: form.value.phone,
      },
      specialRequests: form.value.specialRequests,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('customCakeOrders') || '[]')
    orders.push(cakeData)
    localStorage.setItem('customCakeOrders', JSON.stringify(orders))
    
    router.push({
      name: 'CakeConfirmation',
      params: { orderId: cakeData._id },
      query: { email: form.value.email },
    })
  } catch (error) {
    console.error('Error submitting cake order:', error)
    alert('Error submitting order. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>
