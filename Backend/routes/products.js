import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('_id name price image');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;

