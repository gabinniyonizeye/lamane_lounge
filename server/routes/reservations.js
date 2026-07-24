import express from 'express'
import Reservation from '../models/Reservation.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Get all reservations (admin) or user's reservations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const query = req.role === 'admin' ? {} : { userId: req.userId }
    const reservations = await Reservation.find(query)
      .populate('userId', 'name email phone')
      .sort({ date: 1 })
    res.json(reservations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single reservation
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('userId', 'name email phone')
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' })
    }

    // Check authorization
    if (req.role !== 'admin' && reservation.userId && reservation.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    res.json(reservation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create reservation
router.post('/', async (req, res) => {
  try {
    const { date, time, guests, type, customerInfo, specialRequests } = req.body

    const reservation = new Reservation({
      userId: req.userId || null,
      date,
      time,
      guests,
      type,
      status: 'pending',
      customerInfo,
      specialRequests,
    })

    await reservation.save()

    res.status(201).json(reservation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update reservation status (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('userId', 'name email phone')

    res.json(reservation)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Cancel reservation
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' })
    }

    // Check authorization
    if (req.role !== 'admin' && reservation.userId && reservation.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    // Can only cancel pending or confirmed reservations
    if (!['pending', 'confirmed'].includes(reservation.status)) {
      return res.status(400).json({ message: 'Cannot cancel this reservation' })
    }

    reservation.status = 'cancelled'
    reservation.updatedAt = new Date()
    await reservation.save()

    res.json(reservation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
