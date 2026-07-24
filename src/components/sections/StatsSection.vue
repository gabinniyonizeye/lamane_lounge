<template>
  <section class="py-16 bg-dark text-white">
    <div class="container">
      <div class="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/20 animate-fade-in">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="stat in stats" :key="stat.id" class="text-center">
            <div class="text-5xl font-bold text-accent mb-2">{{ stat.value }}</div>
            <p class="text-xl text-slate-100">{{ stat.label }}</p>
            <p class="text-sm text-slate-400 mt-2">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  {
    id: 1,
    value: '15+',
    label: 'Years of Experience',
    description: 'Serving our community with passion',
  },
  {
    id: 2,
    value: '50K+',
    label: 'Happy Customers',
    description: 'Trusted by thousands',
  },
  {
    id: 3,
    value: '500K+',
    label: 'Products Sold',
    description: 'Freshly baked daily',
  },
])
</script>
