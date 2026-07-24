import mongoose from 'mongoose';

const loyaltySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  points: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  rewardsRedeemed: [{
    type: String,
    enum: ['free_coffee', 'discount_20', 'free_cake']
  }],
  redeemedAt: [Date],
  birthday: Date,
  birthdayDiscountUsed: {
    type: Boolean,
    default: false
  },
  tier: {
    type: String,
    enum: ['bronze', 'silver', 'gold'],
    default: 'bronze'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Loyalty', loyaltySchema);
