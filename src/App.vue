<template>
  <div :class="isAdmin ? 'min-h-screen' : 'min-h-screen flex flex-col'">
    <Navigation v-if="!isAdmin" />
    <PromoPopup v-if="!isAdmin" />
    <main :class="{ 'flex-grow': !isAdmin }">
      <router-view />
    </main>
    <Footer v-if="!isAdmin" />
    <ChatWidget v-if="!isAdmin" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'
import ChatWidget from '@/components/ChatWidget.vue'
import PromoPopup from '@/components/ui/PromoPopup.vue'

const authStore = useAuthStore()
const isAdmin = computed(() => authStore.user?.role === 'admin')
</script>
