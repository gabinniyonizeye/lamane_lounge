<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-bold mb-4">Write a Review</h3>
    
    <form @submit.prevent="submitReview" class="space-y-4">
      <!-- Star Rating -->
      <div>
        <label class="block text-sm font-medium mb-2">Rating</label>
        <div class="flex gap-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="form.rating = star"
            class="text-3xl transition"
            :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-300'"
          >
            ★
          </button>
        </div>
      </div>

      <!-- Title -->
      <div>
        <label class="block text-sm font-medium mb-2">Title</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="e.g., Amazing coffee!"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        />
      </div>

      <!-- Comment -->
      <div>
        <label class="block text-sm font-medium mb-2">Comment</label>
        <textarea
          v-model="form.comment"
          placeholder="Share your experience..."
          rows="4"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          required
        ></textarea>
      </div>

      <!-- Photo Upload -->
      <div>
        <label class="block text-sm font-medium mb-2">Photo (Optional)</label>
        <input
          type="file"
          @change="handlePhotoUpload"
          accept="image/*"
          class="w-full"
        />
        <img v-if="form.photo" :src="form.photo" class="mt-2 h-32 object-cover rounded" />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50"
      >
        {{ loading ? 'Submitting...' : 'Submit Review' }}
      </button>
    </form>

    <div v-if="message" :class="['mt-4 p-3 rounded', messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  productId: String
})

const emit = defineEmits(['review-submitted'])

const authStore = useAuthStore()
const form = ref({
  rating: 0,
  title: '',
  comment: '',
  photo: null
})
const loading = ref(false)
const message = ref('')
const messageType = ref('success')

const handlePhotoUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      form.value.photo = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submitReview = async () => {
  if (!authStore.user) {
    message.value = 'Please login to submit a review'
    messageType.value = 'error'
    return
  }

  if (form.value.rating === 0) {
    message.value = 'Please select a rating'
    messageType.value = 'error'
    return
  }

  loading.value = true
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        productId: props.productId,
        rating: form.value.rating,
        title: form.value.title,
        comment: form.value.comment,
        photo: form.value.photo
      })
    })

    if (response.ok) {
      message.value = 'Review submitted! Awaiting approval.'
      messageType.value = 'success'
      form.value = { rating: 0, title: '', comment: '', photo: null }
      emit('review-submitted')
    } else {
      message.value = 'Failed to submit review'
      messageType.value = 'error'
    }
  } catch (error) {
    message.value = error.message
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>
