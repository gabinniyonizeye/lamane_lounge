import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Loyalty from '../models/Loyalty.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all customers
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get customer details
router.get('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select('-password');
    const orders = await Order.find({ userId: req.params.id });
    const loyalty = await Loyalty.findOne({ userId: req.params.id });

    res.json({
      customer,
      orders,
      loyalty
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get customer order history
router.get('/:id/orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Adjust loyalty points
router.patch('/:id/loyalty-points', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { points, reason } = req.body;
    
    let loyalty = await Loyalty.findOne({ userId: req.params.id });
    if (!loyalty) {
      loyalty = new Loyalty({ userId: req.params.id });
    }

    loyalty.points += points;
    await loyalty.save();

    res.json(loyalty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get customer statistics
router.get('/stats/summary', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const newThisMonth = await User.countDocuments({
      role: 'customer',
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: '$userId',
          totalSpent: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      totalCustomers,
      newThisMonth,
      topCustomers
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
