import mongoose from 'mongoose';

const adminSettingsSchema = new mongoose.Schema({
  storeName: String,
  storeEmail: String,
  storePhone: String,
  storeAddress: String,
  logo: String,
  favicon: String,
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    whatsapp: String
  },
  deliveryFees: {
    standard: Number,
    express: Number,
    freeAbove: Number
  },
  paymentSettings: {
    acceptCash: Boolean,
    acceptCard: Boolean,
    acceptMobilePayment: Boolean
  },
  taxSettings: {
    taxRate: Number,
    taxId: String
  },
  businessHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  currency: {
    type: String,
    default: 'RWF'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('AdminSettings', adminSettingsSchema);
