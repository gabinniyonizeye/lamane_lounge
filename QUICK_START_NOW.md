# 🚀 QUICK START - GET PRODUCTS SHOWING NOW!

## ⚡ 3 SIMPLE STEPS

### Step 1: Start MongoDB (Terminal 1)
```bash
mongod
```
Keep this running. Wait for: `waiting for connections on port 27017`

---

### Step 2: Add Products to Database (Terminal 2)
```bash
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
node seed-direct.js
```

**You should see:**
```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB

🗑️  Clearing existing data...
   ✅ Cleared categories
   ✅ Cleared products

📦 Adding 7 categories...
   ✅ Added 7 categories

📦 Adding 24 products...
   ✅ Added 24 products

✅ Database seeded successfully!
   - Categories: 7
   - Products: 24

🎉 You can now see products in the shop!
   Go to: http://localhost:5173/shop
```

---

### Step 3: Start Application (Terminal 3)
```bash
npm run dev:all
```

**You should see:**
```
Server running on port 5000
VITE v5.4.21 ready in 123 ms
➜  Local:   http://localhost:5173/
```

---

## 🌐 OPEN BROWSER

Go to: **http://localhost:5173/shop**

You should now see **24 products** displayed! ✅

---

## ✅ WHAT YOU'LL SEE

### 7 Categories:
- ☕ Coffee (4 products)
- 🥐 Pastries (3 products)
- 🎂 Cakes (3 products)
- 🍞 Bread (3 products)
- 🍩 Donuts (3 products)
- 🍪 Cookies (3 products)
- 🥤 Drinks (3 products)

### 24 Products with:
- Product names
- Prices (in RWF)
- Stock levels
- Descriptions
- Images
- Ingredients

---

## 🎯 TEST FEATURES

✅ **Browse Products**
- Click on any product to see details
- View ingredients and stock

✅ **Filter & Search**
- Filter by category
- Search by product name
- Sort by price

✅ **Add to Cart**
- Click "Add to Cart"
- View cart
- Proceed to checkout

✅ **Register & Login**
- Create account
- Login
- View account dashboard

---

## 🐛 IF PRODUCTS STILL DON'T SHOW

### Check 1: MongoDB Running?
```bash
mongosh
> show databases
```
Should show `lamane_launge`

### Check 2: Products in Database?
```bash
mongosh
> use lamane_launge
> db.products.count()
```
Should show: `24`

### Check 3: Backend Running?
Terminal should show: `Server running on port 5000`

### Check 4: Frontend Errors?
Open browser console (F12) and check for errors

### Check 5: Try Again
```bash
# Kill all terminals
# Start fresh:
mongod
node seed-direct.js
npm run dev:all
```

---

## 📞 STILL HAVING ISSUES?

**Try this:**
```bash
# Terminal 1
mongod

# Terminal 2 (wait 5 seconds)
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
node seed-direct.js

# Terminal 3 (wait 5 seconds)
npm run dev:all

# Then open browser
http://localhost:5173/shop
```

---

## 🎉 THAT'S IT!

Your LAMANE Bakery & Coffee shop is now live with 24 products ready to order! 

**Enjoy!** 🍰☕
