import mongoose from 'mongoose'

const customCakeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  size: {
    type: String,
    enum: ['6', '8', '10', '12'],
    required: true,
  },
  flavor: {
    type: String,
    enum: ['vanilla', 'chocolate', 'strawberry', 'redvelvet', 'carrot'],
    required: true,
  },
  filling: {
    type: String,
    enum: ['buttercream', 'creamcheese', 'ganache', 'fruit'],
    required: true,
  },
  color: String,
  message: String,
  inspirationPhoto: String,
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupTime: String,
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'cancelled'],
    default: 'pending',
  },
  customerInfo: {
    fullName: String,
    email: String,
    phone: String,
  },
  specialRequests: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('CustomCake', customCakeSchema)
