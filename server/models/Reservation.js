import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    required: true,
  },
  time: String,
  guests: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['table', 'birthday', 'business', 'family'],
    default: 'table',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
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

export default mongoose.model('Reservation', reservationSchema)
