<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold mb-4">Customer Reviews ({{ reviews.length }})</h3>
    
    <div v-if="reviews.length === 0" class="text-gray-500 text-center py-8">
      No reviews yet. Be the first to review!
    </div>

    <div v-else class="space-y-4">
      <div v-for="review in reviews" :key="review._id" class="border-b pb-4">
        <!-- Header -->
        <div class="flex justify-between items-start mb-2">
          <div>
            <div class="flex gap-1">
              <span v-for="star in 5" :key="star" class="text-lg" :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
            </div>
            <p class="font-semibold mt-1">{{ review.title }}</p>
            <p class="text-sm text-gray-500">by {{ review.userId.name }} • {{ formatDate(review.createdAt) }}</p>
          </div>
        </div>

        <!-- Comment -->
        <p class="text-gray-700 mb-3">{{ review.comment }}</p>

        <!-- Photo -->
        <img v-if="review.photo" :src="review.photo" class="h-32 object-cover rounded mb-3" />

        <!-- Helpful -->
        <button
          @click="markHelpful(review._id)"
          class="text-sm text-amber-600 hover:text-amber-700"
        >
          👍 Helpful ({{ review.helpful }})
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  productId: String
})

const reviews = ref([])
const loading = ref(false)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const fetchReviews = async () => {
  loading.value = true
  try {
    const response = await fetch(`/api/reviews/product/${props.productId}`)
    if (response.ok) {
      reviews.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
  } finally {
    loading.value = false
  }
}

const markHelpful = async (reviewId) => {
  try {
    await fetch(`/api/reviews/${reviewId}/helpful`, {
      method: 'PATCH'
    })
    fetchReviews()
  } catch (error) {
    console.error('Failed to mark helpful:', error)
  }
}

onMounted(() => {
  fetchReviews()
})
</script>
