<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="container py-8">
        <h1 class="text-4xl font-bold text-dark mb-2">Shop</h1>
        <p class="text-gray-600">Browse our delicious selection of freshly baked goods and premium coffee</p>
      </div>
    </div>

    <div class="container py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg p-6 sticky top-24">
            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-bold text-dark mb-2">Search</label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Category Filter -->
            <div class="mb-6">
              <label class="block text-sm font-bold text-dark mb-3">Category</label>
              <div class="space-y-2">
                <label v-for="cat in categories" :key="cat" class="flex items-center">
                  <input
                    v-model="selectedCategory"
                    type="radio"
                    :value="cat"
                    class="w-4 h-4 text-primary"
                  />
                  <span class="ml-2 text-sm text-gray-700 capitalize">{{ cat }}</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="selectedCategory"
                    type="radio"
                    value=""
                    class="w-4 h-4 text-primary"
                  />
                  <span class="ml-2 text-sm text-gray-700">All Categories</span>
                </label>
              </div>
            </div>

            <!-- Sort -->
            <div class="mb-6">
              <label class="block text-sm font-bold text-dark mb-2">Sort By</label>
              <select
                v-model="sortBy"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <label class="block text-sm font-bold text-dark mb-3">Price Range</label>
              <div class="flex gap-2">
                <input
                  v-model.number="priceRange[0]"
                  type="number"
                  placeholder="Min"
                  class="w-1/2 px-2 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  v-model.number="priceRange[1]"
                  type="number"
                  placeholder="Max"
                  class="w-1/2 px-2 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <!-- Availability -->
            <div>
              <label class="flex items-center">
                <input
                  v-model="showAvailableOnly"
                  type="checkbox"
                  class="w-4 h-4 text-primary rounded"
                />
                <span class="ml-2 text-sm text-gray-700">Available Only</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Results Info -->
          <div class="mb-6 flex justify-between items-center">
            <p class="text-gray-600">
              Showing <span class="font-bold">{{ filteredProducts.length }}</span> products
            </p>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-else-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product._id"
              :product="product"
              @add-to-cart="handleAddToCart"
            />
          </div>

          <!-- No Products -->
          <div v-else class="text-center py-12">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="text-gray-500 text-lg">No products found</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center gap-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div class="flex gap-1">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-lg',
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ui/ProductCard.vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()

const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')
const priceRange = ref([0, 100000])
const showAvailableOnly = ref(false)
const currentPage = ref(1)
const itemsPerPage = 12

const categories = ['bread', 'cakes', 'coffee', 'drinks', 'pastries', 'breakfast', 'snacks']

onMounted(async () => {
  searchQuery.value = route.query.search || ''
  loading.value = true
  await productStore.fetchProducts()
  loading.value = false
})

watch([searchQuery, selectedCategory, priceRange, showAvailableOnly], () => { currentPage.value = 1 }, { deep: true })

const filteredProducts = computed(() => {
  let filtered = productStore.products

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Category filter - handle both object and string formats
  if (selectedCategory.value) {
    filtered = filtered.filter(p => {
      const categoryName = typeof p.category === 'object' && p.category?.name 
        ? p.category.name 
        : p.category
      return categoryName === selectedCategory.value
    })
  }

  // Price filter
  filtered = filtered.filter(p =>
    p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  )

  // Availability filter
  if (showAvailableOnly.value) {
    filtered = filtered.filter(p => p.availability === true)
  }

  // Sorting
  if (sortBy.value === 'price-low') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'popularity') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const handleAddToCart = (product) => {
  cartStore.addItem(product, 1)
}
</script>
