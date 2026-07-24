# Error Fixes & Corrections

## Issues Found and Fixed

### 1. ProductCard.vue - Prop Reference Error
**Issue:** Using `product.value` instead of `props.product`
```javascript
// ❌ WRONG
const addToCart = () => {
  emit('add-to-cart', {
    id: product.value._id,  // product is a prop, not a ref
    ...
  })
}

// ✅ FIXED
const props = defineProps({ product: { type: Object, required: true } })
const addToCart = () => {
  emit('add-to-cart', {
    id: props.product._id,
    ...
  })
}
```

### 2. TodaysSpecials.vue - Lifecycle Hook Error
**Issue:** `onUnmounted` called inside `onMounted`, causing memory leak
```javascript
// ❌ WRONG
onMounted(() => {
  updateTimer()
  const interval = setInterval(updateTimer, 1000)
  onUnmounted(() => clearInterval(interval))  // Wrong placement
})

// ✅ FIXED
let interval

onMounted(() => {
  updateTimer()
  interval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
```

### 3. vite.config.js - Missing Path Alias
**Issue:** @ alias not configured for imports
```javascript
// ❌ WRONG
export default defineConfig({
  plugins: [vue()],
})

// ✅ FIXED
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 4. Auth Store - localStorage SSR Issue
**Issue:** Accessing localStorage without checking if window exists
```javascript
// ❌ WRONG
const token = ref(localStorage.getItem('token'))

// ✅ FIXED
const token = ref(null)

const initializeToken = () => {
  if (typeof window !== 'undefined') {
    token.value = localStorage.getItem('token')
  }
}

// Also wrapped all localStorage calls with window check
```

### 5. main.js - Auth Store Initialization
**Issue:** Auth store not initialized on app startup
```javascript
// ✅ FIXED
const authStore = useAuthStore()
authStore.initializeToken()
```

## Files Modified

1. ✅ `src/components/ui/ProductCard.vue` - Fixed prop reference
2. ✅ `src/components/sections/TodaysSpecials.vue` - Fixed lifecycle hooks
3. ✅ `vite.config.js` - Added path alias
4. ✅ `src/stores/auth.js` - Fixed localStorage handling
5. ✅ `src/main.js` - Added auth initialization

## Testing Checklist

- [ ] Run `npm install` to install all dependencies
- [ ] Start backend: `npm run dev:server`
- [ ] Start frontend: `npm run dev`
- [ ] Check browser console for errors
- [ ] Test navigation between pages
- [ ] Test featured products loading
- [ ] Test countdown timer in specials section
- [ ] Test user dropdown menu
- [ ] Test mobile responsive menu
- [ ] Test cart icon display

## Common Issues & Solutions

### Issue: "Cannot find module '@/...'"
**Solution:** Make sure vite.config.js has the path alias configured

### Issue: "localStorage is not defined"
**Solution:** All localStorage calls are now wrapped with `typeof window !== 'undefined'` check

### Issue: "Interval not clearing"
**Solution:** Moved onUnmounted outside of onMounted and properly store interval reference

### Issue: "Product card not rendering"
**Solution:** Use `props.product` instead of `product.value` in script setup

## Next Steps

1. Install dependencies: `npm install`
2. Start MongoDB locally
3. Run development servers: `npm run dev:all`
4. Test all components in browser
5. Check browser console for any remaining errors
6. Proceed with implementing Login/Register pages
