<template>
  <div class="relative overflow-hidden">
    <PromoPopup />
    <HeroSection />
    <FeaturedProducts />
    <TodaysSpecials />
    <StatsSection />
  </div>
</template>

<script setup>
import HeroSection from '@/components/layout/HeroSection.vue'
import FeaturedProducts from '@/components/sections/FeaturedProducts.vue'
import TodaysSpecials from '@/components/sections/TodaysSpecials.vue'
import StatsSection from '@/components/sections/StatsSection.vue'
import PromoPopup from '@/components/ui/PromoPopup.vue'
</script>
