# 🎉 LAMANE Bakery & Coffee - Getting Started

## Your Setup Information

```
Database: lamane_launge
Host: localhost:27017
Collection: lamane_launge
Password: 123 (if needed)
```

## ⚡ 5-Minute Quick Start

### 1. Start MongoDB
```bash
mongod
```
Keep this terminal open.

### 2. Install Dependencies
```bash
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
npm install
```

### 3. Start Development Servers
```bash
npm run dev:all
```

### 4. Open in Browser
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

## 📋 What You Have

### ✅ Frontend (Vue 3 + Vite)
- Homepage with hero section
- Shop page with filters, search, sorting
- Product detail pages
- Shopping cart with persistence
- Navigation and footer
- Responsive design

### ✅ Backend (Express + MongoDB)
- User authentication (register/login)
- Product management API
- Category management
- Order management
- Review system
- JWT-based security

### ✅ Database (MongoDB)
- Users collection
- Products collection
- Categories collection
- Orders collection
- Reviews collection

## 🚀 First Steps

### Step 1: Add Sample Products

**Option A: Using MongoDB Compass (GUI)**
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. Create database: `lamane_launge`
4. Create collection: `products`
5. Insert this document:

```json
{
  "name": "Croissant",
  "category": "pastries",
  "price": 3.99,
  "description": "Buttery and flaky croissant",
  "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=300&fit=crop",
  "ingredients": ["flour", "butter", "salt"],
  "availability": true,
  "stock": 50,
  "rating": 4.5,
  "reviews": 12
}
```

**Option B: Using Mongo Shell**
```bash
mongosh
use lamane_launge
db.products.insertOne({
  name: "Croissant",
  category: "pastries",
  price: 3.99,
  description: "Buttery and flaky croissant",
  image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=300&fit=crop",
  ingredients: ["flour", "butter", "salt"],
  availability: true,
  stock: 50,
  rating: 4.5,
  reviews: 12
})
```

### Step 2: Test the Application

1. **Homepage** - http://localhost:5173
   - Should see hero section
   - Featured products section
   - Today's specials
   - Stats section

2. **Shop** - http://localhost:5173/shop
   - Should see your products
   - Filters should work
   - Search should work

3. **Product Detail** - Click on any product
   - Should see full product info
   - Ingredients list
   - Add to cart button

4. **Cart** - Click cart icon
   - Should show items
   - Quantity controls work
   - Price calculations correct

### Step 3: Test Authentication

**Register:**
1. Click user icon → Register
2. Fill in form
3. Should create account

**Login:**
1. Click user icon → Login
2. Use registered email/password
3. Should show user name in dropdown

## 📁 Project Structure

```
lamane_bakery_coffee/
├── server/                    # Backend
│   ├── models/               # Database schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Authentication
│   └── index.js              # Express server
├── src/                       # Frontend
│   ├── pages/                # Page components
│   ├── components/           # Reusable components
│   ├── stores/               # Pinia state management
│   ├── router/               # Vue Router
│   └── App.vue               # Root component
├── .env                       # Configuration
├── package.json              # Dependencies
└── vite.config.js            # Build config
```

## 🔧 Configuration

