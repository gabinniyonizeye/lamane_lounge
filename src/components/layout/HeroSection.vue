<template>
  <section class="relative overflow-hidden bg-black">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-black"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Content -->
    <div class="container relative z-10 py-32 lg:py-40">
      <div class="grid gap-16 lg:grid-cols-2 lg:items-center">
        <!-- Left Content -->
        <div class="max-w-2xl">
          <!-- Badge -->
          <div class="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="text-sm font-semibold text-amber-300">Premium Bakery & Coffee</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            Taste the
            <span class="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Luxury
            </span>
          </h1>

          <!-- Subheading -->
          <p class="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
            Handcrafted pastries, artisan coffee, and gourmet meals made with premium ingredients. Experience excellence in every bite.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4 mb-12">
            <router-link 
              to="/shop" 
              class="group px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <span>Order Now</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
            <router-link 
              to="/menu" 
              class="px-8 py-4 border-2 border-amber-400/50 text-amber-300 font-bold rounded-xl hover:bg-amber-400/10 transition-all duration-300"
            >
              Explore Menu
            </router-link>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 pt-8 border-t border-amber-500/20">
            <div>
              <p class="text-3xl font-black text-amber-400">500+</p>
              <p class="text-sm text-gray-400">Happy Customers</p>
            </div>
            <div>
              <p class="text-3xl font-black text-amber-400">50+</p>
              <p class="text-sm text-gray-400">Menu Items</p>
            </div>
            <div>
              <p class="text-3xl font-black text-amber-400">4.9★</p>
              <p class="text-sm text-gray-400">Rating</p>
            </div>
          </div>
        </div>

        <!-- Right Content - Featured Items -->
        <div class="relative">
          <!-- Floating Cards -->
          <div class="space-y-6">
            <!-- Card 1 -->
            <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/40 to-black border border-amber-500/20 p-6 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10">
                <div class="text-4xl mb-3">☕</div>
                <h3 class="text-xl font-bold text-white mb-2">Lamacina Coffee</h3>
                <p class="text-sm text-gray-400 mb-4">Premium espresso blend with rich crema</p>
                <p class="text-2xl font-bold text-amber-400">4,000 RWF</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/40 to-black border border-amber-500/20 p-6 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 ml-8">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10">
                <div class="text-4xl mb-3">🍕</div>
                <h3 class="text-xl font-bold text-white mb-2">Lamané Pizza</h3>
                <p class="text-sm text-gray-400 mb-4">Artisan pizza with fresh ingredients</p>
                <p class="text-2xl font-bold text-amber-400">10,000 RWF</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900/40 to-black border border-amber-500/20 p-6 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
              <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative z-10">
                <div class="text-4xl mb-3">🥐</div>
                <h3 class="text-xl font-bold text-white mb-2">Croissant</h3>
                <p class="text-sm text-gray-400 mb-4">Buttery, flaky French pastry</p>
                <p class="text-2xl font-bold text-amber-400">1,500 RWF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div class="flex flex-col items-center gap-2 animate-bounce">
        <span class="text-sm text-gray-400">Scroll to explore</span>
        <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const parallaxOffset = ref(0)

const handleScroll = () => {
  parallaxOffset.value = window.scrollY * 0.3
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
