# 🔧 Command Reference Guide

## 📍 Project Location
```
d:\my_website\LAMANE project\lamane_bakery_coffee
```

## 🚀 Quick Commands

### Start Everything (Recommended)
```bash
npm run dev:all
```
Starts both frontend and backend in one command.

### Start Frontend Only
```bash
npm run dev
```
Runs on http://localhost:5173

### Start Backend Only
```bash
npm run dev:server
```
Runs on http://localhost:5000

### Build for Production
```bash
npm run build
```
Creates optimized production build in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally.

## 🗄️ MongoDB Commands

### Start MongoDB
```bash
mongod
```
Starts MongoDB server on localhost:27017

### Connect to MongoDB
```bash
mongosh
```
Opens MongoDB shell

### Connect to Specific Database
```bash
mongosh
use lamane_launge
```

### View All Databases
```bash
show databases
```

### View All Collections
```bash
show collections
```

### Insert Sample Product
```bash
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

### View All Products
```bash
db.products.find().pretty()
```

### Count Products
```bash
db.products.countDocuments()
```

### Delete All Products
```bash
db.products.deleteMany({})
```

### Drop Database
```bash
db.dropDatabase()
```

## 📦 NPM Commands

### Install Dependencies
```bash
npm install
```

### Update Dependencies
```bash
npm update
```

### Check for Vulnerabilities
```bash
npm audit
```

### Fix Vulnerabilities
```bash
npm audit fix
```

### List Installed Packages
```bash
npm list
```

### Install Specific Package
```bash
npm install package-name
```

### Uninstall Package
```bash
npm uninstall package-name
```

## 🌐 Browser URLs

### Frontend
```
http://localhost:5173
```

### Backend API
```
http://localhost:5000/api
```

### API Endpoints

#### Products
```
GET http://localhost:5000/api/products
GET http://localhost:5000/api/products/:id
POST http://localhost:5000/api/products
PUT http://localhost:5000/api/products/:id
DELETE http://localhost:5000/api/products/:id
```

#### Authentication
```
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/auth/login
```

#### Categories
```
GET http://localhost:5000/api/categories
GET http://localhost:5000/api/categories/:id
POST http://localhost:5000/api/categories
PUT http://localhost:5000/api/categories/:id
DELETE http://localhost:5000/api/categories/:id
```

#### Orders
```
GET http://localhost:5000/api/orders
GET http://localhost:5000/api/orders/:id
POST http://localhost:5000/api/orders
PUT http://localhost:5000/api/orders/:id
```

#### Reviews
```
GET http://localhost:5000/api/reviews/product/:productId
POST http://localhost:5000/api/reviews
DELETE http://localhost:5000/api/reviews/:id
```

## 🧪 Testing Commands

### Test Frontend Build
```bash
npm run build
```

### Test API Endpoint (using curl)
```bash
curl http://localhost:5000/api/products
```

### Test with Postman
1. Download Postman: https://www.postman.com/downloads/
2. Create new request
3. Set method to GET
4. Enter URL: http://localhost:5000/api/products
5. Click Send

## 📁 File Navigation

### Go to Project Directory
```bash
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
```

### List Files
```bash
dir
```

### View File Contents
```bash
type filename.txt
```

### Create New File
```bash
echo. > filename.txt
```

### Delete File
```bash
del filename.txt
```

### Create Directory
```bash
mkdir foldername
```

## 🔍 Debugging Commands

### Check Node Version
```bash
node --version
```

### Check NPM Version
```bash
npm --version
```

### Check MongoDB Version
```bash
mongod --version
```

### View Environment Variables
```bash
echo %MONGODB_URI%
```

### Check Port Usage (Windows)
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :5173
netstat -ano | findstr :27017
```

### Kill Process Using Port (Windows)
```bash
taskkill /PID <PID> /F
```

## 📝 Git Commands (if using version control)

### Initialize Git
```bash
git init
```

