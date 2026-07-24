<template>
  <div class="bg-white dark:bg-black">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-amber-50 to-white dark:from-black dark:to-gray-900 py-20 border-b border-gray-200 dark:border-amber-500/20">
      <div class="container max-w-4xl text-center">
        <p class="text-amber-700 dark:text-amber-300 font-semibold tracking-widest uppercase text-sm mb-4">Get in touch</p>
        <h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">Contact Us</h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">Questions, cake ideas, or feedback? We would love to hear from you.</p>
      </div>
    </section>

    <!-- Contact Info Cards -->
    <section class="container py-16">
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-black p-6 rounded-xl shadow-sm border border-gray-200 dark:border-amber-500/20 text-center">
          <div class="text-4xl mb-4">📧</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Email</h3>
          <a href="mailto:info@lamane.com" class="text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200">info@lamane.com</a>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-black p-6 rounded-xl shadow-sm border border-gray-200 dark:border-amber-500/20 text-center">
          <div class="text-4xl mb-4">📞</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Phone</h3>
          <a href="tel:+15551234567" class="text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200">+1 (555) 123-4567</a>
        </div>
        <div class="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-black p-6 rounded-xl shadow-sm border border-gray-200 dark:border-amber-500/20 text-center">
          <div class="text-4xl mb-4">📍</div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Visit</h3>
          <p class="text-gray-700 dark:text-gray-300">123 Baker Street, City</p>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="submit" class="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-black rounded-xl shadow-sm p-8 border border-gray-200 dark:border-amber-500/20 space-y-6">
          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Name</label>
              <input 
                v-model.trim="form.name" 
                required 
                class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                placeholder="Your name"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</label>
              <input 
                v-model.trim="form.email" 
                type="email" 
                required 
                class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Message</label>
            <textarea 
              v-model.trim="form.message" 
              required 
              rows="5" 
              class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
              placeholder="Your message..."
            ></textarea>
          </div>
          <p v-if="sent" class="text-green-600 dark:text-green-400 font-semibold">✓ Thanks—we received your message and will get back to you soon.</p>
          <button type="submit" class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-amber-600 hover:to-amber-700">
            Send message
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', message: '' })
const sent = ref(false)

const submit = () => {
  sent.value = true
  form.value = { name: '', email: '', message: '' }
}
</script>
