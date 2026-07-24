<template>
  <section class="relative overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: 'linear-gradient(180deg, rgba(44,24,16,0.7), rgba(44,24,16,0.18)), url(https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop)', transform: `translateY(${parallaxOffset}px)` }"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent"></div>
    </div>

    <div class="container relative z-10 py-28 lg:py-32">
      <div class="grid gap-10 lg:grid-cols-[1.3fr_auto] lg:items-end">
        <div class="max-w-2xl text-white">
          <p class="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/80">Warm. Fresh. Local.</p>
          <h1 class="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">A bakery experience that feels luxurious, cozy, and delicious.</h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-slate-200">Savor handcrafted pastries, rich coffees and signature meals made with premium ingredients. Designed for taste, speed, and effortless ordering.</p>

          <div class="mt-10 flex flex-wrap gap-4">
            <router-link to="/shop" class="btn-primary">Order Now</router-link>
            <router-link to="/menu" class="btn-secondary">Explore the Menu</router-link>
          </div>
        </div>

        <div class="space-y-4 rounded-[2.5rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div class="rounded-3xl bg-white/10 p-5">
            <p class="text-sm uppercase tracking-[0.35em] text-slate-200">Chef’s favorite</p>
            <h2 class="mt-3 text-2xl font-semibold text-white">Lamané Pizza</h2>
            <p class="mt-2 text-sm text-slate-300">Roasted tomato, mozzarella, pesto drizzle, and seasonal vegetables.</p>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-3xl bg-white/10 p-5">
              <p class="text-sm uppercase tracking-[0.35em] text-slate-200">Breakfast</p>
              <p class="mt-3 text-lg font-semibold text-white">Avocado Toast</p>
            </div>
            <div class="rounded-3xl bg-white/10 p-5">
              <p class="text-sm uppercase tracking-[0.35em] text-slate-200">Special</p>
              <p class="mt-3 text-lg font-semibold text-white">Coffee Combo</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
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