### Add Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "message"
```

### View Status
```bash
git status
```

### View Log
```bash
git log
```

## 🔐 Environment Setup

### View .env File
```bash
type .env
```

### Edit .env File
```bash
notepad .env
```

### Set Environment Variable (Windows)
```bash
set MONGODB_URI=mongodb://localhost:27017/lamane_launge
```

## 📊 Monitoring Commands

### Monitor Frontend Build
```bash
npm run dev
```
Watch for changes and rebuild automatically.

### Monitor Backend
```bash
npm run dev:server
```
Watch for changes and restart automatically.

### Monitor MongoDB
```bash
mongod
```
Shows connection logs and operations.

## 🚨 Troubleshooting Commands

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Check for Port Conflicts
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :5173
netstat -ano | findstr :27017
```

### View npm Logs
```bash
npm logs
```

### Check npm Configuration
```bash
npm config list
```

## 📚 Documentation Commands

### View README
```bash
type README.md
```

### View Setup Guide
```bash
type GETTING_STARTED.md
```

### View MongoDB Guide
```bash
type MONGODB_SETUP.md
```

### View Shopping Guide
```bash
type SHOPPING_GUIDE.md
```

## 🎯 Complete Startup Sequence

### Terminal 1: Start MongoDB
```bash
mongod
```

### Terminal 2: Start Backend
```bash
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
npm run dev:server
```

### Terminal 3: Start Frontend
```bash
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
npm run dev
```

### Browser
```
http://localhost:5173
```

## 🔄 Development Workflow

### 1. Make Changes
Edit Vue files, JavaScript, or CSS

### 2. Save File
Ctrl+S (changes auto-reload)

### 3. Check Browser
http://localhost:5173 (auto-refreshes)

### 4. Check Console
F12 in browser for errors

### 5. Check Backend Terminal
Look for API errors

## 📋 Daily Checklist

- [ ] MongoDB running (`mongod`)
- [ ] Backend running (`npm run dev:server`)
- [ ] Frontend running (`npm run dev`)
- [ ] Browser open at http://localhost:5173
- [ ] No console errors
- [ ] No terminal errors

## 🎓 Useful Resources

### Documentation Files
- GETTING_STARTED.md
- QUICK_START.md
- COMPLETE_SETUP.md
- MONGODB_SETUP.md
- SHOPPING_GUIDE.md
- PROJECT_STATUS.md

### External Resources
- Vue 3 Docs: https://vuejs.org/
- Vite Docs: https://vitejs.dev/
- Tailwind Docs: https://tailwindcss.com/
- Express Docs: https://expressjs.com/
- MongoDB Docs: https://docs.mongodb.com/
- Pinia Docs: https://pinia.vuejs.org/

## 💡 Pro Tips

1. **Keep terminals organized** - Use different terminal windows for each service
2. **Use MongoDB Compass** - GUI for easier database management
3. **Use Postman** - Test API endpoints easily
4. **Use VS Code** - Best editor for this project
5. **Check .env file** - Verify configuration before starting
6. **Clear cache** - If experiencing issues, clear npm cache
7. **Restart services** - If stuck, restart all services
8. **Check ports** - Ensure ports 5000, 5173, 27017 are available

## 🆘 Emergency Commands

### Kill All Node Processes
```bash
taskkill /F /IM node.exe
```

### Kill All MongoDB Processes
```bash
taskkill /F /IM mongod.exe
```

### Reset Everything
```bash
taskkill /F /IM node.exe
taskkill /F /IM mongod.exe
rmdir /s /q node_modules
del package-lock.json
npm install
```

## ✅ Verification Commands

### Verify Node Installation
```bash
node --version
npm --version
```

### Verify MongoDB Installation
```bash
mongod --version
```

### Verify Project Setup
```bash
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
npm list
```

### Verify Build
```bash
npm run build
```

---

**Quick Reference:** Save this file for easy access to all commands!
