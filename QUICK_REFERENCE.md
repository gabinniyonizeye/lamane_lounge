# 🎯 LAMANE - Quick Reference Card

## 🚀 SETUP COMMANDS (Copy & Paste)

```bash
# 1. Create Customer Account
node create-demo-user.js

# 2. Create Admin Account
node create-admin-user.js

# 3. Seed Products
node seed-direct.js

# 4. Start App
npm run dev:all
```

---

## 🔐 CREDENTIALS

### Customer
```
Email:    demo@example.com
Password: password123
```

### Admin
```
Email:    admin@lamane.com
Password: admin123
```

---

## 🌐 URLS

| Page | URL |
|------|-----|
| Home | http://localhost:5174 |
| Login | http://localhost:5174/login |
| Register | http://localhost:5174/register |
| Shop | http://localhost:5174/shop |
| Cart | http://localhost:5174/cart |
| Account | http://localhost:5174/account |
| Admin | http://localhost:5174/admin |
| API | http://localhost:5000/api |

---

## ✨ NEW FEATURES

✅ **Password Visibility Toggle**
- Eye icon in password fields
- Click to show/hide password
- Prevents typing errors

✅ **Login Page**
- Email validation
- Password visibility toggle
- Error messages
- Demo credentials hint

✅ **Register Page**
- Full form validation
- Password confirmation
- Visibility toggles for both passwords
- Success message

---

## 🧪 QUICK TEST

### As Customer
1. Login: demo@example.com / password123
2. Browse /shop
3. Add to cart
4. Checkout
5. Place order

### As Admin
1. Login: admin@lamane.com / admin123
2. Go to /admin
3. View dashboard
4. Manage products/orders

---

## 📊 WHAT'S INCLUDED

✅ 22 Products  
✅ 7 Categories  
✅ 2 Test Users  
✅ Shopping Cart  
✅ Checkout System  
✅ Order Management  
✅ Admin Dashboard  
✅ User Accounts  
✅ Responsive Design  

---

## 🆘 QUICK FIXES

**Can't login?**
```bash
node create-demo-user.js
node create-admin-user.js
```

**No products?**
```bash
node seed-direct.js
```

**Backend not running?**
```bash
npm run dev:all
```

**MongoDB not running?**
```bash
mongod
```

---

## 📝 NOTES

- Passwords: minimum 6 characters
- All prices in RWF
- Free delivery on orders over 30 RWF
- Demo accounts for testing only
- Change passwords before production

---

**Ready to test? Start with:** `npm run dev:all` 🚀
