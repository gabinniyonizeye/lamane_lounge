<template>
  <footer class="bg-gradient-to-br from-dark via-primary/10 to-dark text-white">
    <div class="container py-16">
      <div class="grid gap-12 lg:grid-cols-4 mb-10">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
              <span class="text-lg font-bold">L</span>
            </div>
            <div>
              <p class="text-sm uppercase tracking-[0.35em] text-slate-400">LAMANE</p>
              <p class="text-lg font-semibold text-white">Lounge & Coffee</p>
            </div>
          </div>
          <p class="text-sm leading-7 text-slate-300">Delicious moments with premium pastries and lounge-style coffee, crafted fresh every day. Taste the warmth and rich ingredients in every order.</p>
        </div>

        <div>
          <h4 class="mb-4 text-lg font-semibold text-white">Quick Links</h4>
          <ul class="space-y-3 text-sm text-slate-400">
            <li><router-link to="/" class="transition hover:text-accent">Home</router-link></li>
            <li><router-link to="/shop" class="transition hover:text-accent">Shop</router-link></li>
            <li><router-link to="/about" class="transition hover:text-accent">About Us</router-link></li>
            <li><router-link to="/contact" class="transition hover:text-accent">Contact</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 text-lg font-semibold text-white">Contact</h4>
          <ul class="space-y-4 text-sm text-slate-400">
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-white">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              </span>
              <span>info@lamane.com</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-white">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.418 1.265 1.215 2.807 2.453 4.045 1.238 1.238 2.78 2.035 4.045 2.453l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              </span>
              <span>+1 (555) 123-4567</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-white">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
              </span>
              <span>123 Baker Street, City</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 text-lg font-semibold text-white">Newsletter</h4>
          <p class="text-sm text-slate-400 mb-4">Subscribe for exclusive offers and updates.</p>
          <form @submit.prevent="subscribeNewsletter" class="space-y-3">
            <input
              v-model="email"
              type="email"
              placeholder="Your email"
              class="w-full rounded-3xl border border-secondary/20 bg-dark/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/10"
              required
            />
            <button type="submit" class="w-full btn-primary text-sm">Subscribe</button>
          </form>
          <p v-if="subscribed" class="text-xs text-emerald-300 mt-2">Thank you for subscribing!</p>
        </div>
      </div>

      <div class="border-t border-white/10 pt-8">
        <div class="flex flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2024 LAMANE Bakery & Coffee. All rights reserved.</p>
          <div class="flex flex-wrap gap-6">
            <a href="#" class="hover:text-accent transition">Privacy Policy</a>
            <a href="#" class="hover:text-accent transition">Terms of Service</a>
            <a href="#" class="hover:text-accent transition">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

const subscribeNewsletter = () => {
  subscribed.value = true
  email.value = ''
}
</script>
