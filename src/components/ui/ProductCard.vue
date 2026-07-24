<template>
  <div class="card overflow-hidden">
    <!-- Image -->
    <router-link :to="`/product/${product._id}`" class="relative h-48 bg-gray-200 overflow-hidden group block">
      <img
        :src="imageSrc"
        :alt="`Photo of ${product.name}`"
        @error="imageFailed = true"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div v-if="product.availability === false" class="absolute inset-0 bg-black/50 flex items-center justify-center">
        <span class="text-white font-bold">Out of Stock</span>
      </div>
    </router-link>

    <!-- Content -->
    <div class="p-4">
      <router-link :to="`/product/${product._id}`" class="hover:text-primary transition">
        <h3 class="font-bold text-lg mb-2 line-clamp-2">{{ product.name }}</h3>
      </router-link>
      
      <!-- Rating -->
      <div class="flex items-center gap-2 mb-3">
        <div class="flex text-accent">
          <span v-for="i in 5" :key="i" class="text-sm">
            {{ i <= Math.round(product.rating || 4) ? '★' : '☆' }}
          </span>
        </div>
        <span class="text-sm text-gray-600">({{ product.reviews || 0 }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <span class="text-2xl font-bold text-primary">{{ Number(product.price).toLocaleString() }} RWF</span>
        <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
          {{ Number(product.originalPrice).toLocaleString() }} RWF
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="addToCart"
        :disabled="product.availability === false"
        class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Order Now · Free Delivery
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
