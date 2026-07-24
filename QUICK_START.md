# 🚀 Quick Start Guide - LAMANE Bakery & Coffee

## Your Configuration

**Database:** lamane_launge  
**Host:** localhost:27017  
**Collection:** lamane_launge  
**Password:** 123 (if needed)

## ⚡ Quick Start (5 minutes)

### Step 1: Start MongoDB
```bash
# Make sure MongoDB is running on localhost:27017
mongod
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Servers

**Option A: Run both together**
```bash
npm run dev:all
```

**Option B: Run separately**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:server
```

### Step 4: Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

## 📋 What's Ready to Use

### Homepage
- ✅ Hero section with parallax
- ✅ Featured products
- ✅ Today's specials with countdown
- ✅ Company stats
- ✅ Newsletter signup

### Shopping
- ✅ Shop page with filters, search, sorting
- ✅ Product detail pages
- ✅ Shopping cart with persistence
- ✅ Cart drawer

### Backend API
- ✅ User authentication (register/login)
- ✅ Product management
- ✅ Category management
- ✅ Order management
- ✅ Review system

## 🗄️ Database Collections

The following collections will be created automatically:

1. **users** - User accounts and authentication
2. **products** - Product catalog
3. **categories** - Product categories
4. **orders** - Customer orders
5. **reviews** - Product reviews

## 🧪 Test the Setup

### 1. Check Frontend
Open http://localhost:5173 in your browser
- Should see homepage with hero section
- Navigation should work
- Featured products should display

### 2. Check Backend
Open http://localhost:5000/api/products in your browser
- Should return empty array `[]` (no products yet)
- Or existing products if you have data

### 3. Check Database
Open MongoDB Compass:
1. Connect to `mongodb://localhost:27017`
2. Look for `lamane_launge` database
3. Should see collections being created

## 📝 Environment Variables

Your `.env` file is configured with:
```
MONGODB_URI=mongodb://localhost:27017/lamane_launge
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Note:** Change `JWT_SECRET` to a strong random string in production!

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start frontend
npm run dev:server       # Start backend
npm run dev:all          # Start both

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Database
# Use MongoDB Compass to manage your database
```

## 📊 Sample Data

To test the application, you can add sample products:

### Via MongoDB Compass
1. Connect to `mongodb://localhost:27017/lamane_launge`
2. Create collection: `products`
3. Insert sample document:
```json
{
  "name": "Croissant",
  "category": "pastries",
  "price": 3.99,
  "description": "Buttery and flaky croissant",
  "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=300&fit=crop",
  "ingredients": ["flour", "butter", "salt", "water"],
  "availability": true,
  "stock": 50,
  "rating": 4.5,
  "reviews": 12
}
```

### Via API (after implementing admin panel)
```bash
POST http://localhost:5000/api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Croissant",
  "category": "pastries",
  "price": 3.99,
  "description": "Buttery and flaky croissant",
  "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=300&fit=crop",
  "ingredients": ["flour", "butter", "salt", "water"],
  "availability": true,
  "stock": 50
}
```

## 🔐 Authentication

### Register
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "555-1234",
  "address": "123 Main St"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

## 🛒 Shopping Flow

1. **Browse Products** → `/shop`
2. **View Details** → `/product/:id`
3. **Add to Cart** → Cart stored in localStorage
4. **View Cart** → `/cart`
5. **Checkout** → `/checkout` (requires login)

## 📱 Features by Page

### Home (`/`)
- Hero section
- Featured products
- Today's specials
- Stats section
- Footer

### Shop (`/shop`)
- Filter by category
- Filter by price
- Search products
- Sort options
- Pagination

### Product Detail (`/product/:id`)
- Full product info
- Ingredients
- Reviews
- Recommended products
- Quantity selector

### Cart (`/cart`)
- View all items
- Update quantities
- Remove items
- Price summary
- Checkout button

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in .env or kill the process using the port

### Frontend Not Loading
```
Error: Cannot find module
```
**Solution:** Run `npm install` to install dependencies

### Cart Not Persisting
**Solution:** Check if localStorage is enabled in browser settings

## 📞 Support

For issues:
1. Check browser console (F12)
2. Check terminal for backend errors
3. Verify MongoDB is running
4. Check .env file configuration
5. Review documentation files

## 📚 Documentation Files

- `COMPLETE_SETUP.md` - Full setup guide
- `HOMEPAGE_GUIDE.md` - Homepage features
- `SHOPPING_GUIDE.md` - Shopping features
- `SETUP_GUIDE.md` - Database schema
- `ERROR_FIXES.md` - Error fixes applied

## ✅ Verification Checklist

- [ ] MongoDB running on localhost:27017
- [ ] npm install completed
- [ ] .env file configured
- [ ] Frontend starts with `npm run dev`
- [ ] Backend starts with `npm run dev:server`
- [ ] Homepage loads at http://localhost:5173
- [ ] Shop page displays
- [ ] Cart functionality works
- [ ] No errors in console

## 🎉 You're All Set!

Your LAMANE Bakery & Coffee application is ready to use!

Start with:
```bash
npm run dev:all
```

Then open http://localhost:5173 in your browser.

Happy coding! 🚀
