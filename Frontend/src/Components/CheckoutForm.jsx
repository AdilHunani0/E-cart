import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, Package, Truck, Shield, Check } from "lucide-react";

export default function CheckoutForm({ cart, onCheckout }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onCheckout(name, email);
    navigate("/receipt");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-black py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate("/cart")}
          className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 transition-all group mb-8"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
                    Checkout
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Almost there! Just a few details
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className={`w-full px-6 py-5 rounded-2xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 ${
                        errors.name
                          ? "border-red-500 bg-red-50/50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-purple-500"
                      }`}
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      {name && !errors.name && (
                        <Check className="w-6 h-6 text-green-500 animate-in fade-in" />
                      )}
                    </div>
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full px-6 py-5 rounded-2xl border-2 text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 ${
                        errors.email
                          ? "border-red-500 bg-red-50/50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-purple-500"
                      }`}
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                      {email && !errors.email && (
                        <Check className="w-6 h-6 text-green-500 animate-in fade-in" />
                      )}
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Secure Notice */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 flex items-center gap-4">
                  <Lock className="w-10 h-10 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                      Secure Checkout
                    </p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400">
                      Your information is encrypted and secure. We use SSL protection.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-6 mt-10 text-xl font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-4 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 hover:shadow-3xl hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-8 h-8" />
                      Complete Order • ${cart.total.toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                <Package className="w-9 h-9 text-indigo-600" />
                Order Summary
              </h2>

              <div className="space-y-5 mb-8">
                {cart.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-white line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">
                      ${item.subtotal.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-6 space-y-4">
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
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl text-white">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-light">Total</span>
                  <span className="text-4xl font-extrabold">
                    ${cart.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Truck className="w-6 h-6 text-green-600" />
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-6 h-6 text-green-600" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Lock className="w-6 h-6 text-green-600" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}