import express from 'express';
import Order from '../models/Order.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all orders
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = {};

    if (status) query.status = status;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update operational and payment status; every change is kept as an audit trail.
router.patch('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, paymentStatus, paymentReference, note } = req.body;
    const allowedStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
    const allowedPayments = ['pending', 'paid', 'failed', 'refunded'];
    if (status && !allowedStatuses.includes(status)) return res.status(400).json({ error: 'Invalid order status' });
    if (paymentStatus && !allowedPayments.includes(paymentStatus)) return res.status(400).json({ error: 'Invalid payment status' });
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (paymentReference !== undefined) order.paymentReference = paymentReference;
    order.updatedAt = new Date();
    order.statusHistory.push({ status: order.status, paymentStatus: order.paymentStatus, note: note || '', changedBy: req.userId });
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Export orders to CSV
router.get('/export/csv', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .lean();

    let csv = 'Order ID,Customer,Email,Total,Status,Date\n';
    orders.forEach(order => {
      csv += `${order._id},${order.userId?.name || ''},${order.userId?.email || ''},${order.total},${order.status},${order.createdAt}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=orders.csv');
    res.send(csv);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get order statistics
router.get('/stats/summary', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          revenue: { $sum: '$total' }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get order by ID after static routes so `/export/csv` is not treated as an ID.
router.get('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('items.productId').populate('statusHistory.changedBy', 'name email');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

export default router;
