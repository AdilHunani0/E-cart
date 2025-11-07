import express from 'express';
import Order from '../models/Order.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const router = express.Router();

// POST /api/checkout - Process checkout
router.post('/', async (req, res) => {
  try {
    const { cartItems, customerName, customerEmail, userId } = req.body;

    // Validation
    if (!customerName || !customerEmail) {
      return res.status(400).json({ error: 'customerName and customerEmail are required' });
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'cartItems array is required and cannot be empty' });
    }

    // Calculate total and prepare order items
    let total = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    // Create order
    const order = await Order.create({
      customerName,
      customerEmail,
      cartItems: orderItems,
      total: parseFloat(total.toFixed(2)),
      timestamp: new Date()
    });

    // Clear cart for user
    if (userId) {
      await CartItem.deleteMany({ userId });
    }

    // Return receipt
    res.status(201).json({
      success: true,
      receipt: {
        orderId: order._id,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.cartItems,
        total: order.total,
        timestamp: order.timestamp
      }
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ error: 'Failed to process checkout' });
  }
});

export default router;

