<template>
  <transition name="fade-scale">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div class="relative w-full max-w-xl rounded-[2rem] border border-secondary/20 bg-dark/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl animate-slide-up">
        <button @click="close" class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-dark/80 text-slate-200 transition hover:bg-dark/70">✕</button>

        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div class="flex-1">
            <p class="text-xs uppercase tracking-[0.35em] text-secondary">Fresh arrival</p>
            <h2 class="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">Sweet deals for first-time visitors</h2>
            <p class="mt-3 text-sm leading-7 text-slate-600">Grab a 15% welcome discount on your first order, explore our best-selling pastries, and enjoy fast delivery or pickup.</p>
          </div>
          <div class="rounded-3xl bg-dark p-4 text-center text-white shadow-lg shadow-slate-950/30 sm:w-72">
            <p class="text-sm uppercase tracking-[0.35em] text-secondary/80">Limited time</p>
            <p class="mt-3 text-4xl font-bold">15% OFF</p>
            <p class="mt-2 text-sm text-slate-300">Use code <span class="font-semibold text-white">WELCOME15</span></p>
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button @click="explore" class="btn-primary w-full sm:w-auto">Shop Now</button>
          <button @click="close" class="btn-secondary w-full sm:w-auto">Maybe later</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const visible = ref(false)
const router = useRouter()

const close = () => {
  visible.value = false
  localStorage.setItem('lamane_promo_seen', 'true')
}

const explore = () => {
  visible.value = false
  localStorage.setItem('lamane_promo_seen', 'true')
  router.push('/shop')
}

onMounted(() => {
  if (!localStorage.getItem('lamane_promo_seen')) {
    setTimeout(() => {
      visible.value = true
    }, 1500)
  }
})
</script>
