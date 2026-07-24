<template>
  <div class="space-y-6">
    <!-- Points Card -->
    <div class="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg shadow-lg p-8">
      <h2 class="text-3xl font-bold mb-2">{{ loyalty.points }} Points</h2>
      <p class="text-amber-100">Tier: <span class="font-bold uppercase">{{ loyalty.tier }}</span></p>
      
      <!-- Progress Bar -->
      <div class="mt-4">
        <div class="bg-amber-800 rounded-full h-3 overflow-hidden">
          <div
            class="bg-yellow-300 h-full transition-all"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <p class="text-sm mt-2">{{ loyalty.totalSpent.toLocaleString() }} RWF spent</p>
      </div>
    </div>

    <!-- Birthday Discount -->
    <div v-if="birthdayEligible" class="bg-pink-50 border-2 border-pink-300 rounded-lg p-4">
      <p class="text-pink-700 font-semibold">🎂 Happy Birthday! Get 20% off today</p>
      <button
        @click="useBirthdayDiscount"
        class="mt-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Apply Discount
      </button>
    </div>

    <!-- Rewards -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-bold mb-4">Available Rewards</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Free Coffee -->
        <div class="border rounded-lg p-4 text-center">
          <p class="text-3xl mb-2">☕</p>
          <p class="font-semibold">Free Coffee</p>
          <p class="text-sm text-gray-600">10 points</p>
          <button
            @click="redeemReward('free_coffee')"
            :disabled="loyalty.points < 10"
            class="mt-3 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 disabled:opacity-50"
          >
            Redeem
          </button>
        </div>

        <!-- 20% Off -->
        <div class="border rounded-lg p-4 text-center">
          <p class="text-3xl mb-2">🏷️</p>
          <p class="font-semibold">20% Off</p>
          <p class="text-sm text-gray-600">25 points</p>
          <button
            @click="redeemReward('discount_20')"
            :disabled="loyalty.points < 25"
            class="mt-3 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 disabled:opacity-50"
          >
            Redeem
          </button>
        </div>

        <!-- Free Cake -->
        <div class="border rounded-lg p-4 text-center">
          <p class="text-3xl mb-2">🎂</p>
          <p class="font-semibold">Free Cake</p>
          <p class="text-sm text-gray-600">50 points</p>
          <button
            @click="redeemReward('free_cake')"
            :disabled="loyalty.points < 50"
            class="mt-3 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 disabled:opacity-50"
          >
            Redeem
          </button>
        </div>
      </div>
    </div>

    <!-- Tier Info -->
    <div class="bg-blue-50 rounded-lg p-4">
      <h4 class="font-semibold mb-2">Tier Benefits</h4>
      <ul class="text-sm space-y-1 text-gray-700">
        <li>🥉 Bronze: 1 point per 100 RWF</li>
        <li>🥈 Silver (200k+ spent): 1.2x points</li>
        <li>🥇 Gold (500k+ spent): 1.5x points + exclusive perks</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const loyalty = ref({
  points: 0,
  totalSpent: 0,
  tier: 'bronze'
})
const birthdayEligible = ref(false)

const progressPercent = computed(() => {
  const tierThresholds = { bronze: 200000, silver: 500000, gold: 1000000 }
  const nextTier = loyalty.value.tier === 'bronze' ? 200000 : loyalty.value.tier === 'silver' ? 500000 : 1000000
  return Math.min((loyalty.value.totalSpent / nextTier) * 100, 100)
})

const fetchLoyalty = async () => {
  try {
    const response = await fetch('/api/loyalty', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      loyalty.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch loyalty:', error)
  }
}

const checkBirthday = async () => {
  try {
    const response = await fetch('/api/loyalty/birthday-check', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      const data = await response.json()
      birthdayEligible.value = data.eligible
    }
  } catch (error) {
    console.error('Failed to check birthday:', error)
  }
}

const redeemReward = async (reward) => {
  try {
    const response = await fetch('/api/loyalty/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ reward })
    })
    if (response.ok) {
      loyalty.value = await response.json()
      alert('Reward redeemed successfully!')
    }
  } catch (error) {
    alert('Failed to redeem reward')
  }
}

const useBirthdayDiscount = async () => {
  try {
    await fetch('/api/loyalty/use-birthday-discount', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    birthdayEligible.value = false
    alert('Birthday discount applied!')
  } catch (error) {
    alert('Failed to apply discount')
  }
}

onMounted(() => {
  fetchLoyalty()
  checkBirthday()
})
</script>
