<template>
  <div class="min-h-screen bg-white py-12">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-4xl font-bold mb-8 text-gray-900">My Wishlist</h1>

      <div v-if="wishlist.products?.length === 0" class="text-center py-12">
        <p class="text-gray-600 mb-4">Your wishlist is empty</p>
        <router-link to="/shop" class="text-amber-600 hover:text-amber-700 font-semibold transition">
          Continue Shopping
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in wishlist.products" :key="item.productId._id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-200">
          <!-- Image -->
          <img
            :src="item.productId.image"
            :alt="item.productId.name"
            class="w-full h-48 object-cover"
          />

          <!-- Content -->
          <div class="p-4">
            <h3 class="font-semibold mb-2 text-gray-900">{{ item.productId.name }}</h3>
            <p class="text-gray-600 text-sm mb-3">{{ item.productId.description }}</p>

            <!-- Price -->
            <p class="text-2xl font-bold text-amber-600 mb-4">
              {{ item.productId.price.toLocaleString() }} RWF
            </p>

            <!-- Actions -->
            <div class="flex gap-2">
              <button
                @click="addToCart(item.productId)"
                class="flex-1 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition font-semibold"
              >
                Add to Cart
              </button>
              <button
                @click="removeFromWishlist(item.productId._id)"
                class="flex-1 bg-red-100 text-red-600 py-2 rounded hover:bg-red-200 transition font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import apiClient from '@/utils/api'

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlist = ref({ products: [] })

const fetchWishlist = async () => {
  try {
    const response = await apiClient.get('/wishlist')
    wishlist.value = response.data
  } catch (error) {
    console.error('Failed to fetch wishlist:', error)
  }
}

const removeFromWishlist = async (productId) => {
  try {
    await apiClient.post('/wishlist/remove', { productId })
    fetchWishlist()
  } catch (error) {
    console.error('Failed to remove from wishlist:', error)
  }
}

const addToCart = (product) => {
  cartStore.addItem(product)
}

onMounted(() => {
  if (authStore.user) {
    fetchWishlist()
  }
})
</script>