### .env File
```
MONGODB_URI=mongodb://localhost:27017/lamane_launge
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a strong random string before deploying!

## 📊 Available Pages

| Page | URL | Status |
|------|-----|--------|
| Home | `/` | ✅ Complete |
| Shop | `/shop` | ✅ Complete |
| Product Detail | `/product/:id` | ✅ Complete |
| Cart | `/cart` | ✅ Complete |
| Login | `/login` | 🔄 Placeholder |
| Register | `/register` | 🔄 Placeholder |
| Checkout | `/checkout` | 🔄 Placeholder |
| Account | `/account` | 🔄 Placeholder |
| Orders | `/orders` | 🔄 Placeholder |

## 🛒 Shopping Features

### Shop Page
- ✅ Filter by category
- ✅ Filter by price
- ✅ Search products
- ✅ Sort options
- ✅ Pagination (12 items/page)
- ✅ Add to cart

### Product Detail
- ✅ Full product info
- ✅ Ingredients list
- ✅ Quantity selector
- ✅ Recommended products
- ✅ Reviews section

### Shopping Cart
- ✅ View items
- ✅ Update quantities
- ✅ Remove items
- ✅ Price calculations
- ✅ Free delivery on $30+
- ✅ Cart persistence

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Products
```
GET /api/products
GET /api/products/:id
POST /api/products (admin only)
PUT /api/products/:id (admin only)
DELETE /api/products/:id (admin only)
```

### Categories
```
GET /api/categories
GET /api/categories/:id
POST /api/categories (admin only)
PUT /api/categories/:id (admin only)
DELETE /api/categories/:id (admin only)
```

### Orders
```
GET /api/orders
GET /api/orders/:id
POST /api/orders
PUT /api/orders/:id (admin only)
```

### Reviews
```
GET /api/reviews/product/:productId
POST /api/reviews
DELETE /api/reviews/:id
```

## 🧪 Testing Checklist

- [ ] MongoDB running on localhost:27017
- [ ] npm install completed
- [ ] Frontend loads at http://localhost:5173
- [ ] Backend running at http://localhost:5000
- [ ] Homepage displays correctly
- [ ] Shop page shows products
- [ ] Filters work
- [ ] Search works
- [ ] Product detail page loads
- [ ] Add to cart works
- [ ] Cart persists on refresh
- [ ] Navigation works
- [ ] Footer displays

## 🐛 Common Issues

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:** Start MongoDB with `mongod`

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Fix:** Change PORT in .env or kill process using port

### No Products Showing
**Fix:** Add sample data to MongoDB (see Step 1 above)

### Cart Not Persisting
**Fix:** Check if localStorage is enabled in browser

### API Errors
**Fix:** Check backend terminal for error messages

## 📚 Documentation Files

Read these for more details:

1. **QUICK_START.md** - Quick start guide
2. **COMPLETE_SETUP.md** - Full setup guide
3. **MONGODB_SETUP.md** - Database setup
4. **SHOPPING_GUIDE.md** - Shopping features
5. **HOMEPAGE_GUIDE.md** - Homepage features
6. **SETUP_GUIDE.md** - Database schema

## 🎯 Next Steps

### Immediate (Today)
1. ✅ Start MongoDB
2. ✅ Add sample products
3. ✅ Test homepage
4. ✅ Test shopping

### Short Term (This Week)
1. Implement Login/Register pages
2. Add product images
3. Test all filters
4. Test cart functionality

### Medium Term (This Month)
1. Implement checkout page
2. Add payment integration
3. Create admin dashboard
4. Implement order tracking

### Long Term (Future)
1. Add email notifications
2. Implement reviews system
3. Add wishlist feature
4. Implement loyalty program

## 💡 Tips

- Use MongoDB Compass for easy database management
- Check browser console (F12) for frontend errors
- Check terminal for backend errors
- Use Postman to test API endpoints
- Keep MongoDB running in background

## 🚀 Commands Reference

```bash
# Start everything
npm run dev:all

# Start frontend only
npm run dev

# Start backend only
npm run dev:server

# Build for production
npm run build

# Preview production build
npm run preview

# Start MongoDB
mongod

# Connect to MongoDB
mongosh
```

## 📞 Need Help?

1. Check the documentation files
2. Review browser console (F12)
3. Check backend terminal
4. Verify MongoDB is running
5. Check .env configuration

## ✨ Features Summary

### Frontend
- Vue 3 with Composition API
- Pinia for state management
- Vue Router for navigation
- Tailwind CSS for styling
- Responsive design
- Cart persistence

### Backend
- Express.js server
- MongoDB database
- JWT authentication
- Bcrypt password hashing
- CORS enabled
- Error handling

### Database
- 5 collections
- Proper schemas
- Relationships
- Indexes

## 🎉 You're Ready!

Everything is set up and ready to go. Start with:

```bash
npm run dev:all
```

Then open http://localhost:5173 in your browser.

Enjoy building! 🚀
