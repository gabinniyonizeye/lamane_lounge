<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
      <div class="container py-16">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h1 class="text-6xl font-black text-gray-900 mb-3">Our Menu</h1>
            <p class="text-lg text-gray-600">Discover premium selections crafted with excellence</p>
          </div>
          <div class="hidden lg:block text-right">
            <p class="text-sm text-gray-500 mb-2">Total Items</p>
            <p class="text-4xl font-black bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">{{ filteredProducts.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-12">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Premium Sidebar Filters -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-6">
            <!-- Search -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-4">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-2xl">🔍</span>
                  <label class="text-sm font-bold text-amber-700">Search</label>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Find your favorite..."
                  class="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                />
              </div>
            </div>

            <!-- Category Filter -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-4">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-2xl">📂</span>
                  <label class="text-sm font-bold text-amber-700">Category</label>
                </div>
                <div class="space-y-2">
                  <label class="flex items-center p-3 rounded-lg hover:bg-amber-100 cursor-pointer transition group/item">
                    <input v-model="selectedCategory" type="radio" value="" class="w-4 h-4 accent-amber-600" />
                    <span class="ml-3 text-sm text-gray-700 group-hover/item:text-amber-700 transition">All Items</span>
                  </label>
                  <label v-for="cat in categories" :key="cat" class="flex items-center p-3 rounded-lg hover:bg-amber-100 cursor-pointer transition group/item">
                    <input v-model="selectedCategory" type="radio" :value="cat" class="w-4 h-4 accent-amber-600" />
                    <span class="ml-3 text-sm text-gray-700 group-hover/item:text-amber-700 transition capitalize">{{ cat }}</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Price Range -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-4">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-2xl">💰</span>
                  <label class="text-sm font-bold text-amber-700">Price Range</label>
                </div>
                <div class="space-y-4">
                  <div>
                    <input v-model.number="priceRange[0]" type="range" min="0" max="50000" class="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
                    <p class="text-xs text-gray-600 mt-2">Min: <span class="text-amber-700 font-bold">{{ priceRange[0].toLocaleString() }}</span> RWF</p>
                  </div>
                  <div>
                    <input v-model.number="priceRange[1]" type="range" min="0" max="50000" class="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
                    <p class="text-xs text-gray-600 mt-2">Max: <span class="text-amber-700 font-bold">{{ priceRange[1].toLocaleString() }}</span> RWF</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sort -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-4">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-2xl">⭐</span>
                  <label class="text-sm font-bold text-amber-700">Sort By</label>
                </div>
                <select v-model="sortBy" class="w-full px-4 py-2 bg-white border border-amber-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition">
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:col-span-4">
          <!-- Results Info -->
          <div class="mb-12 flex justify-between items-center">
            <div>
              <p class="text-gray-600">
                Showing <span class="font-bold text-amber-700">{{ filteredProducts.length }}</span> items
              </p>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-20">
            <div class="inline-block animate-spin">
              <svg class="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-else-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <PremiumProductCard
              v-for="product in paginatedProducts"
              :key="product._id"
              :product="product"
              @add-to-cart="handleAddToCart"
            />
          </div>

          <!-- No Products -->
          <div v-else class="text-center py-20">
            <p class="text-gray-600 text-xl font-semibold mb-2">No items found</p>
            <p class="text-gray-500">Try adjusting your filters</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-12">
            <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 border border-amber-300 rounded-lg hover:bg-amber-50 disabled:opacity-50 transition text-gray-900">
              ← Previous
            </button>
            <div class="flex gap-1">
              <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="['px-3 py-2 rounded-lg transition', currentPage === page ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold' : 'border border-amber-300 hover:bg-amber-50 text-gray-900']">
                {{ page }}
              </button>
            </div>
            <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="px-4 py-2 border border-amber-300 rounded-lg hover:bg-amber-50 disabled:opacity-50 transition text-gray-900">
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
import PremiumProductCard from '@/components/ui/PremiumProductCard.vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()

const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')
const priceRange = ref([0, 50000])
const currentPage = ref(1)
const itemsPerPage = 12

const categories = ['coffee', 'snacks', 'breakfast', 'burgers', 'pizza', 'desserts', 'drinks']

onMounted(async () => {
  searchQuery.value = route.query.search || ''
  loading.value = true
  await productStore.fetchProducts()
  loading.value = false
})

watch([searchQuery, selectedCategory, priceRange], () => { currentPage.value = 1 }, { deep: true })

const filteredProducts = computed(() => {
  let filtered = productStore.products

  if (searchQuery.value) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(p => {
      const categoryName = typeof p.category === 'object' && p.category?.name ? p.category.name : p.category
      return categoryName === selectedCategory.value
    })
  }

  filtered = filtered.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

  if (sortBy.value === 'price-low') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'popularity') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const handleAddToCart = (product) => {
  cartStore.addItem(product, 1)
}
</script>
