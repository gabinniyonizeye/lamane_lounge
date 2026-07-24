import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const DEMO_MODE = true // Set to false when backend is ready

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = computed(() => !!token.value)

  const initializeToken = async () => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        token.value = savedToken
        user.value = JSON.parse(localStorage.getItem('user') || 'null')
      }
    }
  }

  const register = async (name, email, password, phone, address) => {
    try {
      if (DEMO_MODE) {
        // Demo mode: save to localStorage
        const demoUser = {
          _id: Date.now().toString(),
          name,
          email,
          phone,
          address,
          createdAt: new Date().toISOString(),
        }
        const demoToken = 'demo_token_' + Date.now()
        
        token.value = demoToken
        user.value = demoUser
        
        localStorage.setItem('token', demoToken)
        localStorage.setItem('user', JSON.stringify(demoUser))
        
        return { token: demoToken, user: demoUser }
      } else {
        // Production mode: use backend
        const response = await axios.post(`${API_URL}/auth/register`, {
          name,
          email,
          password,
          phone,
          address,
        })

        token.value = response.data.token
        user.value = response.data.user

        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))

        return response.data
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Registration failed'
      throw new Error(errorMsg)
    }
  }

  const login = async (email, password, loginType = 'customer') => {
    try {
      if (DEMO_MODE) {
        // Demo mode: accept any email/password
        const demoUser = {
          _id: Date.now().toString(),
          name: email.split('@')[0],
          email,
          phone: '+250788000000',
          address: 'Kigali, Rwanda',
          role: loginType,
          createdAt: new Date().toISOString(),
        }
        const demoToken = 'demo_token_' + Date.now()
        
        token.value = demoToken
        user.value = demoUser
        
        localStorage.setItem('token', demoToken)
        localStorage.setItem('user', JSON.stringify(demoUser))
        
        return { token: demoToken, user: demoUser }
      } else {
        // Production mode: use backend
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
          loginType,
        })

        token.value = response.data.token
        user.value = response.data.user

        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))

        return response.data
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Login failed'
      throw new Error(errorMsg)
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    initializeToken,
    register,
    login,
    logout,
  }
})
