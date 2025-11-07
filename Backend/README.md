# Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecart
```

3. Start MongoDB (if using local):
```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

4. Start server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- GET /api/products - Get all products
- GET /api/cart - Get cart items
- POST /api/cart - Add item to cart
- PUT /api/cart/:id - Update cart item quantity
- DELETE /api/cart/:id - Remove item from cart
- POST /api/checkout - Process checkout

## MongoDB Atlas Alternative

If you don't have MongoDB installed locally, you can use MongoDB Atlas (free tier):

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecart
```

