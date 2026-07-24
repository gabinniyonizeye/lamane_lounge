<template>
  <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 dark:from-amber-900/20 to-white dark:to-black border border-gray-200 dark:border-amber-500/20 backdrop-blur-xl hover:border-amber-500/30 dark:hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-amber-500/20">
    <!-- Hover Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <!-- Image Container -->
    <router-link :to="`/product/${product._id}`" class="relative h-64 bg-gradient-to-br from-gray-100 dark:from-amber-900/30 to-gray-200 dark:to-black overflow-hidden block">
      <img
        :src="imageSrc"
        :alt="`Photo of ${product.name}`"
        @error="imageFailed = true"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <!-- Out of Stock Badge -->
      <div v-if="product.availability === false" class="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
        <span class="text-white font-bold text-lg">Out of Stock</span>
      </div>
      
      <!-- Rating Badge -->
      <div v-if="product.rating" class="absolute top-4 right-4 bg-white dark:bg-black/80 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-2 shadow-lg border border-gray-200 dark:border-amber-500/30">
        <span class="text-amber-500 dark:text-amber-400 text-lg">★</span>
        <span class="text-sm font-bold text-gray-900 dark:text-white">{{ product.rating }}</span>
      </div>

      <!-- Category Badge -->
      <div class="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white dark:text-black text-xs font-bold rounded-full capitalize shadow-lg">
        {{ product.category }}
      </div>
    </router-link>

    <!-- Content -->
    <div class="relative z-10 p-6">
      <!-- Title -->
      <router-link :to="`/product/${product._id}`" class="hover:text-amber-600 dark:hover:text-amber-300 transition">
        <h3 class="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">{{ product.name }}</h3>
      </router-link>

      <!-- Description -->
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ product.description }}</p>
      
      <!-- Rating & Reviews -->
      <div class="flex items-center gap-2 mb-4">
        <div class="flex text-amber-500 dark:text-amber-400">
          <span v-for="i in 5" :key="i" class="text-xs">
            {{ i <= Math.round(product.rating || 4) ? '★' : '☆' }}
          </span>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-500">({{ product.reviews || 0 }})</span>
      </div>

      <!-- Divider -->
      <div class="h-px bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 mb-4"></div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="text-3xl font-black bg-gradient-to-r from-amber-600 dark:from-amber-300 to-amber-500 dark:to-amber-500 bg-clip-text text-transparent">{{ Number(product.price).toLocaleString() }}</span>
          <span class="text-sm text-gray-600 dark:text-gray-500 ml-1">RWF</span>
        </div>
        <span v-if="product.originalPrice" class="text-sm text-gray-500 dark:text-gray-500 line-through">
          {{ Number(product.originalPrice).toLocaleString() }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="addToCart"
        :disabled="product.availability === false"
        class="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group/btn"
      >
        <span class="group-hover/btn:scale-110 transition-transform">🛒</span>
        <span>Order Now</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { defaultMenuImage, menuImageFor } from '@/utils/menuImages'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])
const imageFailed = ref(false)
const imageSrc = computed(() => imageFailed.value ? defaultMenuImage : (props.product.image || menuImageFor(props.product.category || props.product.name)))

const addToCart = () => {
  emit('add-to-cart', {
    _id: props.product._id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
  })
}
</script>
