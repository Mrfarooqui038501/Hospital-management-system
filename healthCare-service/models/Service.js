const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['OPD', 'DENTAL', 'CARDIOLOGY', 'DERMATOLOGY', 'PEDIATRICS', 'OTHER']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  waitingTime: {
    type: Number,
    min: 0,
    default: 0
  }
}, {
  timestamps: true
});

serviceSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Service', serviceSchema);