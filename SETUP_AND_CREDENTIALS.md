# 🎯 LAMANE - Complete Setup & Credentials Guide

## 🚀 Quick Setup (5 Minutes)

### Prerequisites
- MongoDB running: `mongod`
- Node.js installed
- npm packages installed: `npm install`

---

## 📋 Step-by-Step Setup

### Step 1️⃣: Create Demo Customer Account
```bash
node create-demo-user.js
```
**Output:**
```
✅ Demo user created successfully!

📧 Login Credentials:
   Email: demo@example.com
   Password: password123
```

### Step 2️⃣: Create Admin Account
```bash
node create-admin-user.js
```
**Output:**
```
✅ Admin user created successfully!

📧 Admin Login Credentials:
   Email: admin@lamane.com
   Password: admin123

🔗 Admin Dashboard: http://localhost:5174/admin
```

### Step 3️⃣: Seed Products
```bash
node seed-direct.js
```
**Output:**
```
✅ Database seeded successfully!
   - Categories: 7
   - Products: 22

🎉 You can now see products in the shop!
   Go to: http://localhost:5174/shop
```

### Step 4️⃣: Start Application
```bash
npm run dev:all
```
**Output:**
```
[0] VITE v5.4.21 ready in 558 ms
[0] ➜ Local: http://localhost:5174/

[1] Server running on port 5000
[1] MongoDB connected
```

---

## 🔐 Login Credentials

### 👤 Customer Account
```
┌─────────────────────────────────┐
│ CUSTOMER LOGIN CREDENTIALS      │
├─────────────────────────────────┤
│ Email:    demo@example.com      │
│ Password: password123           │
│ Role:     Customer              │
└─────────────────────────────────┘
```

**Access:**
- Shop & Browse Products
- Add to Cart
- Checkout
- View Orders
- Account Dashboard
- Wishlist
- Reviews

---

### 👨💼 Admin Account
```
┌─────────────────────────────────┐
│ ADMIN LOGIN CREDENTIALS         │
├─────────────────────────────────┤
│ Email:    admin@lamane.com      │
│ Password: admin123              │
│ Role:     Admin                 │
└─────────────────────────────────┘
```

**Access:**
- Admin Dashboard
- Sales Overview
- Product Management
- Order Management
- Customer Management
- Promotions & Coupons
- Reservations
- Reports & Analytics
- Store Locations
- Settings

---

## 🌐 Access Points

| Component | URL |
|-----------|-----|
| **Frontend** | http://localhost:5174 |
| **Login Page** | http://localhost:5174/login |
| **Shop** | http://localhost:5174/shop |
| **Cart** | http://localhost:5174/cart |
| **Account** | http://localhost:5174/account |
| **Admin Dashboard** | http://localhost:5174/admin |
| **Backend API** | http://localhost:5000/api |
| **MongoDB** | localhost:27017 |

---

## 🧪 Testing Workflow

### 1. Test as Customer
```
1. Go to http://localhost:5174/login
2. Enter: demo@example.com / password123
3. Click "Sign In"
4. Browse products at /shop
5. Add items to cart
6. Go to /cart
7. Click "Proceed to Checkout"
8. Fill checkout form
9. Place order
10. View order confirmation
```

### 2. Test as Admin
```
1. Go to http://localhost:5174/login
2. Enter: admin@lamane.com / admin123
3. Click "Sign In"
4. Click user menu → "Admin Dashboard"
5. View sales overview
6. Manage products
7. Manage orders
8. View reports
```

### 3. Test Registration
```
1. Go to http://localhost:5174/register
2. Fill in all fields
3. Use password visibility toggle (eye icon)
4. Confirm password matches
5. Click "Create Account"
6. Auto-login and redirect to home
```

---

## ✨ New Features Added

### Password Visibility Toggle
✅ Eye icon in password fields  
✅ Click to show/hide password  
✅ Available in Login page  
✅ Available in Register page  
✅ Helps prevent typing errors  

### Login Page
✅ Email input with validation  
✅ Password input with visibility toggle  
✅ Error message display  
✅ Loading state  
✅ Demo credentials hint  
✅ Register link  

### Register Page
✅ Full name input  
✅ Email input with validation  
✅ Phone input  
✅ Address input  
✅ Password input with visibility toggle  
✅ Confirm password with visibility toggle  
✅ Password confirmation validation  
✅ Error handling  
✅ Success message  
✅ Login link  

---

## 🔑 Password Requirements

- **Minimum Length:** 6 characters
- **Special Characters:** Not required
- **Numbers:** Not required
- **Uppercase:** Not required
- **Lowercase:** Not required

**Examples:**
- ✅ password123
- ✅ admin123
- ✅ test1234
- ✅ mypass99

---

## 🛡️ Security Features

✅ Passwords hashed with bcryptjs  
✅ JWT tokens for authentication  
✅ Protected routes with middleware  
✅ CORS enabled  
✅ Admin role-based access control  
✅ Input validation on all forms  
✅ Error messages don't leak info  

---

## 🆘 Troubleshooting

### Can't Login?
```bash
# Recreate demo user
node create-demo-user.js

# Recreate admin user
node create-admin-user.js

# Check MongoDB is running
mongod

# Check backend is running
npm run dev:all
```

### Products Not Showing?
```bash
# Reseed products
node seed-direct.js

# Check API
curl http://localhost:5000/api/products
```

### Admin Dashboard Not Accessible?
```bash
# Verify admin account exists
node create-admin-user.js

# Login with admin credentials
# admin@lamane.com / admin123
```

### Password Visibility Toggle Not Working?
1. Check browser console (F12)
2. Refresh page
3. Clear browser cache
4. Try different browser

---

## 📊 Database Collections

After setup, your database will have:

```
lamane_launge (Database)
├── users (2 documents)
│   ├── demo@example.com (customer)
│   └── admin@lamane.com (admin)
├── products (22 documents)
├── categories (7 documents)
├── orders (empty, created on checkout)
├── reviews (empty)
├── loyalty (empty)
├── chat (empty)
├── wishlist (empty)
├── customcakes (empty)
├── reservations (empty)
├── coupons (empty)
├── storelocation (empty)
└── adminsettings (empty)
```

---

## 🎯 Next Steps

1. ✅ Run setup commands (Steps 1-4)
2. ✅ Test customer workflow
3. ✅ Test admin workflow
4. ✅ Test registration
5. ⏳ Implement payment gateway
6. ⏳ Add email notifications
7. ⏳ Deploy to production

---

## 📝 Important Notes

⚠️ **These are TEST credentials only!**
- Do NOT use in production
- Change passwords before deploying
- Use strong passwords in production
- Enable 2FA in production
- Use environment variables for credentials

---

## ✅ Verification Checklist

- [ ] MongoDB running
- [ ] Demo user created
- [ ] Admin user created
- [ ] Products seeded
- [ ] App started
- [ ] Can login as customer
- [ ] Can login as admin
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can checkout
- [ ] Can access admin dashboard
- [ ] Password visibility toggle works

---

## 🎉 You're All Set!

Everything is ready to test. Start with:

```bash
npm run dev:all
```

Then visit: **http://localhost:5174**

---

**Last Updated:** 2024  
**Status:** Ready for Testing  
**Version:** 1.0.0
