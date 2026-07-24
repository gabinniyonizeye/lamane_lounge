import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

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
        try {
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${savedToken}` },
          })
          user.value = response.data
          localStorage.setItem('user', JSON.stringify(user.value))
        } catch {
          logout()
        }
      }
    }
  }

  const register = async (name, email, password, phone, address) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      })

      token.value = response.data.token
      user.value = response.data.user

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
      }

      return response.data
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Registration failed'
      throw new Error(errorMsg)
    }
  }

  const login = async (email, password, loginType = 'customer') => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        loginType,
      })

      token.value = response.data.token
      user.value = response.data.user

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(user.value))
      }

      return response.data
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
