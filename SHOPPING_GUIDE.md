# Online Ordering & Shop Pages - Complete Guide

## 📦 Features Implemented

### Shop Page (`/shop`)
✅ **Filtering**
- Filter by category (bread, cakes, coffee, drinks, pastries, breakfast, snacks)
- Filter by price range
- Filter by availability (in stock only)

✅ **Sorting**
- Sort by newest
- Sort by price (low to high)
- Sort by price (high to low)
- Sort by popularity (rating)

✅ **Search**
- Real-time search by product name
- Case-insensitive matching

✅ **Pagination**
- 12 items per page
- Previous/Next buttons
- Page number buttons

✅ **Product Display**
- Product image
- Product name
- Price
- Rating (star display)
- Quick add to cart button
- Out of stock indicator

### Product Detail Page (`/product/:id`)
✅ **Product Information**
- Large product image with gallery support
- Product name and description
- Price display
- Original price (if on sale)
- Availability status badge

✅ **Ingredients**
- Display list of ingredients as tags
- Helpful for customers with allergies

✅ **Quantity Selector**
- Increment/Decrement buttons
- Direct number input
- Minimum quantity of 1

✅ **Add to Cart**
- Add with selected quantity
- Disabled when out of stock

✅ **Customer Reviews**
- Display review count
- Show average rating
- Sample review section

✅ **Recommended Products**
- Cross-sell related products
- Show 4 recommended items from same category
- Quick add to cart from recommendations

### Shopping Cart (`/cart`)
✅ **Cart Items Display**
- Product image, name, price
- Quantity controls (increment/decrement)
- Item total calculation
- Remove item button

✅ **Price Summary**
- Subtotal calculation
- Delivery fee ($5)
- Free delivery on orders over $30
- Total price

✅ **Cart Actions**
- Update quantities
- Remove items
- Clear entire cart
- Proceed to checkout button

✅ **Promo Code**
- Input field for promo codes
- Apply button (ready for implementation)

✅ **Persistence**
- Cart saved to localStorage
- Cart persists across page refreshes
- Cart persists across browser sessions

### Cart Drawer (Slide-in)
✅ **Quick Cart View**
- Slide-in drawer from right side
- Overlay background
- Close button

✅ **Cart Management**
- View all items
- Update quantities
- Remove items
- View total

✅ **Quick Actions**
- View full cart button
- Quick checkout button

## 🏗️ Architecture

### Cart Store (Pinia)
```javascript
// State
- items: Array of cart items
- itemCount: Computed total quantity
- subtotal: Computed subtotal
- deliveryFee: Computed delivery fee
- total: Computed total price

// Actions
- addItem(product, quantity)
- removeItem(productId)
- updateQuantity(productId, quantity)
- clearCart()
- initializeCart()
```

### Data Persistence
- Cart stored in localStorage as JSON
- Automatically saved on every change
- Automatically loaded on app initialization

## 📁 File Structure

```
src/
├── stores/
│   ├── cart.js                    # Cart state management
│   ├── products.js                # Products state
│   └── auth.js                    # Authentication
├── pages/
│   ├── Shop.vue                   # Shop with filters
│   ├── ProductDetail.vue          # Product detail page
│   ├── Cart.vue                   # Shopping cart
│   └── Checkout.vue               # Checkout (placeholder)
├── components/
│   └── ui/
│       ├── ProductCard.vue        # Product card component
│       └── CartDrawer.vue         # Cart drawer component
└── router/
    └── index.js                   # Routes configuration
```

## 🔄 User Flow

1. **Browse Products**
   - User visits `/shop`
   - Sees all products with filters
   - Can search, filter, sort, and paginate

2. **View Product Details**
   - Click on product card
   - Navigate to `/product/:id`
   - See full details, ingredients, reviews
   - See recommended products

3. **Add to Cart**
   - Select quantity
   - Click "Add to Cart"
   - Item added to cart store
   - Cart count updates in navigation

4. **View Cart**
   - Click cart icon in navigation
   - Can view cart drawer or go to full cart page
   - Update quantities or remove items

5. **Checkout**
   - Click "Proceed to Checkout"
   - Navigate to `/checkout` (requires authentication)
   - Complete purchase

