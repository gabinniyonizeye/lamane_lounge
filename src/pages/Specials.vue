<template>
  <div class="min-h-screen bg-gray-50 py-16"><div class="container">
    <div class="text-center mb-12"><p class="text-primary font-semibold uppercase tracking-widest text-sm mb-2">Limited treats</p><h1 class="section-title mb-3">Today's Specials</h1><p class="text-gray-600">A hand-picked selection from our bakery and coffee bar.</p></div>
    <div v-if="loading" class="text-center text-gray-500 py-12">Loading specials…</div>
    <div v-else-if="specials.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"><ProductCard v-for="product in specials" :key="product._id" :product="product" @add-to-cart="cartStore.addItem(product)" /></div>
    <div v-else class="bg-white rounded-xl p-10 text-center"><p class="text-lg text-gray-600 mb-5">Our specials are being prepared. Browse the full menu in the meantime.</p><router-link to="/shop" class="btn-primary inline-block">View the menu</router-link></div>
  </div></div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
const productStore = useProductStore(); const cartStore = useCartStore()
const loading = computed(() => productStore.loading)
const specials = computed(() => productStore.products.filter(product => product.availability).slice(0, 6))
onMounted(() => { if (!productStore.products.length) productStore.fetchProducts() })
</script>
