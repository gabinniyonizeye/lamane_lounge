<template>
  <div class="bg-white dark:bg-black">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-amber-50 to-white dark:from-black dark:to-gray-900 py-20 border-b border-gray-200 dark:border-amber-500/20">
      <div class="container max-w-4xl text-center">
        <p class="text-amber-700 dark:text-amber-300 font-semibold tracking-widest uppercase text-sm mb-4">Welcome back</p>
        <h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">Sign In</h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{{ adminMode ? 'Administrator access' : 'Access your account' }}</p>
      </div>
    </section>

    <!-- Login Form -->
    <section class="container py-16">
      <div class="max-w-md mx-auto">
        <form @submit.prevent="submitLogin" class="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-black rounded-xl shadow-sm p-8 border border-gray-200 dark:border-amber-500/20 space-y-6">
          <!-- Error Alert -->
          <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
            <p class="text-red-700 dark:text-red-400 text-sm font-medium">{{ errorMessage }}</p>
          </div>

          <!-- Success Alert -->
          <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg">
            <p class="text-green-700 dark:text-green-400 text-sm font-medium">{{ successMessage }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
              placeholder="your@email.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Password</label>
            <div class="relative">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                required 
                class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12" 
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                  <path d="M15.171 13.576l1.414 1.414A10.025 10.025 0 0020 10c-1.274-4.057-5.064-7-9.542-7a9.971 9.971 0 00-1.514.12l2.138 2.138a4 4 0 014.244 4.244z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Admin Note -->
          <p v-if="adminMode" class="text-xs bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-300 rounded p-3">
            Admin access only. Use admin credentials to proceed.
          </p>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full inline-flex items-center justify-center px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-sm"
          >
            {{ isLoading ? 'Signing in...' : (adminMode ? 'Admin Sign In' : 'Sign In') }}
          </button>

          <!-- Admin Toggle Button -->
          <button 
            type="button"
            @click="adminMode = !adminMode"
            class="w-full px-6 py-2 rounded-lg border-2 border-gray-300 dark:border-amber-500/30 text-gray-900 dark:text-amber-300 font-bold hover:bg-gray-100 dark:hover:bg-amber-500/10 transition-all duration-300 text-sm"
          >
            {{ adminMode ? '← Back to Customer' : 'Admin Login →' }}
          </button>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Don't have an account?</span>
            </div>
          </div>

          <!-- Register Link -->
          <router-link
            to="/register"
            class="block w-full text-center px-6 py-2 rounded-lg border-2 border-amber-500 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all duration-300 text-sm"
          >
            Create Account
          </router-link>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-8 max-w-md mx-auto p-6 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl">
          <p class="font-semibold text-blue-900 dark:text-blue-300 mb-3">Demo Credentials:</p>
          <div class="space-y-2 text-sm text-blue-800 dark:text-blue-400">
            <p><strong>Customer:</strong> demo@example.com / password123</p>
            <p><strong>Admin:</strong> admin@lamane.com / admin123</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const adminMode = ref(false)

const submitLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    if (!email.value || !password.value) {
      errorMessage.value = 'Please enter email and password'
      isLoading.value = false
      return
    }

    const result = await authStore.login(email.value, password.value, adminMode.value ? 'admin' : 'customer')
    successMessage.value = 'Login successful! Redirecting...'
    
    setTimeout(() => {
      router.push(result.user.role === 'admin' ? '/admin' : '/')
    }, 1000)
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>
