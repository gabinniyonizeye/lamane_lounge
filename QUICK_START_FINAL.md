# 🎉 LAMANE - Quick Start (5 Minutes)

## Prerequisites
- MongoDB running (`mongod`)
- Node.js installed
- npm packages installed (`npm install`)

## 3-Step Startup

### Step 1: Create Demo User (1 minute)
```bash
node create-demo-user.js
```
✅ Creates demo@example.com / password123

### Step 2: Seed Products (1 minute)
```bash
node seed-direct.js
```
✅ Adds 22 products to database

### Step 3: Start App (1 minute)
```bash
npm run dev:all
```
✅ Starts frontend (5174) + backend (5000)

---

## 🌐 Access Points

| Component | URL |
|-----------|-----|
| **Frontend** | http://localhost:5174 |
| **Backend API** | http://localhost:5000/api |
| **MongoDB** | localhost:27017 |

---

## 🧪 Quick Test

1. **Open** http://localhost:5174
2. **Click** "Shop" → See 22 products
3. **Add** product to cart
4. **Click** user icon → "Login"
5. **Enter** demo@example.com / password123
6. **Go to** cart → "Proceed to Checkout"
7. **Fill** form → "Place Order"
8. ✅ **Success!** Order confirmation page

---

## 📋 Demo Credentials

```
Email:    demo@example.com
Password: password123
```

---

## 🆘 If Something Breaks

### Products not showing?
```bash
node seed-direct.js
```

### Can't login?
```bash
node create-demo-user.js
```

### Backend not responding?
```bash
npm run dev:all
```

### MongoDB not connecting?
```bash
mongod
```

---

## ✨ Features Ready to Test

✅ Browse products with filters  
✅ Add to cart  
✅ Login/Register  
✅ Multi-step checkout  
✅ Order confirmation  
✅ User account dashboard  
✅ Responsive design  

---

**Everything is ready! Start with Step 1 above.** 🚀