## 💾 LocalStorage Schema

```javascript
// Cart stored as:
{
  "cart": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "price": 9.99,
      "image": "image_url",
      "quantity": 2
    }
  ]
}
```

## 🎨 Styling

### Colors Used
- Primary: #8B4513 (Brown)
- Secondary: #D2691E (Chocolate)
- Accent: #FFD700 (Gold)
- Dark: #2C1810 (Dark Brown)

### Responsive Design
- Mobile: Single column layout
- Tablet: 2 columns for products
- Desktop: 3-4 columns for products
- Sticky sidebar on desktop

## 🔧 Configuration

### Delivery Fee
- Base fee: $5
- Free delivery threshold: $30
- Edit in `src/stores/cart.js`

### Items Per Page
- Default: 12 items
- Edit in `src/pages/Shop.vue`

### Categories
```javascript
['bread', 'cakes', 'coffee', 'drinks', 'pastries', 'breakfast', 'snacks']
```

## 📊 API Integration

### Products Endpoint
```
GET /api/products
- Returns all products
- Used by Shop and ProductDetail pages

GET /api/products/:id
- Returns single product
- Used by ProductDetail page
```

### Expected Product Schema
```javascript
{
  "_id": "ObjectId",
  "name": "Product Name",
  "category": "bread",
  "price": 9.99,
  "description": "Product description",
  "image": "image_url",
  "ingredients": ["flour", "water", "salt"],
  "availability": true,
  "stock": 50,
  "rating": 4.5,
  "reviews": 12
}
```

## 🧪 Testing Checklist

- [ ] Shop page loads with all products
- [ ] Filters work correctly
- [ ] Search functionality works
- [ ] Sorting works for all options
- [ ] Pagination displays correctly
- [ ] Product cards display all info
- [ ] Add to cart from shop works
- [ ] Product detail page loads
- [ ] Product detail shows all info
- [ ] Quantity selector works
- [ ] Add to cart from detail works
- [ ] Recommended products display
- [ ] Cart page shows all items
- [ ] Cart quantity controls work
- [ ] Remove item works
- [ ] Price calculations are correct
- [ ] Delivery fee logic works
- [ ] Cart persists on refresh
- [ ] Cart drawer opens/closes
- [ ] Cart drawer updates work

## 🚀 Next Steps

1. **Implement Checkout Page**
   - Shipping address form
   - Payment method selection
   - Order confirmation

2. **Add Payment Integration**
   - Stripe integration
   - PayPal integration
   - Order processing

3. **Implement Reviews**
   - Allow users to leave reviews
   - Display reviews on product page
   - Calculate average rating

4. **Add Wishlist**
   - Save favorite products
   - Share wishlist
   - Notify on price drops

5. **Implement Promo Codes**
   - Validate promo codes
   - Apply discounts
   - Track usage

6. **Add Product Recommendations**
   - Based on browsing history
   - Based on purchase history
   - AI-powered suggestions

7. **Implement Search Optimization**
   - Full-text search
   - Autocomplete suggestions
   - Search filters

8. **Add Order Tracking**
   - Real-time order status
   - Delivery tracking
   - Order history

## 🐛 Troubleshooting

### Cart not persisting
- Check if localStorage is enabled
- Check browser console for errors
- Verify cart store initialization

### Products not loading
- Check if backend is running
- Verify API endpoint is correct
- Check network tab in browser dev tools

### Filters not working
- Check if product data has category field
- Verify filter logic in Shop.vue
- Check console for JavaScript errors

### Pagination not working
- Verify itemsPerPage value
- Check if filtered products exist
- Verify pagination logic

## 📝 Code Examples

### Adding Item to Cart
```javascript
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
cartStore.addItem(product, quantity)
```

### Accessing Cart Data
```javascript
const cartStore = useCartStore()
console.log(cartStore.items)        // Array of items
console.log(cartStore.itemCount)    // Total quantity
console.log(cartStore.subtotal)     // Subtotal
console.log(cartStore.total)        // Total with delivery
```

### Clearing Cart
```javascript
cartStore.clearCart()
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify backend is running
4. Check network requests in dev tools
