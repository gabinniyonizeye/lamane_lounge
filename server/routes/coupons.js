import express from 'express';
import Coupon from '../models/Coupon.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all coupons
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create coupon
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update coupon
router.patch('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete coupon
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Validate coupon (customer)
router.post('/validate', async (req, res) => {
  try {
    const { code, amount } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    if (!coupon.active) {
      return res.status(400).json({ error: 'Coupon is inactive' });
    }

    if (new Date() > coupon.expirationDate) {
      return res.status(400).json({ error: 'Coupon expired' });
    }

    if (coupon.maxUsage && coupon.currentUsage >= coupon.maxUsage) {
      return res.status(400).json({ error: 'Coupon usage limit reached' });
    }

    if (amount < coupon.minPurchaseAmount) {
      return res.status(400).json({ error: `Minimum purchase: ${coupon.minPurchaseAmount}` });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (amount * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    res.json({ valid: true, discount, coupon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Use coupon
router.patch('/:id/use', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { $inc: { currentUsage: 1 } },
      { new: true }
    );
    res.json(coupon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
