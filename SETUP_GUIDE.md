# LAMANE Bakery & Coffee - Project Setup Guide

## Project Structure

```
lamane_bakery_coffee/
├── server/                    # Backend API
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Product.js        # Product schema
│   │   ├── Category.js       # Category schema
│   │   ├── Order.js          # Order schema
│   │   └── Review.js         # Review schema
│   ├── routes/
│   │   ├── auth.js           # Authentication endpoints
│   │   ├── products.js       # Product endpoints
│   │   ├── categories.js     # Category endpoints
│   │   ├── orders.js         # Order endpoints
│   │   └── reviews.js        # Review endpoints
│   └── index.js              # Express server entry point
├── src/                       # Frontend (Vue 3)
│   ├── components/
│   ├── pages/
│   ├── stores/
│   │   ├── auth.js           # Authentication store
│   │   └── products.js       # Products store
│   ├── utils/
│   │   └── api.js            # API client with interceptors
│   ├── App.vue
│   └── main.js
├── .env                       # Environment variables
└── package.json
```

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Edit `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/lamane_bakery
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run Development Servers

**Option A: Run both frontend and backend together**
```bash
npm run dev:all
```

**Option B: Run separately**
- Frontend: `npm run dev` (runs on http://localhost:5173)
- Backend: `npm run dev:server` (runs on http://localhost:5000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Orders
- `GET /api/orders` - Get user's orders (or all if admin)
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order (Authenticated users)
- `PUT /api/orders/:id` - Update order status (Admin only)

### Reviews
- `GET /api/reviews/product/:productId` - Get reviews for product
- `POST /api/reviews` - Create review (Authenticated users)
- `DELETE /api/reviews/:id` - Delete review (Own reviews only)

## Database Collections

### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: 'customer' | 'admin',
  loyaltyPoints: Number,
  createdAt: Date
}
```

### Products
```javascript
{
  name: String,
  category: ObjectId (ref: Category),
  price: Number,
  description: String,
  image: String,
  ingredients: [String],
  availability: Boolean,
  stock: Number,
  createdAt: Date
}
```

### Categories
```javascript
{
  name: String (unique),
  slug: String (unique),
  image: String,
  description: String,
  createdAt: Date
}
```

### Orders
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'cash',
  deliveryAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Reviews
```javascript
{
  userId: ObjectId (ref: User),
  productId: ObjectId (ref: Product),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

## Authentication Flow

1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. Server returns JWT token
3. Token is stored in localStorage
4. Axios interceptor automatically adds token to all requests
5. Protected routes verify token via `authMiddleware`
6. Admin routes require both authentication and `adminMiddleware`

## Frontend Store Usage

### Auth Store
```javascript
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
await authStore.register(name, email, password, phone, address)
await authStore.login(email, password)
authStore.logout()
```

### Products Store
```javascript
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()
await productStore.fetchProducts()
await productStore.fetchCategories()
const product = await productStore.getProductById(id)
```

## Next Steps

1. Create Vue components for pages (Login, Register, Products, Orders, etc.)
2. Set up Vue Router for navigation
3. Implement shopping cart functionality
4. Add payment integration
5. Create admin dashboard
6. Add image upload functionality
7. Implement email notifications
