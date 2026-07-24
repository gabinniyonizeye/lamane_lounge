<template>
  <div class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-amber-500/20 hover:border-amber-500/30">
    <!-- Image Container -->
    <router-link :to="`/product/${product._id}`" class="relative h-56 bg-gradient-to-br from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-700 overflow-hidden block">
      <img
        :src="imageSrc"
        :alt="`Photo of ${product.name}`"
        @error="imageFailed = true"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      
      <!-- Badge -->
      <div v-if="product.availability === false" class="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
        <span class="text-white font-bold text-lg">Out of Stock</span>
      </div>
      
      <!-- Rating Badge -->
      <div v-if="product.rating" class="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
        <span class="text-yellow-400">★</span>
        <span class="text-sm font-bold text-gray-900 dark:text-white">{{ product.rating }}</span>
      </div>
    </router-link>

    <!-- Content -->
    <div class="p-5">
      <!-- Category Badge -->
      <div class="mb-3">
        <span class="inline-block px-3 py-1 bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full capitalize">
          {{ product.category }}
        </span>
      </div>

      <!-- Title -->
      <router-link :to="`/product/${product._id}`" class="hover:text-amber-600 dark:hover:text-amber-400 transition">
        <h3 class="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">{{ product.name }}</h3>
      </router-link>

      <!-- Description -->
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{{ product.description }}</p>
      
      <!-- Rating & Reviews -->
      <div class="flex items-center gap-2 mb-4">
        <div class="flex text-yellow-400">
          <span v-for="i in 5" :key="i" class="text-xs">
            {{ i <= Math.round(product.rating || 4) ? '★' : '☆' }}
          </span>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-500">({{ product.reviews || 0 }} reviews)</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-4 pb-4 border-t border-gray-200 dark:border-amber-500/20">
        <div>
          <span class="text-3xl font-bold text-amber-600 dark:text-amber-400">{{ Number(product.price).toLocaleString() }}</span>
          <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">RWF</span>
        </div>
        <span v-if="product.originalPrice" class="text-sm text-gray-500 dark:text-gray-500 line-through">
          {{ Number(product.originalPrice).toLocaleString() }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="addToCart"
        :disabled="product.availability === false"
        class="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white font-bold rounded-xl hover:shadow-lg hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
      >
        <span>🛒</span>
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
