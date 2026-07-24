<template>
  <div class="bg-gray-50 py-16">
    <div class="container max-w-5xl">
      <div class="text-center mb-12"><h1 class="section-title mb-3">Contact Us</h1><p class="text-gray-600">Questions, cake ideas, or feedback? We would love to hear from you.</p></div>
      <div class="grid md:grid-cols-3 gap-5 mb-10 text-center">
        <a href="mailto:info@lamane.com" class="card p-6 hover:text-primary"><p class="font-bold text-dark">Email</p><p class="text-gray-600 mt-2">info@lamane.com</p></a>
        <a href="tel:+15551234567" class="card p-6 hover:text-primary"><p class="font-bold text-dark">Phone</p><p class="text-gray-600 mt-2">+1 (555) 123-4567</p></a>
        <div class="card p-6"><p class="font-bold text-dark">Visit</p><p class="text-gray-600 mt-2">123 Baker Street, City</p></div>
      </div>
      <form @submit.prevent="submit" class="bg-white rounded-xl shadow-sm p-6 sm:p-8 grid gap-5">
        <div class="grid sm:grid-cols-2 gap-5"><label class="text-sm font-semibold">Name<input v-model.trim="form.name" required class="mt-2 w-full rounded-lg border-gray-300" /></label><label class="text-sm font-semibold">Email<input v-model.trim="form.email" type="email" required class="mt-2 w-full rounded-lg border-gray-300" /></label></div>
        <label class="text-sm font-semibold">Message<textarea v-model.trim="form.message" required rows="5" class="mt-2 w-full rounded-lg border-gray-300"></textarea></label>
        <p v-if="sent" class="text-green-700">Thanks—we received your message and will get back to you soon.</p>
        <button class="btn-primary justify-self-start">Send message</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const form = ref({ name: '', email: '', message: '' })
const sent = ref(false)
const submit = () => { sent.value = true; form.value = { name: '', email: '', message: '' } }
</script>
