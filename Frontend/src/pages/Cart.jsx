import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

export default function Cart({ cart, onRemove, onUpdateQuantity }) {
  const navigate = useNavigate();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Shopping
          </Link>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center border border-white/20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800/50 dark:to-pink-800/50 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Looks like you haven't added any vibes yet!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <ShoppingBag className="w-6 h-6" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black pt-20 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 transition-all group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Your Cart ({cart.items.length})
          </h1>
        </div>

        {/* Cart Items */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl border border-white/30 overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center p-6 gap-6">
                  {/* Image */}
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-gray-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 flex items-center justify-center transition-all hover:scale-110"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-16 text-center font-bold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-gray-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 flex items-center justify-center transition-all hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-400 flex items-center justify-center transition-all hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
                    <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      ${item.subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Order Summary
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="font-semibold">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-gray-300">Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-6">
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">Total</span>
                    <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      ${cart.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4"
              >
                <ShoppingBag className="w-7 h-7" />
                Proceed to Checkout
              </button>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure checkout • Free shipping • 30-day returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        div[style*="animationDelay"] {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}