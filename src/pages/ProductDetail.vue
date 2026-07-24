<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container py-8">
      <!-- Breadcrumb -->
      <div class="mb-8 text-sm text-gray-600">
        <router-link to="/" class="hover:text-primary">Home</router-link>
        <span class="mx-2">/</span>
        <router-link to="/shop" class="hover:text-primary">Shop</router-link>
        <span class="mx-2">/</span>
        <span>{{ product?.name }}</span>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <!-- Image Gallery -->
        <div>
          <div class="bg-white rounded-lg overflow-hidden mb-4">
            <img
              :src="product.image || 'https://via.placeholder.com/500x500?text=Product'"
              :alt="product.name"
              class="w-full h-96 object-cover"
            />
          </div>
          <div class="grid grid-cols-4 gap-2">
            <div class="bg-white rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary">
              <img
                :src="product.image || 'https://via.placeholder.com/100x100?text=Product'"
                :alt="product.name"
                class="w-full h-24 object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h1 class="text-4xl font-bold text-dark mb-2">{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-2 mb-4">
            <div class="flex text-accent">
              <span v-for="i in 5" :key="i" class="text-lg">
                {{ i <= Math.round(product.rating || 4) ? '★' : '☆' }}
              </span>
            </div>
            <span class="text-gray-600">({{ product.reviews || 0 }} reviews)</span>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <span class="text-4xl font-bold text-primary">{{ product.price.toLocaleString() }} RWF</span>
            <span v-if="product.originalPrice" class="text-lg text-gray-500 line-through ml-4">
              {{ product.originalPrice.toLocaleString() }} RWF
            </span>
          </div>

          <!-- Availability -->
          <div class="mb-6">
            <span v-if="product.availability" class="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              ✓ In Stock
            </span>
            <span v-else class="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-700 mb-6">{{ product.description }}</p>

          <!-- Ingredients -->
          <div v-if="product.ingredients && product.ingredients.length > 0" class="mb-6">
            <h3 class="font-bold text-dark mb-3">Ingredients</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="ingredient in product.ingredients" :key="ingredient" class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                {{ ingredient }}
              </span>
            </div>
          </div>

          <!-- Quantity Selector & Add to Cart -->
          <div class="flex gap-4 mb-8">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="px-4 py-2 hover:bg-gray-100"
              >
                −
              </button>
              <input
                v-model.number="quantity"
                type="number"
                min="1"
                class="w-16 text-center border-l border-r border-gray-300 py-2 focus:outline-none"
              />
              <button
                @click="quantity = quantity + 1"
                class="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              @click="addToCart"
              :disabled="!product.availability"
              class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button
              @click="toggleWishlist"
              :class="['px-6 py-2 rounded-lg border-2 transition', inWishlist ? 'bg-red-100 border-red-500 text-red-600' : 'border-gray-300 text-gray-600 hover:border-red-500']"
            >
              {{ inWishlist ? '❤️ Saved' : '🤍 Save' }}
            </button>
          </div>

          <!-- Share -->
          <div class="flex gap-4 pt-6 border-t">
            <button class="flex items-center gap-2 text-gray-600 hover:text-primary">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div v-if="product" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div class="lg:col-span-2">
          <ReviewList :productId="product._id" />
          <div class="mt-8">
            <ReviewForm :productId="product._id" />
          </div>
        </div>
      </div>

      <!-- Recommended Products -->
      <div v-if="recommendedProducts.length > 0" class="mb-16">
        <h2 class="text-2xl font-bold text-dark mb-6">You Might Also Like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="rec in recommendedProducts"
            :key="rec._id"
            :product="rec"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import ProductCard from '@/components/ui/ProductCard.vue'
import ReviewList from '@/components/ReviewList.vue'
import ReviewForm from '@/components/ReviewForm.vue'
import apiClient from '@/utils/api'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const product = ref(null)
const loading = ref(false)
const quantity = ref(1)
const inWishlist = ref(false)

onMounted(async () => {
  loading.value = true
  const productId = route.params.id
  product.value = await productStore.getProductById(productId)
  if (authStore.user) {
    checkWishlist(productId)
  }
  loading.value = false
})

const checkWishlist = async (productId) => {
  try {
    const response = await apiClient.get(`/wishlist/check/${productId}`)
    inWishlist.value = response.data.inWishlist
  } catch (error) {
    console.error('Failed to check wishlist:', error)
  }
}

const toggleWishlist = async () => {
  if (!authStore.user) {
    alert('Please login to save items')
    return
  }

  try {
    const endpoint = inWishlist.value ? '/wishlist/remove' : '/wishlist/add'
    await apiClient.post(endpoint, { productId: product.value._id })
    inWishlist.value = !inWishlist.value
  } catch (error) {
    console.error('Failed to toggle wishlist:', error)
  }
}

const recommendedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(p => p._id !== product.value._id && p.category === product.value.category)
    .slice(0, 4)
})

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value)
    quantity.value = 1
  }
}

</script>
