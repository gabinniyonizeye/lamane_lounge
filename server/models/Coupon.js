import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  maxUsage: {
    type: Number,
    default: null
  },
  currentUsage: {
    type: Number,
    default: 0
  },
  applicableCategories: [String],
  applicableProducts: [mongoose.Schema.Types.ObjectId],
  minPurchaseAmount: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Coupon', couponSchema);
