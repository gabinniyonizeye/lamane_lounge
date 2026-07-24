import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useProductStore = defineStore('products', () => {
  const products = ref([]);
  const categories = ref([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/products`);
      products.value = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      categories.value = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return {
    products,
    categories,
    loading,
    fetchProducts,
    fetchCategories,
    getProductById,
  };
});
