<template>
  <nav class="sticky top-0 z-50 shadow-sm backdrop-blur-xl bg-white dark:bg-black border-b border-gray-200 dark:border-amber-500/20">
    <div class="container flex h-20 items-center justify-between gap-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg">
          <span class="text-xl font-black">L</span>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest font-bold text-amber-700 dark:text-amber-300">LAMANE</p>
          <p class="text-sm font-bold text-gray-900 dark:text-white">Bakery & Cafe</p>
        </div>
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
        <router-link to="/" class="transition hover:text-amber-600 dark:hover:text-amber-300">Home</router-link>
        <router-link to="/shop" class="transition hover:text-amber-600 dark:hover:text-amber-300">Shop</router-link>
        <router-link to="/menu" class="transition hover:text-amber-600 dark:hover:text-amber-300 text-amber-600 dark:text-amber-300 font-bold">Menu</router-link>
        <router-link to="/custom-cake" class="transition hover:text-amber-600 dark:hover:text-amber-300">Custom Cake</router-link>
        <router-link to="/reservations" class="transition hover:text-amber-600 dark:hover:text-amber-300">Reservations</router-link>
        <router-link to="/about" class="transition hover:text-amber-600 dark:hover:text-amber-300">About</router-link>
        <router-link to="/contact" class="transition hover:text-amber-600 dark:hover:text-amber-300">Contact</router-link>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <!-- Search Bar -->
        <div class="hidden lg:flex items-center rounded-full border border-gray-300 dark:border-amber-500/30 bg-gray-50 dark:bg-black/50 px-4 py-2 shadow-sm">
          <svg class="mr-2 h-4 w-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model.trim="searchQuery"
            @keyup.enter="search"
            type="text"
            placeholder="Search menu"
            class="w-44 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-500 dark:placeholder:text-gray-600"
          />
        </div>

        <!-- Theme Switcher -->
        <button
          @click="toggleTheme"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 dark:border-amber-500/30 bg-gray-50 dark:bg-black/50 text-gray-700 dark:text-amber-300 shadow-sm transition hover:bg-gray-100 dark:hover:bg-amber-500/20"
          :title="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <svg v-if="themeStore.isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414zm.707 5.657a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zm-7.071 0l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm15-4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Cart -->
        <router-link to="/cart" class="relative inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-amber-500/30 bg-gray-50 dark:bg-black/50 p-3 text-gray-700 dark:text-amber-300 shadow-sm transition hover:bg-gray-100 dark:hover:bg-amber-500/20">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-xs font-bold text-white">{{ cartStore.itemCount }}</span>
        </router-link>

        <!-- User Menu -->
        <div class="relative">
          <button @click="toggleUserMenu" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 dark:border-amber-500/30 bg-gray-50 dark:bg-black/50 text-gray-700 dark:text-amber-300 shadow-sm transition hover:bg-gray-100 dark:hover:bg-amber-500/20">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <div v-if="showUserMenu" class="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-amber-500/20 text-sm shadow-xl">
            <template v-if="authStore.isAuthenticated">
              <div class="border-b border-gray-200 dark:border-amber-500/20 px-4 py-3 text-gray-900 dark:text-white font-semibold">{{ authStore.user?.name }}</div>
              <router-link to="/account" class="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">My Account</router-link>
              <router-link to="/orders" class="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">My Orders</router-link>
              <router-link v-if="authStore.user?.role === 'admin'" to="/admin" class="block px-4 py-3 font-bold text-amber-600 dark:text-amber-300 hover:bg-gray-50 dark:hover:bg-gray-800">Admin Dashboard</router-link>
              <button @click="logout" class="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800">Logout</button>
            </template>
            <template v-else>
              <router-link to="/login" class="block px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800">Login</router-link>
              <router-link to="/register" class="block px-4 py-3 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800">Register</router-link>
            </template>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMobileMenu" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 dark:border-amber-500/30 bg-gray-50 dark:bg-black/50 text-gray-700 dark:text-amber-300 shadow-sm md:hidden transition hover:bg-gray-100 dark:hover:bg-amber-500/20">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-amber-500/20 shadow-sm">
      <router-link to="/" class="block px-5 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Home</router-link>
      <router-link to="/shop" class="block px-5 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Shop</router-link>
      <router-link to="/menu" class="block px-5 py-4 text-sm font-bold text-amber-600 dark:text-amber-300 hover:bg-gray-50 dark:hover:bg-gray-800">Menu</router-link>
      <router-link to="/custom-cake" class="block px-5 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Custom Cake</router-link>
      <router-link to="/reservations" class="block px-5 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Reservations</router-link>
      <router-link to="/about" class="block px-5 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">About</router-link>
      <router-link to="/contact" class="block px-5 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Contact</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useThemeStore } from '@/stores/theme'

const authStore = useAuthStore()
const cartStore = useCartStore()
const themeStore = useThemeStore()
const router = useRouter()
const searchQuery = ref('')
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

onMounted(() => {
  cartStore.initializeCart()
  themeStore.initializeTheme()
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const logout = () => {
  authStore.logout()
  showUserMenu.value = false
}

const search = () => {
  if (searchQuery.value) router.push({ path: '/shop', query: { search: searchQuery.value } })
}
</script>
