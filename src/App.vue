<template>
  <div :class="[isAdmin ? 'min-h-screen' : 'min-h-screen flex flex-col', themeStore.isDark ? 'dark' : 'light']">
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
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'
import ChatWidget from '@/components/ChatWidget.vue'
import PromoPopup from '@/components/ui/PromoPopup.vue'

const authStore = useAuthStore()
const themeStore = useThemeStore()
const isAdmin = computed(() => authStore.user?.role === 'admin')

onMounted(() => {
  themeStore.initializeTheme()
})
</script>
