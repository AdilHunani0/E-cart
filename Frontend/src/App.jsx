import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ShoppingBag, Sparkles, Menu, X } from "lucide-react";

import Items from "./pages/Item.jsx";
import Cart from "./pages/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import Receipt from "./pages/Receipt.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Animated Layout Wrapper for page transitions
function AnimatedRoutes({ children }) {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      className="animate-fadeIn"
      style={{ animation: "fadeIn 0.6s ease-out" }}
    >
      {children}
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`);
      setCart(response.data);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(`${API_BASE_URL}/cart`, { productId, qty: 1 });
      await fetchCart();
    } catch (err) {
      alert("Failed to add item to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/${itemId}`);
      await fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) {
      removeFromCart(itemId);
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/cart/${itemId}`, { qty: newQty });
      await fetchCart();
    } catch (err) {
      alert("Failed to update quantity");
    }
  };

  const handleCheckout = async (customerName, customerEmail) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/checkout`, {
        cartItems: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        customerName,
        customerEmail,
      });

      setReceipt(response.data.receipt);
      await fetchCart();
    } catch (err) {
      alert("Checkout failed: " + (err.response?.data?.error || err.message));
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">Loading Vibe Commerce...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-black flex items-center justify-center px-6">
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-16 border border-white/30">
          <div className="w-24 h-24 mx-auto mb-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-slate-900">
        {/* Floating Glass Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Vibe Commerce
                </h1>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-200 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Shop
                </Link>
                <Link
                  to="/cart"
                  className="relative group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>Cart</span>
                  <span className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white text-sm font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cart.itemCount}
                  </span>
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 rounded-xl bg-white/20 dark:bg-gray-800/50 backdrop-blur-md"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-white/20 shadow-2xl">
              <div className="px-6 py-8 space-y-6">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xl font-semibold text-gray-800 dark:text-white hover:text-indigo-600"
                >
                  Shop All Products
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <ShoppingBag className="w-8 h-8" />
                    <span className="text-xl">View Cart</span>
                  </div>
                  <span className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-lg font-bold">
                    {cart.itemCount}
                  </span>
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-20">
          <AnimatedRoutes>
            <Routes>
              <Route
                path="/"
                element={<Items products={products} onAddToCart={addToCart} />}
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                }
              />
              <Route
                path="/checkout"
                element={<CheckoutForm cart={cart} onCheckout={handleCheckout} />}
              />
              <Route path="/receipt" element={<Receipt receipt={receipt} />} />
            </Routes>
          </AnimatedRoutes>
        </main>

        {/* Global Styles */}
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;