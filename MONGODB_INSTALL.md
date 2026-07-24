# 📦 MONGODB INSTALLATION GUIDE FOR WINDOWS

## ⚠️ MongoDB is Not Installed

You need to install MongoDB Community Edition first.

---

## 🚀 OPTION 1: QUICK INSTALL (Recommended)

### Step 1: Download MongoDB
Go to: https://www.mongodb.com/try/download/community

**Select:**
- Version: Latest (e.g., 7.0.x)
- Platform: Windows
- Package: MSI

Click **Download**

### Step 2: Run Installer
1. Double-click the downloaded `.msi` file
2. Click **Next** through the installation wizard
3. Accept the license agreement
4. Choose **Complete** installation
5. Check "Install MongoDB as a Service"
6. Click **Install**
7. Click **Finish**

### Step 3: Verify Installation
Open PowerShell and run:
```powershell
mongod --version
```

You should see the version number.

---

## 🚀 OPTION 2: USING CHOCOLATEY (If you have it)

```powershell
choco install mongodb-community
```

---

## 🚀 OPTION 3: USING DOCKER (Advanced)

If you have Docker installed:

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## ✅ VERIFY MONGODB IS WORKING

### Test 1: Check mongod command
```powershell
mongod --version
```

### Test 2: Start MongoDB
```powershell
mongod
```

You should see:
```
[initandlisten] waiting for connections on port 27017
```

### Test 3: Connect with mongosh
In another PowerShell window:
```powershell
mongosh
```

You should see:
```
test>
```

---

## 🔧 IF INSTALLATION FAILS

### Check if MongoDB is already installed
```powershell
Get-Command mongod
```

If it shows a path, MongoDB is installed but not in PATH.

### Add MongoDB to PATH manually
1. Find MongoDB installation folder (usually `C:\Program Files\MongoDB\Server\7.0\bin`)
2. Copy the path
3. Open Environment Variables:
   - Press `Win + X`
   - Select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find "Path"
   - Click "Edit"
   - Click "New"
   - Paste the MongoDB bin path
   - Click "OK" on all dialogs
4. Restart PowerShell
5. Try `mongod --version` again

---

## 🎯 AFTER INSTALLATION

Once MongoDB is installed, run these commands:

**Terminal 1:**
```powershell
mongod
```

**Terminal 2:**
```powershell
cd "d:\my_website\LAMANE project\lamane_bakery_coffee"
node seed-direct.js
```

**Terminal 3:**
```powershell
npm run dev:all
```

Then open: `http://localhost:5173/shop`

---

## 📝 TROUBLESHOOTING

### "mongod: The term is not recognized"
- MongoDB is not installed
- Follow Option 1 above

### "Port 27017 already in use"
- MongoDB is already running
- Or another service is using that port
- Try: `netstat -ano | findstr :27017`

### "Connection refused"
- Make sure `mongod` is running in Terminal 1
- Wait 5 seconds after starting mongod

### "Database not found"
- Run `node seed-direct.js` to create database and add products

---

## ✨ QUICK REFERENCE

```powershell
# Check if installed
mongod --version

# Start MongoDB
mongod

# Connect to MongoDB (in another terminal)
mongosh

# Add products to database
node seed-direct.js

# Start application
npm run dev:all
```

---

## 🎉 ONCE INSTALLED

Your LAMANE Bakery & Coffee shop will be ready with 24 products!

**Go to:** http://localhost:5173/shop

---

**Need help?** Make sure:
1. ✅ MongoDB is installed
2. ✅ `mongod` command works
3. ✅ MongoDB is running (Terminal 1)
4. ✅ Products are seeded (Terminal 2)
5. ✅ Application is running (Terminal 3)
