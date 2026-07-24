<template>
  <nav class="bg-dark/90 text-slate-200 backdrop-blur-xl border-b border-secondary/20 sticky top-0 z-50 shadow-sm">
    <div class="container flex h-20 items-center justify-between gap-4">
      <router-link to="/" class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
          <span class="text-xl font-bold">L</span>
        </div>
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-stone-500">LAMANE</p>
          <p class="text-base font-semibold text-dark">Lounge & Coffee</p>
        </div>
      </router-link>

      <div class="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
        <router-link to="/" class="transition hover:text-primary">Home</router-link>
        <router-link to="/shop" class="transition hover:text-primary">Shop</router-link>
        <router-link to="/menu" class="transition hover:text-primary text-white font-semibold">Menu</router-link>
        <router-link to="/custom-cake" class="transition hover:text-primary">Custom Cake</router-link>
        <router-link to="/reservations" class="transition hover:text-primary">Reservations</router-link>
        <router-link to="/about" class="transition hover:text-primary">About</router-link>
        <router-link to="/contact" class="transition hover:text-primary">Contact</router-link>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden lg:flex items-center rounded-full border border-secondary/20 bg-dark/80 px-3 py-2 shadow-sm">
          <svg class="mr-2 h-4 w-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model.trim="searchQuery"
            @keyup.enter="search"
            type="text"
            placeholder="Search menu"
            class="w-44 bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
          />
        </div>

        <router-link to="/cart" class="relative inline-flex items-center justify-center rounded-full border border-stone-200 bg-white p-3 text-stone-700 shadow-sm transition hover:border-primary hover:text-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[0.65rem] font-bold text-dark">{{ cartStore.itemCount }}</span>
        </router-link>

        <div class="relative">
          <button @click="toggleUserMenu" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-secondary/20 bg-dark/80 text-slate-200 shadow-sm transition hover:border-primary hover:text-primary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <div v-if="showUserMenu" class="absolute right-0 mt-3 w-56 overflow-hidden rounded-3xl border border-stone-200 bg-white text-sm shadow-xl">
            <template v-if="authStore.isAuthenticated">
              <div class="border-b border-stone-100 px-4 py-3 text-stone-600">{{ authStore.user?.name }}</div>
              <router-link to="/account" class="block px-4 py-3 hover:bg-slate-50">My Account</router-link>
              <router-link to="/orders" class="block px-4 py-3 hover:bg-slate-50">My Orders</router-link>
              <router-link v-if="authStore.user?.role === 'admin'" to="/admin" class="block px-4 py-3 hover:bg-slate-50 font-semibold text-primary">Admin Dashboard</router-link>
              <button @click="logout" class="w-full px-4 py-3 text-left text-red-600 hover:bg-slate-50">Logout</button>
            </template>
            <template v-else>
              <router-link to="/login" class="block px-4 py-3 hover:bg-slate-50">Login</router-link>
              <router-link to="/register" class="block px-4 py-3 hover:bg-slate-50">Register</router-link>
            </template>
          </div>
        </div>

        <button @click="toggleMobileMenu" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm md:hidden hover:border-primary hover:text-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-stone-200 shadow-sm">
      <router-link to="/" class="block px-5 py-4 text-sm text-stone-700 hover:bg-slate-50">Home</router-link>
      <router-link to="/shop" class="block px-5 py-4 text-sm text-stone-700 hover:bg-slate-50">Shop</router-link>
      <router-link to="/menu" class="block px-5 py-4 text-sm font-semibold text-stone-900 hover:bg-slate-50">Menu</router-link>
      <router-link to="/custom-cake" class="block px-5 py-4 text-sm text-stone-700 hover:bg-slate-50">Custom Cake</router-link>
      <router-link to="/reservations" class="block px-5 py-4 text-sm text-stone-700 hover:bg-slate-50">Reservations</router-link>
      <router-link to="/about" class="block px-5 py-4 text-sm text-stone-700 hover:bg-slate-50">About</router-link>
      <router-link to="/contact" class="block px-5 py-4 text-sm text-stone-700 hover:bg-slate-50">Contact</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()
const searchQuery = ref('')
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

onMounted(() => {
  cartStore.initializeCart()
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const logout = () => {
  authStore.logout()
  showUserMenu.value = false
}

const search = () => {
  if (searchQuery.value) router.push({ path: '/shop', query: { search: searchQuery.value } })
}
</script>
