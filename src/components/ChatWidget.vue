<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Widget -->
    <div v-if="isOpen" class="bg-white rounded-lg shadow-2xl w-96 h-96 flex flex-col">
      <!-- Header -->
      <div class="bg-amber-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 class="font-bold">Chat Support</h3>
        <button @click="isOpen = false" class="text-xl">✕</button>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3">
        <div v-for="msg in messages" :key="msg.id" :class="['flex', msg.sender === 'user' ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-xs px-3 py-2 rounded-lg', msg.sender === 'user' ? 'bg-amber-100 text-gray-800' : 'bg-gray-200 text-gray-800']">
            {{ msg.text }}
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="border-t p-3 flex gap-2">
        <input
          v-model="messageInput"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type message..."
          class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        <button
          @click="sendMessage"
          class="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
        >
          Send
        </button>
      </div>
    </div>

    <!-- Toggle Button -->
    <button
      v-else
      @click="isOpen = true"
      class="bg-amber-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-amber-700 text-2xl"
    >
      💬
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isOpen = ref(false)
const messages = ref([])
const messageInput = ref('')
const conversationId = ref('')

const initChat = () => {
  conversationId.value = `chat_${Date.now()}`
  messages.value = [
    { id: 1, sender: 'admin', text: 'Hello! How can we help you today?' }
  ]
}

const sendMessage = async () => {
  if (!messageInput.value.trim()) return

  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: messageInput.value
  })

  try {
    const response = await fetch(`/api/chat/${conversationId.value}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messageInput.value,
        sender: 'user'
      })
    })

    if (response.ok) {
      messageInput.value = ''
      // Simulate admin response
      setTimeout(() => {
        messages.value.push({
          id: Date.now(),
          sender: 'admin',
          text: 'Thanks for your message. Our team will respond shortly!'
        })
      }, 1000)
    }
  } catch (error) {
    console.error('Failed to send message:', error)
  }
}

onMounted(() => {
  initChat()
})
</script>
