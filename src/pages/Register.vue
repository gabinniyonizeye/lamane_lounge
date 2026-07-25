<template>
  <div class="bg-white dark:bg-black">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-amber-50 to-white dark:from-black dark:to-gray-900 py-20 border-b border-gray-200 dark:border-amber-500/20">
      <div class="container max-w-4xl text-center">
        <p class="text-amber-700 dark:text-amber-300 font-semibold tracking-widest uppercase text-sm mb-4">Join us</p>
        <h1 class="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">Create Account</h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">Join LAMANE and start enjoying our premium bakery and coffee experience.</p>
      </div>
    </section>

    <!-- Registration Form -->
    <section class="container py-16">
      <div class="max-w-md mx-auto">
        <form @submit.prevent="submitRegister" class="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-black rounded-xl shadow-sm p-8 border border-gray-200 dark:border-amber-500/20 space-y-6">
          <!-- Error Alert -->
          <div v-if="errorMessage" class="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
            <p class="text-red-700 dark:text-red-400 text-sm font-medium">{{ errorMessage }}</p>
          </div>

          <!-- Success Alert -->
          <div v-if="successMessage" class="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg">
            <p class="text-green-700 dark:text-green-400 text-sm font-medium">{{ successMessage }}</p>
          </div>

          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Full Name</label>
            <input 
              v-model="fullName" 
              type="text" 
              required 
              class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
              placeholder="John Doe"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</label>
            <input 
              v-model="emailInput" 
              type="email" 
              required 
              class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
              placeholder="your@email.com"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Phone</label>
            <input 
              v-model="phone" 
              type="tel" 
              class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <!-- Address -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Address</label>
            <input 
              v-model="address" 
              type="text" 
              class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
              placeholder="123 Main Street"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Password</label>
            <div class="relative">
              <input 
                v-model="passwordInput" 
                :type="showPassword ? 'text' : 'password'" 
                required 
                minlength="6"
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

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Confirm Password</label>
            <div class="relative">
              <input 
                v-model="confirmPasswordInput" 
                :type="showConfirmPassword ? 'text' : 'password'" 
                required 
                class="w-full rounded-lg border border-gray-300 dark:border-amber-500/30 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12" 
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full inline-flex items-center justify-center px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-sm"
          >
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Already have an account?</span>
            </div>
          </div>

          <!-- Login Link -->
          <router-link
            to="/login"
            class="block w-full text-center px-6 py-2 rounded-lg border-2 border-amber-500 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all duration-300 text-sm"
          >
            Sign In
          </router-link>
        </form>
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

const fullName = ref('')
const emailInput = ref('')
const phone = ref('')
const address = ref('')
const passwordInput = ref('')
const confirmPasswordInput = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const submitRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!fullName.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
    errorMessage.value = 'Please fill in all required fields'
    return
  }

  if (passwordInput.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isLoading.value = true

  try {
    await authStore.register(
      fullName.value,
      emailInput.value,
      passwordInput.value,
      phone.value,
      address.value
    )

    successMessage.value = 'Account created successfully! Redirecting to login...'

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
