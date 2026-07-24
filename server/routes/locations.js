import express from 'express';
import StoreLocation from '../models/StoreLocation.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await StoreLocation.find({ active: true });
    res.json(locations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await StoreLocation.findById(req.params.id);
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create location (admin)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const location = new StoreLocation(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update location (admin)
router.patch('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const location = await StoreLocation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete location (admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await StoreLocation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Location deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get main branch
router.get('/main/branch', async (req, res) => {
  try {
    const mainBranch = await StoreLocation.findOne({ isMainBranch: true });
    res.json(mainBranch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
