<template>
  <section class="py-16 bg-gray-50">
    <div class="container">
      <h2 class="section-title">Featured Products</h2>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product._id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>

      <div class="text-center">
        <router-link to="/shop" class="btn-secondary inline-block">
          View All Products
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ui/ProductCard.vue'

const productStore = useProductStore()
const cartStore = useCartStore()
const loading = ref(false)
const featuredProducts = ref([])

onMounted(async () => {
  loading.value = true
  await productStore.fetchProducts()
  featuredProducts.value = productStore.products.slice(0, 8)
  loading.value = false
})

const handleAddToCart = (product) => {
  cartStore.addItem(product)
}
</script>
