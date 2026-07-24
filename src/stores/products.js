import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { demoProducts, demoCategories } from '../data/demoData.js'

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? '/api' : 'http://localhost:5000/api')
const DEMO_MODE = true // Set to false when backend is ready

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    try {
      if (DEMO_MODE) {
        // Demo mode: use local data
        products.value = demoProducts
      } else {
        // Production mode: use backend
        const response = await axios.get(`${API_URL}/products`)
        products.value = response.data
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback to demo data
      products.value = demoProducts
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      if (DEMO_MODE) {
        // Demo mode: use local data
        categories.value = demoCategories
      } else {
        // Production mode: use backend
        const response = await axios.get(`${API_URL}/categories`)
        categories.value = response.data
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      // Fallback to demo data
      categories.value = demoCategories
    }
  }

  const getProductById = async (id) => {
    try {
      if (DEMO_MODE) {
        // Demo mode: find in local data
        return demoProducts.find(p => p._id === id)
      } else {
        // Production mode: use backend
        const response = await axios.get(`${API_URL}/products/${id}`)
        return response.data
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      // Fallback to demo data
      return demoProducts.find(p => p._id === id)
    }
  }

  return {
    products,
    categories,
    loading,
    fetchProducts,
    fetchCategories,
    getProductById,
  }
})
