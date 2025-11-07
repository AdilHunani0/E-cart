import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecart';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Initialize products if collection is empty
    initializeProducts();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Note: Make sure MongoDB is running or update MONGODB_URI in .env');
  });

// Initialize mock products
async function initializeProducts() {
  const Product = (await import('./models/Product.js')).default;
  const count = await Product.countDocuments();
  
  if (count === 0) {
    const mockProducts = [
      { name: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/300/300?random=1' },
      { name: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/300/300?random=2' },
      { name: 'Laptop Stand', price: 49.99, image: 'https://picsum.photos/300/300?random=3' },
      { name: 'Mechanical Keyboard', price: 129.99, image: 'https://picsum.photos/300/300?random=4' },
      { name: 'Wireless Mouse', price: 39.99, image: 'https://picsum.photos/300/300?random=5' },
      { name: 'USB-C Hub', price: 59.99, image: 'https://picsum.photos/300/300?random=6' },
      { name: 'Monitor Stand', price: 69.99, image: 'https://picsum.photos/300/300?random=7' },
      { name: 'Desk Lamp', price: 34.99, image: 'https://picsum.photos/300/300?random=8' }
    ];
    
    await Product.insertMany(mockProducts);
    console.log('Mock products initialized');
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

