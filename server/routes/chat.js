import express from 'express';
import Chat from '../models/Chat.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Start chat
router.post('/start', async (req, res) => {
  try {
    const { userEmail, subject } = req.body;
    const conversationId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const chat = new Chat({
      conversationId,
      userEmail,
      subject,
      userId: req.userId || null
    });
    
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Send message
router.post('/:conversationId/message', async (req, res) => {
  try {
    const { message, sender } = req.body;
    
    const chat = await Chat.findOneAndUpdate(
      { conversationId: req.params.conversationId },
      {
        $push: {
          messages: {
            sender,
            message,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    res.json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get chat
router.get('/:conversationId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ conversationId: req.params.conversationId });
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    res.json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all chats (admin)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Close chat
router.patch('/:conversationId/close', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      { conversationId: req.params.conversationId },
      { status: 'closed' },
      { new: true }
    );
    
    res.json(chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
