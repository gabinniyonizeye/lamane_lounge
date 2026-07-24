<template>
  <div class="space-y-6">
    <!-- Add Product Button -->
    <div class="flex justify-between items-center">
      <h3 class="text-2xl font-bold">Product Management</h3>
      <button
        @click="showForm = !showForm"
        class="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700"
      >
        {{ showForm ? 'Cancel' : '+ Add Product' }}
      </button>
    </div>

    <!-- Add/Edit Form -->
    <div v-if="showForm" class="bg-white rounded-lg shadow p-6">
      <h4 class="text-xl font-bold mb-4">{{ editingId ? 'Edit Product' : 'Add New Product' }}</h4>
      <form @submit.prevent="saveProduct" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            v-model="form.name"
            type="text"
            placeholder="Product Name"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <input
            v-model.number="form.price"
            type="number"
            placeholder="Price"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <input
            v-model.number="form.stock"
            type="number"
            placeholder="Stock"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <select
            v-model="form.category"
            class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          >
            <option value="">Select Category</option>
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <textarea
          v-model="form.description"
          placeholder="Description"
          rows="3"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
        ></textarea>
        <button
          type="submit"
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {{ editingId ? 'Update' : 'Create' }} Product
        </button>
      </form>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Name</th>
            <th class="px-4 py-2 text-left">Price</th>
            <th class="px-4 py-2 text-left">Stock</th>
            <th class="px-4 py-2 text-left">Category</th>
            <th class="px-4 py-2 text-left">Status</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2 font-semibold">{{ product.name }}</td>
            <td class="px-4 py-2">{{ product.price.toLocaleString() }} RWF</td>
            <td class="px-4 py-2">
              <span :class="['px-2 py-1 rounded', product.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
                {{ product.stock }}
              </span>
            </td>
            <td class="px-4 py-2">{{ product.category?.name }}</td>
            <td class="px-4 py-2">
              <button
                @click="toggleAvailability(product._id)"
                :class="['px-3 py-1 rounded text-sm', product.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']"
              >
                {{ product.availability ? 'Available' : 'Unavailable' }}
              </button>
            </td>
            <td class="px-4 py-2 space-x-2">
              <button
                @click="editProduct(product)"
                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(product._id)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const showForm = ref(false)
const editingId = ref(null)
const products = ref([])
const categories = ref([])
const form = ref({
  name: '',
  price: 0,
  stock: 0,
  category: '',
  description: ''
})

const fetchProducts = async () => {
  try {
    const response = await fetch('/api/admin/products', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      products.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await fetch('/api/admin/products/categories/list', {
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      categories.value = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

const saveProduct = async () => {
  try {
    const method = editingId.value ? 'PATCH' : 'POST'
    const url = editingId.value ? `/api/admin/products/${editingId.value}` : '/api/admin/products'
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      fetchProducts()
      resetForm()
      showForm.value = false
    }
  } catch (error) {
    console.error('Failed to save product:', error)
  }
}

const editProduct = (product) => {
  editingId.value = product._id
  form.value = { ...product }
  showForm.value = true
}

const deleteProduct = async (id) => {
  if (!confirm('Are you sure?')) return
  
  try {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      fetchProducts()
    }
  } catch (error) {
    console.error('Failed to delete product:', error)
  }
}

const toggleAvailability = async (id) => {
  try {
    const response = await fetch(`/api/admin/products/${id}/toggle-availability`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${authStore.token}` }
    })
    if (response.ok) {
      fetchProducts()
    }
  } catch (error) {
    console.error('Failed to toggle availability:', error)
  }
}

const resetForm = () => {
  editingId.value = null
  form.value = { name: '', price: 0, stock: 0, category: '', description: '' }
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>
