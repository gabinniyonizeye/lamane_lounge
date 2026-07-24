<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="container py-12">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-5xl font-bold text-dark mb-2">Our Menu</h1>
            <p class="text-lg text-gray-600">Discover our delicious selection of freshly baked goods and premium coffee</p>
          </div>
          <div class="hidden lg:block text-right">
            <p class="text-sm text-gray-500 mb-2">Total Items</p>
            <p class="text-3xl font-bold text-primary">{{ filteredProducts.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 sticky top-24 shadow-sm border border-slate-200">
            <!-- Search -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-dark mb-3">🔍 Search</label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Find your favorite..."
                class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <!-- Category Filter -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-dark mb-4">📂 Category</label>
              <div class="space-y-2">
                <label class="flex items-center p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                  <input
                    v-model="selectedCategory"
                    type="radio"
                    value=""
                    class="w-4 h-4 text-primary"
                  />
                  <span class="ml-3 text-sm text-gray-700 font-medium">All Items</span>
                </label>
                <label v-for="cat in categories" :key="cat" class="flex items-center p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                  <input
                    v-model="selectedCategory"
                    type="radio"
                    :value="cat"
                    class="w-4 h-4 text-primary"
                  />
                  <span class="ml-3 text-sm text-gray-700 font-medium capitalize">{{ cat }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-dark mb-4">💰 Price Range</label>
              <div class="space-y-3">
                <div>
                  <input
                    v-model.number="priceRange[0]"
                    type="range"
                    min="0"
                    max="50000"
                    class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p class="text-xs text-gray-600 mt-1">Min: {{ priceRange[0].toLocaleString() }} RWF</p>
                </div>
                <div>
                  <input
                    v-model.number="priceRange[1]"
                    type="range"
                    min="0"
                    max="50000"
                    class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p class="text-xs text-gray-600 mt-1">Max: {{ priceRange[1].toLocaleString() }} RWF</p>
                </div>
              </div>
            </div>

            <!-- Sort -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-dark mb-3">⭐ Sort By</label>
              <select
                v-model="sortBy"
                class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>

            <!-- Availability -->
            <div class="pt-6 border-t border-slate-200">
              <label class="flex items-center p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition">
                <input
                  v-model="showAvailableOnly"
                  type="checkbox"
                  class="w-4 h-4 text-primary rounded"
                />
                <span class="ml-3 text-sm text-gray-700 font-medium">Available Only</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-3">
          <!-- Results Info -->
          <div class="mb-8 flex justify-between items-center">
            <div>
              <p class="text-gray-600">
                Showing <span class="font-bold text-dark">{{ filteredProducts.length }}</span> items
              </p>
            </div>
            <div class="text-sm text-gray-500">
              {{ filteredProducts.length }} results found
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-20">
            <div class="inline-block animate-spin">
              <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-else-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product._id"
              :product="product"
              @add-to-cart="handleAddToCart"
            />
          </div>

          <!-- No Products -->
          <div v-else class="text-center py-20">
            <svg class="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="text-gray-500 text-xl font-semibold mb-2">No items found</p>
            <p class="text-gray-400">Try adjusting your filters</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-12">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            <div class="flex gap-1">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-lg transition',
                  currentPage === page
                    ? 'bg-primary text-white font-semibold'
                    : 'border border-slate-300 hover:bg-slate-100'
                ]"
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
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
const priceRange = ref([0, 50000])
const showAvailableOnly = ref(false)
const currentPage = ref(1)
const itemsPerPage = 12

const categories = ['coffee', 'snacks', 'breakfast', 'burgers', 'pizza', 'desserts', 'drinks']

onMounted(async () => {
  searchQuery.value = route.query.search || ''
  loading.value = true
  await productStore.fetchProducts()
  loading.value = false
})

watch([searchQuery, selectedCategory, priceRange, showAvailableOnly], () => { currentPage.value = 1 }, { deep: true })

const filteredProducts = computed(() => {
  let filtered = productStore.products

  if (searchQuery.value) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(p => {
      const categoryName = typeof p.category === 'object' && p.category?.name 
        ? p.category.name 
        : p.category
      return categoryName === selectedCategory.value
    })
  }

  filtered = filtered.filter(p =>
    p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  )

  if (showAvailableOnly.value) {
    filtered = filtered.filter(p => p.availability === true)
  }

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
