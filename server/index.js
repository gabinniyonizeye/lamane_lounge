import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import categoryRoutes from './routes/categories.js'
import orderRoutes from './routes/orders.js'
import reviewRoutes from './routes/reviews.js'
import customCakeRoutes from './routes/customcakes.js'
import reservationRoutes from './routes/reservations.js'
import loyaltyRoutes from './routes/loyalty.js'
import chatRoutes from './routes/chat.js'
import wishlistRoutes from './routes/wishlist.js'
import adminRoutes from './routes/admin.js'
import productsAdminRoutes from './routes/products-admin.js'
import ordersAdminRoutes from './routes/orders-admin.js'
import customersAdminRoutes from './routes/customers-admin.js'
import couponsRoutes from './routes/coupons.js'
import locationsRoutes from './routes/locations.js'
import settingsRoutes from './routes/settings.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/custom-cakes', customCakeRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/loyalty', loyaltyRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/admin/products', productsAdminRoutes)
app.use('/api/admin/orders', ordersAdminRoutes)
app.use('/api/admin/customers', customersAdminRoutes)
app.use('/api/coupons', couponsRoutes)
app.use('/api/locations', locationsRoutes)
app.use('/api/settings', settingsRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' })
})
