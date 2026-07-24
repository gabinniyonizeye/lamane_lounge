<template>
  <div class="bg-white py-16">
    <div class="container max-w-5xl">
      <div class="text-center mb-12">
        <h1 class="section-title mb-3">Contact Us</h1>
        <p class="text-gray-600">Questions, cake ideas, or feedback? We would love to hear from you.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-5 mb-10 text-center">
        <a href="mailto:info@lamane.com" class="card p-6 hover:text-amber-600 transition">
          <p class="font-bold text-gray-900">Email</p>
          <p class="text-gray-600 mt-2">info@lamane.com</p>
        </a>
        <a href="tel:+15551234567" class="card p-6 hover:text-amber-600 transition">
          <p class="font-bold text-gray-900">Phone</p>
          <p class="text-gray-600 mt-2">+1 (555) 123-4567</p>
        </a>
        <div class="card p-6">
          <p class="font-bold text-gray-900">Visit</p>
          <p class="text-gray-600 mt-2">123 Baker Street, City</p>
        </div>
      </div>
      <form @submit.prevent="submit" class="bg-white rounded-xl shadow-sm p-6 sm:p-8 grid gap-5 border border-gray-200">
        <div class="grid sm:grid-cols-2 gap-5">
          <label class="text-sm font-semibold text-gray-900">
            Name
            <input 
              v-model.trim="form.name" 
              required 
              class="mt-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
          </label>
          <label class="text-sm font-semibold text-gray-900">
            Email
            <input 
              v-model.trim="form.email" 
              type="email" 
              required 
              class="mt-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
            />
          </label>
        </div>
        <label class="text-sm font-semibold text-gray-900">
          Message
          <textarea 
            v-model.trim="form.message" 
            required 
            rows="5" 
            class="mt-2 w-full rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </label>
        <p v-if="sent" class="text-green-600 font-semibold">Thanks—we received your message and will get back to you soon.</p>
        <button class="btn-primary justify-self-start">Send message</button>
      </form>
    </div>
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
