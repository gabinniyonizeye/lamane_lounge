# 🚀 LAMANE BAKERY & COFFEE - FINAL STARTUP GUIDE

## ✅ MongoDB Found!

MongoDB is installed at: `C:\Program Files\MongoDB\Server\8.2`

I've created 3 batch files to make startup easy!

---

## 🎯 EASIEST WAY - USE BATCH FILES

### Step 1: Open 3 Command Prompts

**Command Prompt 1 - Start MongoDB:**
```
Double-click: start-mongodb.bat
```

Wait for message: `waiting for connections on port 27017`

**Command Prompt 2 - Seed Database (wait 5 seconds):**
```
Double-click: seed-products.bat
```

Wait for message: `✅ Database seeded successfully!`

**Command Prompt 3 - Start Application (wait 5 seconds):**
```
Double-click: start-app.bat
```

Wait for message: `VITE ready in xxx ms`

### Step 2: Open Browser
```
http://localhost:5173/shop
```

You should see **24 products**! ✅

---

## 📁 BATCH FILES CREATED

### 1. `start-mongodb.bat`
- Starts MongoDB server
- Runs from: `C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe`
- Keep this running

### 2. `seed-products.bat`
- Adds 24 products to database
- Adds 7 categories
- Run after MongoDB starts

### 3. `start-app.bat`
- Starts backend and frontend
- Runs: `npm run dev:all`
- Run after seeding

---

## 🎯 MANUAL WAY (If batch files don't work)

### Terminal 1: Start MongoDB
```powershell
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe"
```

### Terminal 2: Seed Database
```powershell
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
node seed-direct.js
```

### Terminal 3: Start Application
```powershell
npm run dev:all
```

---

## ✅ VERIFICATION

### Check 1: MongoDB Running?
You should see in Terminal 1:
```
[initandlisten] waiting for connections on port 27017
```

### Check 2: Products Added?
You should see in Terminal 2:
```
✅ Database seeded successfully!
   - Categories: 7
   - Products: 24
```

### Check 3: Application Running?
You should see in Terminal 3:
```
Server running on port 5000
VITE v5.4.21 ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Check 4: Products Showing?
Open: `http://localhost:5173/shop`

You should see 24 products displayed! 🎉

---

## 🛍️ WHAT YOU CAN DO NOW

✅ **Browse 24 Products**
- Coffee, Pastries, Cakes, Bread, Donuts, Cookies, Drinks

✅ **Filter & Search**
- By category
- By price
- By name

✅ **Add to Cart**
- Select quantity
- Add to cart
- View cart

✅ **Register & Login**
- Create account
- Login
- View dashboard

✅ **Full Features**
- Loyalty program
- Reviews
- Wishlist
- Order tracking
- Chat support
- Admin dashboard

---

## 🎯 QUICK REFERENCE

| File | Purpose | Run First? |
|------|---------|-----------|
| start-mongodb.bat | Start MongoDB | ✅ YES (1st) |
| seed-products.bat | Add products | ✅ YES (2nd) |
| start-app.bat | Start app | ✅ YES (3rd) |

---

## 🚨 TROUBLESHOOTING

### "MongoDB failed to start"
- Make sure no other MongoDB is running
- Try: `taskkill /IM mongod.exe /F`
- Then try again

### "Products not added"
- Make sure MongoDB is running first
- Check Terminal 1 shows: `waiting for connections`
- Then run seed-products.bat

### "Application won't start"
- Make sure MongoDB is running
- Make sure products are seeded
- Check Terminal 3 for errors

### "Still showing 0 products"
- Refresh browser (F5)
- Check browser console (F12) for errors
- Make sure all 3 terminals are running

---

## 📊 PRODUCTS INCLUDED

### Coffee (4)
- Espresso - 2,500 RWF
- Cappuccino - 4,000 RWF
- Latte - 4,500 RWF
- Americano - 3,000 RWF

### Pastries (3)
- Croissant - 3,500 RWF
- Danish Pastry - 4,000 RWF
- Muffin - 3,000 RWF

### Cakes (3)
- Chocolate Cake - 15,000 RWF
- Vanilla Cake - 12,000 RWF
- Strawberry Cake - 14,000 RWF

### Bread (3)
- Whole Wheat Bread - 5,000 RWF
- White Bread - 4,500 RWF
- Sourdough - 6,000 RWF

### Donuts (3)
- Glazed Donut - 2,500 RWF
- Chocolate Donut - 3,000 RWF
- Sprinkle Donut - 3,000 RWF

### Cookies (3)
- Chocolate Chip Cookie - 2,000 RWF
- Oatmeal Cookie - 2,000 RWF
- Sugar Cookie - 1,500 RWF

### Drinks (3)
- Iced Coffee - 3,500 RWF
- Hot Chocolate - 3,500 RWF
- Smoothie - 4,500 RWF

---

## 🎉 YOU'RE READY!

Just double-click the 3 batch files in order and your shop will be live!

**Enjoy your LAMANE Bakery & Coffee application!** ☕🍰
