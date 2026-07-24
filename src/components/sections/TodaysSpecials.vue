<template>
  <section class="py-16 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-gray-900 dark:to-black">
    <div class="container">
      <h2 class="text-4xl font-bold text-center mb-12 text-white">Today's Specials</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div v-for="special in specials" :key="special.id" class="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-amber-500/20">
          <!-- Image -->
          <div class="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <img
              :src="special.image"
              :alt="special.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold">
              {{ special.discount }}% OFF
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{{ special.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ special.description }}</p>

            <!-- Countdown Timer -->
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Offer ends in:</p>
              <div class="flex gap-4 justify-center">
                <div class="text-center">
                  <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ timeLeft.hours }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Hours</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ timeLeft.minutes }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Minutes</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ timeLeft.seconds }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Seconds</div>
                </div>
              </div>
            </div>

            <button class="w-full btn-primary">
              Grab This Deal
            </button>
          </div>
        </div>
      </div>

      <!-- More Specials -->
      <div class="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-amber-500/20">
        <h3 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">More Offers</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="offer in moreOffers" :key="offer.id" class="border-l-4 border-amber-500 pl-4">
            <p class="font-bold text-lg text-gray-900 dark:text-white mb-2">{{ offer.title }}</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ offer.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timeLeft = ref({ hours: 23, minutes: 59, seconds: 59 })

const specials = ref([
  {
    id: 1,
    title: 'Croissant Bundle',
    description: 'Buy 2 Croissants, Get 1 Free',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=300&fit=crop',
    discount: 33,
  },
  {
    id: 2,
    title: 'Coffee Combo',
    description: 'Any 2 Coffees + Free Pastry',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=300&fit=crop',
    discount: 25,
  },
])

const moreOffers = ref([
  {
    id: 1,
    title: '🎂 Custom Cakes',
    description: '20% off on custom cake orders above 50,000 RWF',
  },
  {
    id: 2,
    title: '☕ Loyalty Rewards',
    description: 'Earn 1 point per dollar spent, redeem for free items',
  },
  {
    id: 3,
    title: '🚚 Free Delivery',
    description: 'Free delivery throughout our service area',
  },
])

const updateTimer = () => {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)

  const diff = tomorrow - now
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  timeLeft.value = {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

let interval

onMounted(() => {
  updateTimer()
  interval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
