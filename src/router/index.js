import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/pages/Shop.vue'),
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('@/pages/Menu.vue'),
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/pages/ProductDetail.vue'),
  },
  {
    path: '/custom-cake',
    name: 'CustomCake',
    component: () => import('@/pages/CustomCake.vue'),
  },
  {
    path: '/cake-confirmation/:orderId',
    name: 'CakeConfirmation',
    component: () => import('@/pages/CakeConfirmation.vue'),
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: () => import('@/pages/Reservations.vue'),
  },
  {
    path: '/reservation-confirmation/:reservationId',
    name: 'ReservationConfirmation',
    component: () => import('@/pages/ReservationConfirmation.vue'),
  },
  {
    path: '/specials',
    name: 'Specials',
    component: () => import('@/pages/Specials.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/pages/Cart.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/pages/Checkout.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/order-confirmation/:orderId',
    name: 'OrderConfirmation',
    component: () => import('@/pages/OrderConfirmation.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/pages/Orders.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/pages/AccountDashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/pages/Wishlist.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/pages/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  // Administrators work exclusively in the back-office dashboard.
  if (token && user?.role === 'admin' && to.name !== 'AdminDashboard') {
    return { name: 'AdminDashboard' }
  }

  if (to.meta.requiresAuth && !token) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return { name: 'Home' }
  }
})

export default router
