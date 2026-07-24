# 🔐 LAMANE - Login Credentials

## 📋 All Test Accounts

### 👤 Customer Account (Demo User)
```
Email:    demo@example.com
Password: password123
Role:     Customer
```
**Created by:** `node create-demo-user.js`  
**Access:** Shop, Cart, Checkout, Account Dashboard, Orders

---

### 👨‍💼 Admin Account
```
Email:    admin@lamane.com
Password: admin123
Role:     Admin
```
**Created by:** `node create-admin-user.js`  
**Access:** Admin Dashboard, All Management Features

---

## 🚀 Setup Instructions

### Step 1: Create Demo Customer Account
```bash
node create-demo-user.js
```
✅ Creates demo@example.com / password123

### Step 2: Create Admin Account
```bash
node create-admin-user.js
```
✅ Creates admin@lamane.com / admin123

### Step 3: Seed Products
```bash
node seed-direct.js
```
✅ Adds 22 products to database

### Step 4: Start Application
```bash
npm run dev:all
```
✅ Starts frontend (5174) + backend (5000)

---

## 🧪 Testing Different Roles

### As Customer (demo@example.com)
1. Go to http://localhost:5174/login
2. Enter: demo@example.com / password123
3. Click "Sign In"
4. You can now:
   - Browse products
   - Add to cart
   - Checkout
   - View orders
   - Access account dashboard

### As Admin (admin@lamane.com)
1. Go to http://localhost:5174/login
2. Enter: admin@lamane.com / admin123
3. Click "Sign In"
4. Click user menu → "Admin Dashboard"
5. You can now:
   - View sales overview
   - Manage products
   - Manage orders
   - Manage customers
   - View reports
   - Manage promotions
   - Manage reservations
   - Configure settings

---

## 📊 Account Details

### Demo Customer
| Field | Value |
|-------|-------|
| Name | Demo User |
| Email | demo@example.com |
| Password | password123 |
| Phone | +1 (555) 000-0000 |
| Address | 123 Main St, City, State |
| Role | customer |
| Loyalty Points | 0 |

### Admin User
| Field | Value |
|-------|-------|
| Name | Admin User |
| Email | admin@lamane.com |
| Password | admin123 |
| Phone | +250 788 123 456 |
| Address | LAMANE Headquarters, Kigali, Rwanda |
| Role | admin |
| Loyalty Points | 0 |

---

## 🔑 Password Requirements

- **Minimum Length:** 6 characters
- **Special Characters:** Not required
- **Numbers:** Not required
- **Uppercase:** Not required

---

## 🛡️ Security Notes

⚠️ **These are TEST credentials only!**
- Do NOT use in production
- Change passwords before deploying
- Use strong passwords in production
- Enable 2FA in production
- Use environment variables for credentials

---

## 🔄 Reset Credentials

### Reset Demo User
```bash
node create-demo-user.js
```
This will delete and recreate the demo account.

### Reset Admin User
```bash
node create-admin-user.js
```
This will delete and recreate the admin account.

---

## 📱 Login Page Features

✅ Email validation  
✅ Password visibility toggle (eye icon)  
✅ Error messages  
✅ Loading state  
✅ Remember me option (optional)  
✅ Forgot password link (optional)  
✅ Register link  

---

## 🎯 Quick Access Links

| Page | URL |
|------|-----|
| Login | http://localhost:5174/login |
| Register | http://localhost:5174/register |
| Shop | http://localhost:5174/shop |
| Cart | http://localhost:5174/cart |
| Account | http://localhost:5174/account |
| Admin | http://localhost:5174/admin |

---

## ✨ Features by Role

### Customer Features
- ✅ Browse products
- ✅ Filter & search
- ✅ Add to cart
- ✅ Checkout
- ✅ View orders
- ✅ Track orders
- ✅ View account
- ✅ Wishlist
- ✅ Reviews
- ✅ Loyalty program

### Admin Features
- ✅ Dashboard overview
- ✅ Product management
- ✅ Order management
- ✅ Customer management
- ✅ Promotions/Coupons
- ✅ Reservations
- ✅ Reports & Analytics
- ✅ Store locations
- ✅ Settings
- ✅ User management

---

## 🆘 Troubleshooting

### Can't Login?
1. Verify account exists: `node create-demo-user.js` or `node create-admin-user.js`
2. Check MongoDB is running: `mongod`
3. Check backend is running: `npm run dev:all`
4. Check browser console (F12) for errors

### Forgot Password?
1. Delete the user account
2. Recreate it with the setup script
3. Use new credentials

### Admin Dashboard Not Accessible?
1. Verify you're logged in as admin
2. Check role is set to "admin"
3. Verify admin account exists: `node create-admin-user.js`

---

## 📝 Notes

- Passwords are hashed with bcryptjs
- Tokens expire after 7 days
- Tokens stored in localStorage
- CORS enabled for local development
- All credentials are case-sensitive

---

**Last Updated:** 2024  
**Status:** Ready for Testing  
**Version:** 1.0.0
