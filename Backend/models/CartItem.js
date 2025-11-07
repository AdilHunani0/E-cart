import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  userId: {
    type: String,
    default: 'guest'
  }
}, {
  timestamps: true
});

export default mongoose.model('CartItem', cartItemSchema);

