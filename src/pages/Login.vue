<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-2xl">L</span>
          </div>
          <h1 class="text-3xl font-bold text-dark">LAMANE</h1>
          <p class="text-gray-600 mt-2">{{ adminMode ? 'Administrator sign in' : 'Sign in to your account' }}</p>
        </div>

        <!-- Error Alert -->
        <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 text-sm font-medium">{{ errorMessage }}</p>
        </div>

        <!-- Success Alert -->
        <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-700 text-sm font-medium">{{ successMessage }}</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="submitLogin" class="space-y-5">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-semibold text-dark mb-2">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label class="block text-sm font-semibold text-dark mb-2">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition pr-12"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
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

          <p v-if="adminMode" class="text-sm bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3">Administrator access is protected. Enter your admin email and password to manage the business.</p>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            <span v-if="!isLoading">{{ adminMode ? 'Sign In as Admin' : 'Sign In' }}</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>
        </form>

        <button
          type="button"
          @click="selectAdminLogin"
          class="mt-4 w-full border-2 border-dark text-dark font-bold py-3 rounded-lg hover:bg-dark hover:text-white transition"
        >
          {{ adminMode ? 'Administrator Login Selected' : 'Login as Admin' }}
        </button>
        <button v-if="adminMode" type="button" @click="adminMode = false" class="mt-2 w-full text-sm text-gray-600 hover:text-primary">Return to customer login</button>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Don't have an account?</span>
          </div>
        </div>

        <!-- Register Link -->
        <router-link
          to="/register"
          class="block w-full text-center px-4 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition"
        >
          Create Account
        </router-link>

        <!-- Demo Credentials -->
        <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-sm font-semibold text-blue-900 mb-3">Demo Credentials:</p>
          <div class="space-y-2 text-sm text-blue-800">
            <p><strong>Customer:</strong> demo@example.com / password123</p>
            <p><strong>Admin:</strong> admin@lamane.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
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

const selectAdminLogin = () => {
  adminMode.value = true
  email.value = 'admin@lamane.com'
  password.value = ''
  errorMessage.value = ''
  successMessage.value = ''
}

const submitLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    if (!email.value || !password.value) {
      errorMessage.value = 'Please enter both email and password'
      isLoading.value = false
      return
    }

    const result = await authStore.login(email.value, password.value, adminMode.value ? 'admin' : 'customer')
    
    successMessage.value = 'Login successful! Redirecting...'
    
    setTimeout(() => {
      router.push(result.user.role === 'admin' ? '/admin' : (router.currentRoute.value.query.redirect || '/'))
    }, 1000)
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message || error.error || 'Login failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>
