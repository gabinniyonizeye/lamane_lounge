import express from 'express';
import Wishlist from '../models/Wishlist.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get wishlist
router.get('/', authMiddleware, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId })
      .populate('products.productId');
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId });
      await wishlist.save();
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add to wishlist
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    
    let wishlist = await Wishlist.findOne({ userId: req.userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId });
    }
    
    const exists = wishlist.products.some(p => p.productId.toString() === productId);
    if (!exists) {
      wishlist.products.push({ productId });
    }
    
    await wishlist.save();
    await wishlist.populate('products.productId');
    
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove from wishlist
router.post('/remove', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { products: { productId } } },
      { new: true }
    ).populate('products.productId');
    
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Check if product in wishlist
router.get('/check/:productId', authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.userId });
    
    if (!wishlist) {
      return res.json({ inWishlist: false });
    }
    
    const inWishlist = wishlist.products.some(
      p => p.productId.toString() === req.params.productId
    );
    
    res.json({ inWishlist });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
