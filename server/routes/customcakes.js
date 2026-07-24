import express from 'express'
import CustomCake from '../models/CustomCake.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Get all custom cakes (admin) or user's cakes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const query = req.role === 'admin' ? {} : { userId: req.userId }
    const cakes = await CustomCake.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
    res.json(cakes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single custom cake
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const cake = await CustomCake.findById(req.params.id)
      .populate('userId', 'name email phone')
    
    if (!cake) {
      return res.status(404).json({ message: 'Custom cake not found' })
    }

    // Check authorization
    if (req.role !== 'admin' && cake.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    res.json(cake)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create custom cake order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { size, flavor, filling, color, message, pickupDate, pickupTime, totalPrice, customerInfo, specialRequests } = req.body

    const cake = new CustomCake({
      userId: req.userId,
      size,
      flavor,
      filling,
      color,
      message,
      pickupDate,
      pickupTime,
      totalPrice,
      status: 'pending',
      customerInfo,
      specialRequests,
    })

    await cake.save()
    await cake.populate('userId', 'name email phone')

    res.status(201).json(cake)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update custom cake status (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body

    const cake = await CustomCake.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('userId', 'name email phone')

    res.json(cake)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Cancel custom cake order
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const cake = await CustomCake.findById(req.params.id)

    if (!cake) {
      return res.status(404).json({ message: 'Custom cake not found' })
    }

    // Check authorization
    if (req.role !== 'admin' && cake.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    // Can only cancel pending or confirmed cakes
    if (!['pending', 'confirmed'].includes(cake.status)) {
      return res.status(400).json({ message: 'Cannot cancel this order' })
    }

    cake.status = 'cancelled'
    cake.updatedAt = new Date()
    await cake.save()

    res.json(cake)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
