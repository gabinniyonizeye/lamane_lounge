<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="container py-8">
        <h1 class="text-4xl font-bold text-dark">Checkout</h1>
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
                      currentStep > index ? 'bg-green-500' : currentStep === index ? 'bg-primary' : 'bg-gray-300'
                    ]"
                  >
                    {{ index + 1 }}
                  </div>
                  <div v-if="index < steps.length - 1" :class="['flex-1 h-1 mx-2', currentStep > index ? 'bg-green-500' : 'bg-gray-300']" />
                </div>
                <p class="text-sm font-semibold text-dark mt-2">{{ step }}</p>
              </div>
            </div>
          </div>

          <!-- Step 1: Delivery Information -->
          <div v-if="currentStep === 0" class="bg-white rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-dark mb-6">Delivery Information</h2>
            
            <form @submit.prevent="nextStep" class="space-y-4">
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

              <div>
                <label class="block text-sm font-semibold text-dark mb-2">Street Address *</label>
                <input
                  v-model="form.street"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="123 Main Street"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-dark mb-2">City *</label>
                  <input
                    v-model="form.city"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-dark mb-2">Building/Apt *</label>
                  <input
                    v-model="form.building"
                    type="text"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Apt 4B"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-dark mb-2">Delivery Instructions</label>
                <textarea
                  v-model="form.instructions"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Ring doorbell twice, leave at door"
                  rows="3"
                />
              </div>

              <div class="flex gap-4 pt-6">
                <button type="submit" class="btn-primary flex-1">
                  Continue to Delivery Options
                </button>
              </div>
            </form>
          </div>

          <!-- Step 2: Delivery/Pickup Options -->
          <div v-if="currentStep === 1" class="bg-white rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-dark mb-6">Delivery & Pickup Options</h2>

            <form @submit.prevent="nextStep" class="space-y-6">
              <!-- Delivery Option -->
              <label class="border-2 rounded-lg p-4 cursor-pointer" :class="form.deliveryType === 'delivery' ? 'border-primary bg-primary/5' : 'border-gray-300'">
                <div class="flex items-start gap-4">
                  <input
                    v-model="form.deliveryType"
                    type="radio"
                    value="delivery"
                    class="w-5 h-5 text-primary mt-1"
                  />
                  <div class="flex-1">
                    <p class="font-semibold text-dark">Delivery</p>
                    <p class="text-sm text-gray-600">Get your order delivered to your address</p>
                    <p class="text-sm font-semibold text-primary mt-2">Estimated: 30-45 minutes</p>
                    <p class="text-sm text-green-700 font-semibold">Free delivery</p>
                  </div>
                </div>
              </label>

              <!-- Pickup Option -->
              <label class="border-2 rounded-lg p-4 cursor-pointer" :class="form.deliveryType === 'pickup' ? 'border-primary bg-primary/5' : 'border-gray-300'">
                <div class="flex items-start gap-4">
                  <input
                    v-model="form.deliveryType"
                    type="radio"
                    value="pickup"
                    class="w-5 h-5 text-primary mt-1"
                  />
                  <div class="flex-1">
                    <p class="font-semibold text-dark">Pickup</p>
                    <p class="text-sm text-gray-600">Pick up your order from our store</p>
                    <p class="text-sm font-semibold text-green-600 mt-2">FREE - No delivery fee</p>
                    <p class="text-sm text-gray-600">Estimated: 15-20 minutes</p>
                  </div>
                </div>
              </label>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" class="btn-primary flex-1">
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>

          <!-- Step 3: Payment Method -->
          <div v-if="currentStep === 2" class="bg-white rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-dark mb-6">Payment Method</h2>

            <form @submit.prevent="nextStep" class="space-y-4">
              <!-- Cash on Delivery -->
              <label class="border-2 rounded-lg p-4 cursor-pointer" :class="form.paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-gray-300'">
                <div class="flex items-center gap-4">
                  <input
                    v-model="form.paymentMethod"
                    type="radio"
                    value="cash"
                    class="w-5 h-5 text-primary"
                  />
                  <div>
                    <p class="font-semibold text-dark">💵 Cash on Delivery</p>
                    <p class="text-sm text-gray-600">Pay when your order arrives</p>
                  </div>
                </div>
              </label>

              <!-- Mobile Money -->
              <label class="border-2 rounded-lg p-4 cursor-pointer" :class="form.paymentMethod === 'mobile' ? 'border-primary bg-primary/5' : 'border-gray-300'">
                <div class="flex items-center gap-4">
                  <input
                    v-model="form.paymentMethod"
                    type="radio"
                    value="mobile"
                    class="w-5 h-5 text-primary"
                  />
                  <div>
                    <p class="font-semibold text-dark">📱 Mobile Money</p>
                    <p class="text-sm text-gray-600">MTN, Airtel, or other mobile payment</p>
                  </div>
                </div>
              </label>

              <!-- Credit/Debit Card -->
              <label class="border-2 rounded-lg p-4 cursor-pointer" :class="form.paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-300'">
                <div class="flex items-center gap-4">
                  <input
                    v-model="form.paymentMethod"
                    type="radio"
                    value="card"
                    class="w-5 h-5 text-primary"
                  />
                  <div>
                    <p class="font-semibold text-dark">💳 Credit/Debit Card</p>
                    <p class="text-sm text-gray-600">Visa, Mastercard, or American Express</p>
                  </div>
                </div>
              </label>

              <!-- PayPal -->
              <label class="border-2 rounded-lg p-4 cursor-pointer" :class="form.paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-gray-300'">
                <div class="flex items-center gap-4">
                  <input
                    v-model="form.paymentMethod"
                    type="radio"
                    value="paypal"
                    class="w-5 h-5 text-primary"
                  />
                  <div>
                    <p class="font-semibold text-dark">🅿️ PayPal</p>
                    <p class="text-sm text-gray-600">Fast and secure payment with PayPal</p>
                  </div>
                </div>
              </label>

              <div class="flex gap-4 pt-6">
                <button @click="currentStep--" type="button" class="btn-outline flex-1">
                  Back
                </button>
                <button type="submit" class="btn-primary flex-1">
                  Review Order
                </button>
              </div>
            </form>
          </div>

          <!-- Step 4: Order Summary -->
          <div v-if="currentStep === 3" class="bg-white rounded-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-dark mb-6">Order Summary</h2>

            <!-- Delivery Info -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">Delivery Information</h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-gray-600">Name</p>
                  <p class="font-semibold text-dark">{{ form.fullName }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Phone</p>
                  <p class="font-semibold text-dark">{{ form.phone }}</p>
                </div>
                <div class="col-span-2">
                  <p class="text-gray-600">Address</p>
                  <p class="font-semibold text-dark">{{ form.street }}, {{ form.building }}, {{ form.city }}</p>
                </div>
              </div>
            </div>

            <!-- Delivery Type -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">Delivery Method</h3>
              <p class="text-sm">
                <span class="font-semibold text-dark capitalize">{{ form.deliveryType }}</span>
                <span class="text-gray-600">
                  {{ form.deliveryType === 'delivery' ? '(30-45 minutes)' : '(15-20 minutes)' }}
                </span>
              </p>
            </div>

            <!-- Payment Method -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">Payment Method</h3>
              <p class="text-sm font-semibold text-dark capitalize">
                {{ paymentMethodLabel }}
              </p>
            </div>

            <!-- Items -->
            <div class="mb-8 pb-8 border-b">
              <h3 class="font-semibold text-dark mb-4">Items</h3>
              <div class="space-y-2">
                <div v-for="item in cartStore.items" :key="item._id" class="flex justify-between text-sm">
                  <span>{{ item.name }} x {{ item.quantity }}</span>
                  <span class="font-semibold">{{ (item.price * item.quantity).toLocaleString() }} RWF</span>
                </div>
              </div>
            </div>

            <!-- Price Summary -->
            <div class="space-y-3 mb-8">
              <div class="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{{ cartStore.subtotal.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Delivery Fee</span>
                <span v-if="deliveryFee === 0" class="text-green-600 font-semibold">FREE</span>
                <span v-else>{{ deliveryFee.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-dark border-t pt-3">
                <span>Total</span>
                <span>{{ orderTotal.toLocaleString() }} RWF</span>
              </div>
            </div>

            <div class="flex gap-4">
              <button @click="currentStep--" type="button" class="btn-outline flex-1">
                Back
              </button>
              <button @click="placeOrder" :disabled="loading" class="btn-primary flex-1 disabled:opacity-50">
                {{ loading ? 'Processing...' : 'Place Order' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-dark mb-6">Order Summary</h3>

            <div class="space-y-4 mb-6 pb-6 border-b">
              <div v-for="item in cartStore.items" :key="item._id" class="flex justify-between text-sm">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span class="font-semibold">{{ (item.price * item.quantity).toLocaleString() }} RWF</span>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{{ cartStore.subtotal.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Delivery</span>
                <span v-if="deliveryFee === 0" class="text-green-600 font-semibold">FREE</span>
                <span v-else>{{ deliveryFee.toLocaleString() }} RWF</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-dark border-t pt-3">
                <span>Total</span>
                <span>{{ orderTotal.toLocaleString() }} RWF</span>
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
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const currentStep = ref(0)
const loading = ref(false)

const steps = ['Delivery Info', 'Delivery Options', 'Payment', 'Review']

const form = ref({
  fullName: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone: '',
  street: '',
  city: '',
  building: '',
  instructions: '',
  deliveryType: 'delivery',
  paymentMethod: 'cash',
})

const deliveryFee = computed(() => {
  return form.value.deliveryType === 'pickup' ? 0 : 5
})

const orderTotal = computed(() => {
  return cartStore.subtotal + deliveryFee.value
})

const paymentMethodLabel = computed(() => {
  const methods = {
    cash: 'Cash on Delivery',
    mobile: 'Mobile Money',
    card: 'Credit/Debit Card',
    paypal: 'PayPal',
  }
  return methods[form.value.paymentMethod]
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const placeOrder = async () => {
  loading.value = true
  try {
    const orderData = {
      _id: Date.now().toString(),
      items: cartStore.items,
      total: orderTotal.value,
      status: 'pending',
      paymentMethod: form.value.paymentMethod,
      deliveryType: form.value.deliveryType,
      deliveryAddress: `${form.value.street}, ${form.value.building}, ${form.value.city}`,
      customerInfo: {
        fullName: form.value.fullName,
        email: form.value.email,
        phone: form.value.phone,
      },
      instructions: form.value.instructions,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(orderData)
    localStorage.setItem('orders', JSON.stringify(orders))

    // Clear cart
    cartStore.clearCart()

    // Redirect to confirmation
    router.push({
      name: 'OrderConfirmation',
      params: { orderId: orderData._id },
      query: {
        email: form.value.email,
        deliveryType: form.value.deliveryType,
      },
    })
  } catch (error) {
    console.error('Error placing order:', error)
    alert('Error placing order. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>
