import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard stats
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    // Today's stats
    const todayOrders = await Order.find({
      createdAt: { $gte: today }
    });
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

    // This week stats
    const weekOrders = await Order.find({
      createdAt: { $gte: thisWeekStart }
    });
    const weekRevenue = weekOrders.reduce((sum, order) => sum + order.total, 0);

    // This month stats
    const monthOrders = await Order.find({
      createdAt: { $gte: thisMonthStart }
    });
    const monthRevenue = monthOrders.reduce((sum, order) => sum + order.total, 0);

    // Quick stats
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const activeOrders = await Order.countDocuments({ status: { $in: ['confirmed', 'preparing', 'out_for_delivery'] } });
    const unpaidOrders = await Order.countDocuments({ paymentStatus: 'pending' });
    const paidRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    res.json({
      today: { orders: todayOrders.length, revenue: todayRevenue },
      week: { orders: weekOrders.length, revenue: weekRevenue },
      month: { orders: monthOrders.length, revenue: monthRevenue },
      totals: {
        orders: totalOrders,
        revenue: totalRevenue[0]?.total || 0,
        products: totalProducts,
        customers: totalCustomers,
        pendingOrders,
        activeOrders,
        unpaidOrders,
        paidRevenue: paidRevenue[0]?.total || 0,
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get recent orders
router.get('/recent-orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get low stock products
router.get('/low-stock', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const products = await Product.find({
      stock: { $lt: 10 }
    }).sort({ stock: 1 });
    
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get sales chart data
router.get('/sales-chart', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: last30Days }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
