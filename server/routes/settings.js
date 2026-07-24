import express from 'express';
import AdminSettings from '../models/AdminSettings.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get settings
router.get('/', async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = new AdminSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update settings (admin)
router.patch('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = new AdminSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    settings.updatedAt = new Date();
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get delivery fees
router.get('/delivery/fees', async (req, res) => {
  try {
    const settings = await AdminSettings.findOne();
    res.json(settings?.deliveryFees || {});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get business hours
router.get('/hours/business', async (req, res) => {
  try {
    const settings = await AdminSettings.findOne();
    res.json(settings?.businessHours || {});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
