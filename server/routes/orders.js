import express from 'express'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Get all orders (admin) or user's orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const query = req.role === 'admin' ? {} : { userId: req.userId }
    const orders = await Order.find(query)
      .populate('userId', 'name email phone')
      .populate('items.productId', 'name price image')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('items.productId', 'name price image')
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Check authorization
    if (req.role !== 'admin' && order.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, paymentMethod, deliveryType, deliveryAddress, customerInfo, instructions } = req.body

    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: 'Your order must contain at least one item' })
    }

    const productIds = items.map(item => item.productId || item._id)
    const products = await Product.find({ _id: { $in: productIds }, availability: true })
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'One or more products are unavailable' })
    }

    const productsById = new Map(products.map(product => [product._id.toString(), product]))
    const verifiedItems = items.map(item => {
      const product = productsById.get((item.productId || item._id).toString())
      const quantity = Number(item.quantity)
      if (!Number.isInteger(quantity) || quantity < 1 || (product.stock > 0 && quantity > product.stock)) {
        throw new Error(`Invalid quantity for ${product.name}`)
      }
      return { productId: product._id, quantity, price: product.price }
    })
    const subtotal = verifiedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    // Keep this rule on the server so checkout totals cannot be manipulated in the browser.
    const deliveryFee = 0
    const total = subtotal + deliveryFee

    const order = new Order({
      userId: req.userId,
      items: verifiedItems,
      total,
      status: 'pending',
      paymentMethod,
      deliveryType,
      deliveryAddress,
      customerInfo,
      instructions,
      paymentStatus: 'pending',
      statusHistory: [{ status: 'pending', paymentStatus: 'pending', note: 'Order created by customer', changedBy: req.userId }],
    })

    await order.save()
    await order.populate('items.productId', 'name price image')

    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update order status (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('items.productId', 'name price image')

    res.json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Cancel order
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Check authorization
    if (req.role !== 'admin' && order.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    // Can only cancel pending or confirmed orders
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({ message: 'Cannot cancel this order' })
    }

    order.status = 'cancelled'
    order.updatedAt = new Date()
    await order.save()

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
