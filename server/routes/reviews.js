import express from 'express';
import Review from '../models/Review.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productId, rating, title, comment, photo } = req.body;
    
    const review = new Review({
      productId,
      userId: req.userId,
      rating,
      title,
      comment,
      photo
    });
    
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get reviews for product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
      approved: true
    }).populate('userId', 'name').sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get pending reviews (admin)
router.get('/admin/pending', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ approved: false })
      .populate('userId', 'name email')
      .populate('productId', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Approve review (admin)
router.patch('/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Hide review (admin)
router.patch('/:id/hide', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: false },
      { new: true }
    );
    
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark helpful
router.patch('/:id/helpful', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpful: 1 } },
      { new: true }
    );
    
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
