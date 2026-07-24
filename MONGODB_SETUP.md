# MongoDB Setup Guide - LAMANE Launge

## Your Configuration

- **Host:** localhost
- **Port:** 27017
- **Database:** lamane_launge
- **Collection:** lamane_launge
- **Password:** 123 (if needed)

## 🚀 Getting Started

### Step 1: Start MongoDB

**Windows:**
```bash
# If MongoDB is installed as a service
net start MongoDB

# Or run mongod directly
mongod
```

**Mac/Linux:**
```bash
brew services start mongodb-community
# or
mongod
```

### Step 2: Verify Connection

Open MongoDB Compass or use mongo shell:
```bash
mongo mongodb://localhost:27017
```

You should see:
```
connecting to: mongodb://localhost:27017/
```

### Step 3: Create Database

The database `lamane_launge` will be created automatically when the application first writes data.

Or create manually in MongoDB Compass:
1. Click "Create Database"
2. Database name: `lamane_launge`
3. Collection name: `lamane_launge`
4. Click "Create Database"

## 📊 Database Schema

### Collections Created Automatically

#### 1. users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String (customer/admin),
  loyaltyPoints: Number,
  createdAt: Date
}
```

#### 2. products
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  ingredients: [String],
  availability: Boolean,
  stock: Number,
  rating: Number,
  reviews: Number,
  createdAt: Date
}
```

#### 3. categories
```javascript
{
  _id: ObjectId,
  name: String (unique),
  slug: String (unique),
  image: String,
  description: String,
  createdAt: Date
}
```

#### 4. orders
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  items: [
    {
      productId: ObjectId (ref: products),
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  status: String (pending/confirmed/shipped/delivered/cancelled),
  paymentMethod: String,
  deliveryAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. reviews
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  productId: ObjectId (ref: products),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

## 🔧 MongoDB Compass Setup

### Connect to Your Database

1. **Open MongoDB Compass**
2. **Connection String:**
   ```
   mongodb://localhost:27017
   ```
3. **Click Connect**

### Create Sample Data

#### Add a Category
1. Go to `lamane_launge` database
2. Create collection: `categories`
3. Insert document:
```json
{
  "name": "Pastries",
  "slug": "pastries",
  "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=300&fit=crop",
  "description": "Fresh and delicious pastries"
}
```

#### Add a Product
1. Create collection: `products`
2. Insert document:
```json
{
  "name": "Croissant",
  "category": "pastries",
  "price": 3.99,
  "description": "Buttery and flaky croissant made fresh daily",
  "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=300&fit=crop",
  "ingredients": ["flour", "butter", "salt", "water", "yeast"],
  "availability": true,
  "stock": 50,
  "rating": 4.5,
  "reviews": 12
}
```

#### Add More Products
```json
{
  "name": "Chocolate Cake",
  "category": "cakes",
  "price": 24.99,
  "description": "Rich and moist chocolate cake",
  "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop",
  "ingredients": ["flour", "cocoa", "sugar", "eggs", "butter"],
  "availability": true,
  "stock": 10,
  "rating": 4.8,
  "reviews": 25
}
```

```json
{
  "name": "Espresso",
  "category": "coffee",
  "price": 2.99,
  "description": "Strong and bold espresso shot",
  "image": "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=300&fit=crop",
  "ingredients": ["coffee beans"],
  "availability": true,
  "stock": 100,
  "rating": 4.6,
  "reviews": 45
}
```

## 🔐 Authentication Setup

### Create Admin User

Use MongoDB Compass or mongo shell:

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@lamane.com",
  password: "$2a$10$...", // bcrypt hashed password
  phone: "555-0000",
  address: "123 Admin St",
  role: "admin",
  loyaltyPoints: 0,
  createdAt: new Date()
})
```

**Note:** Password should be hashed with bcryptjs. Use the registration endpoint instead:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@lamane.com",
  "password": "admin123",
  "phone": "555-0000",
  "address": "123 Admin St"
}
```

Then manually update the role to "admin" in MongoDB Compass.

## 📈 Backup & Restore

### Backup Database
```bash
mongodump --db lamane_launge --out ./backup
```

### Restore Database
```bash
mongorestore --db lamane_launge ./backup/lamane_launge
```

## 🧹 Clean Database

### Delete All Collections
```bash
# In mongo shell
use lamane_launge
db.dropDatabase()
```

### Delete Specific Collection
```bash
# In mongo shell
use lamane_launge
db.products.deleteMany({})
```

## 📊 Useful MongoDB Queries

### Find All Products
```javascript
db.products.find({})
```

### Find Products by Category
```javascript
db.products.find({ category: "pastries" })
```

### Find Products by Price Range
```javascript
db.products.find({ price: { $gte: 5, $lte: 20 } })
```

### Update Product Stock
```javascript
db.products.updateOne(
  { _id: ObjectId("...") },
  { $set: { stock: 100 } }
)
```

### Delete Product
```javascript
db.products.deleteOne({ _id: ObjectId("...") })
```

### Count Products
```javascript
db.products.countDocuments()
```

## 🔍 Monitoring

### Check Database Size
```bash
mongosh
use lamane_launge
db.stats()
```

### Check Collection Sizes
```javascript
db.products.stats()
db.users.stats()
db.orders.stats()
```

## 🚨 Troubleshooting

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB
```bash
mongod
```

### Database Not Found
```
Error: database not found
```
**Solution:** Database is created automatically on first write. Or create manually in Compass.

### Authentication Failed
```
Error: authentication failed
```
**Solution:** Check username/password in connection string

### Port Already in Use
```
Error: bind() failed with errno:98 Address already in use
```
**Solution:** Change port or kill process using port 27017

## 📝 Connection Strings

### Local Development
```
mongodb://localhost:27017/lamane_launge
```

### With Authentication (if needed)
```
mongodb://username:password@localhost:27017/lamane_launge
```

### Atlas Cloud (for production)
```
mongodb+srv://username:password@cluster.mongodb.net/lamane_launge
```

## ✅ Verification

1. **MongoDB Running**
   ```bash
   mongosh
   # Should connect successfully
   ```

2. **Database Exists**
   ```bash
   mongosh
   show databases
   # Should show lamane_launge
   ```

3. **Collections Created**
   ```bash
   use lamane_launge
   show collections
   # Should show users, products, categories, orders, reviews
   ```

4. **Sample Data**
   ```bash
   db.products.find().pretty()
   # Should show products
   ```

## 🎯 Next Steps

1. Start MongoDB: `mongod`
2. Add sample data via MongoDB Compass
3. Start backend: `npm run dev:server`
4. Start frontend: `npm run dev`
5. Visit http://localhost:5173
6. Browse products in shop

## 📞 Support

For MongoDB issues:
- Check MongoDB logs
- Verify port 27017 is open
- Check connection string
- Use MongoDB Compass for GUI management
- Review MongoDB documentation

## 📚 Resources

- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB Compass: https://www.mongodb.com/products/compass
- Mongoose Documentation: https://mongoosejs.com/
