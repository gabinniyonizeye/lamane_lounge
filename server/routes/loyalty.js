import express from 'express';
import Loyalty from '../models/Loyalty.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get loyalty info
router.get('/', authMiddleware, async (req, res) => {
  try {
    let loyalty = await Loyalty.findOne({ userId: req.userId });
    
    if (!loyalty) {
      loyalty = new Loyalty({ userId: req.userId });
      await loyalty.save();
    }
    
    res.json(loyalty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add points (called after order)
router.post('/add-points', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const points = Math.floor(amount / 100);
    
    let loyalty = await Loyalty.findOne({ userId: req.userId });
    if (!loyalty) {
      loyalty = new Loyalty({ userId: req.userId });
    }
    
    loyalty.points += points;
    loyalty.totalSpent += amount;
    
    // Update tier
    if (loyalty.totalSpent >= 500000) loyalty.tier = 'gold';
    else if (loyalty.totalSpent >= 200000) loyalty.tier = 'silver';
    
    await loyalty.save();
    res.json(loyalty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Redeem reward
router.post('/redeem', authMiddleware, async (req, res) => {
  try {
    const { reward } = req.body;
    const pointsNeeded = {
      'free_coffee': 10,
      'discount_20': 25,
      'free_cake': 50
    };
    
    let loyalty = await Loyalty.findOne({ userId: req.userId });
    if (!loyalty) {
      return res.status(400).json({ error: 'Loyalty account not found' });
    }
    
    if (loyalty.points < pointsNeeded[reward]) {
      return res.status(400).json({ error: 'Insufficient points' });
    }
    
    loyalty.points -= pointsNeeded[reward];
    loyalty.rewardsRedeemed.push(reward);
    loyalty.redeemedAt.push(new Date());
    
    await loyalty.save();
    res.json(loyalty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Check birthday discount
router.get('/birthday-check', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    let loyalty = await Loyalty.findOne({ userId: req.userId });
    
    if (!loyalty) {
      loyalty = new Loyalty({ userId: req.userId });
      await loyalty.save();
    }
    
    if (!user.birthday) {
      return res.json({ eligible: false, message: 'Birthday not set' });
    }
    
    const today = new Date();
    const birthDate = new Date(user.birthday);
    const isBirthday = today.getMonth() === birthDate.getMonth() && 
                       today.getDate() === birthDate.getDate();
    
    if (isBirthday && !loyalty.birthdayDiscountUsed) {
      res.json({ eligible: true, discount: 20 });
    } else {
      res.json({ eligible: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Use birthday discount
router.post('/use-birthday-discount', authMiddleware, async (req, res) => {
  try {
    let loyalty = await Loyalty.findOne({ userId: req.userId });
    if (!loyalty) {
      loyalty = new Loyalty({ userId: req.userId });
    }
    
    loyalty.birthdayDiscountUsed = true;
    await loyalty.save();
    
    res.json(loyalty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
