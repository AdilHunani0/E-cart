import express from 'express';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/cart - Get cart with total
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'guest';
    const cartItems = await CartItem.find({ userId }).populate('productId', 'name price image');
    
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        id: item._id,
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        quantity: item.quantity,
        subtotal: itemTotal
      };
    });

    res.json({
      items,
      total: parseFloat(total.toFixed(2)),
      itemCount: cartItems.length
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.body.userId || 'guest';

    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if item already in cart
    let cartItem = await CartItem.findOne({ productId, userId });

    if (cartItem) {
      // Update quantity
      cartItem.quantity += qty || 1;
      await cartItem.save();
    } else {
      // Create new cart item
      cartItem = await CartItem.create({
        productId,
        quantity: qty || 1,
        userId
      });
    }

    await cartItem.populate('productId', 'name price image');

    res.status(201).json({
      message: 'Item added to cart',
      item: {
        id: cartItem._id,
        productId: cartItem.productId._id,
        name: cartItem.productId.name,
        price: cartItem.productId.price,
        quantity: cartItem.quantity
      }
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid productId format' });
    }
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId || 'guest';

    const cartItem = await CartItem.findOneAndDelete({ _id: id, userId });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart', id });
  } catch (error) {
    console.error('Error removing from cart:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid cart item id' });
    }
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// PUT /api/cart/:id - Update quantity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    const userId = req.query.userId || 'guest';

    if (!qty || qty < 1) {
      return res.status(400).json({ error: 'Valid quantity (>=1) is required' });
    }

    const cartItem = await CartItem.findOneAndUpdate(
      { _id: id, userId },
      { quantity: qty },
      { new: true }
    ).populate('productId', 'name price image');

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({
      message: 'Cart item updated',
      item: {
        id: cartItem._id,
        productId: cartItem.productId._id,
        name: cartItem.productId.name,
        price: cartItem.productId.price,
        quantity: cartItem.quantity
      }
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid cart item id' });
    }
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

export default router;

