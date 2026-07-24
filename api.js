import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './server/config/db.js'
import authRoutes from './server/routes/auth.js'
import productRoutes from './server/routes/products.js'
import categoryRoutes from './server/routes/categories.js'
import orderRoutes from './server/routes/orders.js'
import reviewRoutes from './server/routes/reviews.js'
import customCakeRoutes from './server/routes/customcakes.js'
import reservationRoutes from './server/routes/reservations.js'
import loyaltyRoutes from './server/routes/loyalty.js'
import chatRoutes from './server/routes/chat.js'
import wishlistRoutes from './server/routes/wishlist.js'
import adminRoutes from './server/routes/admin.js'
import productsAdminRoutes from './server/routes/products-admin.js'
import ordersAdminRoutes from './server/routes/orders-admin.js'
import customersAdminRoutes from './server/routes/customers-admin.js'
import couponsRoutes from './server/routes/coupons.js'
import locationsRoutes from './server/routes/locations.js'
import settingsRoutes from './server/routes/settings.js'

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

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
