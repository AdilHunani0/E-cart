🛍️ Vibe Commerce — Full Stack Mock E-Com Cart
🧾 Overview

Vibe Commerce is a full-stack mock e-commerce cart application built as an internship assignment.
It features a responsive React frontend with Tailwind CSS styling, a 3D interactive hero section using Spline, and a Node.js + Express + MongoDB backend.

Users can browse mock products, add/remove items from the cart, and perform a mock checkout that generates a sample receipt.

🚀 Tech Stack
🖥️ Frontend

React.js (Vite) – Component-based SPA

Tailwind CSS – Modern responsive styling

Spline 3D – Interactive hero animation

Axios – API requests

React Router DOM – Routing between pages

⚙️ Backend

Node.js + Express.js – RESTful APIs

MongoDB + Mongoose – Database for products and cart

CORS + dotenv – Config and security helpers

📂 Project Structure
mock-ecom-cart/
│
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── models/
│   │   ├── Product.js
│   │   └── CartItem.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── cartRoutes.js
│   ├── controllers/
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── data/productsData.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── pages/
    │   │   ├── Items.jsx
    │   │   ├── Cart.jsx
    │   │   └── Receipt.jsx
    │   └── components/
    │       └── CheckoutForm.jsx
    └── tailwind.config.js

⚙️ Setup Instructions
🧩 1. Clone Repository
git clone https://github.com/<your-username>/vibe-commerce.git
cd vibe-commerce

🖥️ 2. Setup Backend
cd backend
npm install


Create a .env file:

MONGO_URI=mongodb://localhost:27017/mockecom
PORT=5000


Run backend:

npm run dev


Backend runs at ➜ http://localhost:5000

💻 3. Setup Frontend
cd ../frontend
npm install
npm run dev


Frontend runs at ➜ http://localhost:5173 (default Vite port)

🌐 Key Features
🔹 Frontend

🎨 3D Spline Hero Section – Beautiful 3D animation banner integrated using @splinetool/react-spline

🧱 Responsive Product Grid – Tailwind styled product cards with hover effects

🛒 Cart Management – Add, remove, and update item quantities

💳 Checkout Form – Validates name/email before confirming order

📄 Receipt Page – Displays mock order summary and timestamp

⚡ Animations – Subtle fade-in and scale effects for polished UX

🔹 Backend APIs
Method	Endpoint	Description
GET	/api/products	Fetch all mock products
POST	/api/cart	Add item to cart
DELETE	/api/cart/:id	Remove cart item
GET	/api/cart	View current cart and total
POST	/api/checkout	Process mock checkout and return receipt

User clicks Add to Cart → sends POST /api/cart.

Cart dynamically updates using GET /api/cart.
