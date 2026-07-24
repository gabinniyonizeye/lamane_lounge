# LAMANE Bakery & Coffee - Complete Setup Guide

## ✅ Installation Complete

All dependencies have been installed successfully. The project is ready to run!

## 🚀 Quick Start

### 1. Start MongoDB
Make sure MongoDB is running locally on port 27017:
```bash
# Windows
mongod

# Or if using MongoDB as a service, it should already be running
```

### 2. Start Development Servers

**Option A: Run both frontend and backend together**
```bash
npm run dev:all
```

**Option B: Run separately in different terminals**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:server
```

### 3. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 📁 Project Structure

```
lamane_bakery_coffee/
├── server/                          # Backend API
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── orders.js
│   │   └── reviews.js
│   └── index.js                    # Express server
├── src/                             # Frontend (Vue 3)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.vue
│   │   │   ├── HeroSection.vue
│   │   │   └── Footer.vue
│   │   ├── sections/
│   │   │   ├── FeaturedProducts.vue
│   │   │   ├── TodaysSpecials.vue
│   │   │   └── StatsSection.vue
│   │   └── ui/
│   │       └── ProductCard.vue
│   ├── pages/
│   │   ├── Home.vue
│   │   ├── Shop.vue
│   │   ├── CustomCake.vue
│   │   ├── Specials.vue
│   │   ├── About.vue
│   │   ├── Contact.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── Cart.vue
│   │   ├── Account.vue
│   │   └── Orders.vue
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── auth.js
│   │   └── products.js
│   ├── utils/
│   │   └── api.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env                             # Environment variables
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## 🔧 Configuration Files

### .env (Backend Configuration)
```
MONGODB_URI=mongodb://localhost:27017/lamane_bakery
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

### vite.config.js (Frontend Build)
- Path alias: `@` → `./src`
- Vue 3 plugin enabled
- Tailwind CSS configured

### tailwind.config.js (Styling)
- Custom colors: primary, secondary, accent, dark
- Custom animations: fade-in, slide-up, pulse-slow
- Responsive breakpoints configured

## 📦 Dependencies Installed

### Frontend
- vue@3.3.4
- vue-router@4.2.5
- pinia@2.1.6
- axios@1.6.0
- tailwindcss@3.3.6

### Backend
- express@4.18.2
- mongoose@7.5.0
- jsonwebtoken@9.0.0
- bcryptjs@2.4.3
- cors@2.8.5
- dotenv@16.3.1

### Dev Tools
- vite@5.0.0
- @vitejs/plugin-vue@4.4.0
- autoprefixer@10.4.16
- postcss@8.4.31

## ✨ Features Implemented

### Homepage
✅ Hero section with parallax scrolling
✅ Navigation with responsive menu
✅ Featured products section
✅ Today's specials with countdown timer
✅ Company stats section
✅ Footer with newsletter signup

### Authentication
✅ JWT-based authentication
✅ User registration and login
✅ Role-based access (Customer/Admin)
✅ Secure password hashing with bcryptjs

### Database
✅ MongoDB integration
✅ User model with authentication
✅ Product and Category models
✅ Order tracking system
✅ Product reviews system

### API
✅ RESTful API endpoints
✅ Authentication routes
✅ Product management
✅ Order management
✅ Review system

## 🐛 Troubleshooting

### Issue: "Cannot find module 'axios'"
**Solution:** Run `npm install` to install all dependencies

### Issue: "MongoDB connection failed"
**Solution:** 
1. Make sure MongoDB is installed and running
2. Check that MongoDB is listening on port 27017
3. Verify MONGODB_URI in .env file

### Issue: "Port 5000 already in use"
**Solution:** 
1. Change PORT in .env file
2. Or kill the process using port 5000

### Issue: "Port 5173 already in use"
**Solution:** Vite will automatically use the next available port

### Issue: "CORS errors in browser console"
**Solution:** 
1. Make sure backend is running on http://localhost:5000
2. Check that CORS is enabled in server/index.js
3. Verify API_URL in stores/auth.js and stores/products.js

### Issue: "localStorage is not defined"
**Solution:** This is already fixed in the auth store with window check

### Issue: "Build fails with defineProps warning"
**Solution:** This is just a warning and doesn't affect functionality. defineProps and defineEmits are compiler macros in Vue 3 and don't need to be imported.

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# Backend Configuration
MONGODB_URI=mongodb://localhost:27017/lamane_bakery
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

## 🧪 Testing the Setup

1. **Test Frontend:**
   - Open http://localhost:5173
   - Check if homepage loads
   - Test navigation menu
   - Check responsive design on mobile

2. **Test Backend:**
   - Open http://localhost:5000/api/products
   - Should return empty array (no products yet)

3. **Test Database:**
   - Open MongoDB Compass
   - Connect to mongodb://localhost:27017
   - Check if `lamane_bakery` database exists

## 📚 Next Steps

1. Implement Login/Register pages with form validation
2. Create Shopping Cart functionality
3. Build Product Detail page
4. Implement Order checkout flow
5. Create Admin Dashboard
6. Add payment integration (Stripe/PayPal)
7. Implement image upload for products
8. Add search and filtering functionality
9. Create user review system
10. Set up email notifications

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#8B4513',      // Brown
  secondary: '#D2691E',    // Chocolate
  accent: '#FFD700',       // Gold
  dark: '#2C1810',         // Dark Brown
}
```

### Change API URL
Edit `src/stores/auth.js` and `src/stores/products.js`:
```javascript
const API_URL = 'http://localhost:5000/api'
```

### Change Port
Edit `.env`:
```
PORT=3000
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the error messages in browser console
3. Check backend logs in terminal
4. Verify all services are running (MongoDB, Frontend, Backend)

## ✅ Verification Checklist

- [ ] npm install completed successfully
- [ ] MongoDB is running
- [ ] .env file is created with correct values
- [ ] Frontend starts with `npm run dev`
- [ ] Backend starts with `npm run dev:server`
- [ ] Homepage loads at http://localhost:5173
- [ ] Navigation menu works
- [ ] Featured products section displays
- [ ] Countdown timer updates
- [ ] Footer displays correctly
- [ ] No errors in browser console
- [ ] No errors in terminal

## 🎉 You're All Set!

The project is now ready for development. Start building amazing features!
