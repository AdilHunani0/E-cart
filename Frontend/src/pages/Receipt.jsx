import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, Clock, User, Mail, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export default function Receipt({ receipt }) {
  const navigate = useNavigate();

  if (!receipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-black flex items-center justify-center px-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center border border-white/30">
          <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-red-200 to-pink-200 dark:from-red-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center">
            <Package className="w-14 h-14 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            No Receipt Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Looks like this order doesn't exist... yet!
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="w-6 h-6" />
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => new Date(date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Fullscreen Celebration Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 opacity-90 -z-10" />
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm -z-10" />

      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="relative w-full max-w-3xl">
          {/* Floating Confetti Background */}
          <div className="absolute -inset-10 bg-gradient-to-br from-yellow-400/20 via-pink-400/20 to-purple-400/20 blur-3xl animate-pulse" />

          {/* Main Receipt Card */}
          <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-3xl rounded-3xl shadow-3xl overflow-hidden border border-white/50">
            {/* Top Celebration Bar */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <CheckCircle className="w-24 h-24 animate-bounce" />
                    <Sparkles className="w-8 h-8 absolute top-0 right-0 text-yellow-300 animate-ping" />
                    <Sparkles className="w-6 h-6 absolute bottom-0 left-0 text-yellow-300 animate-ping delay-300" />
                  </div>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight">
                  Order Confirmed!
                </h1>
                <p className="text-xl mt-3 opacity-95">
                  Your vibes are on the way
                </p>
              </div>
            </div>

            {/* Receipt Content */}
            <div className="p-10">
              {/* Order Info */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                      <p className="font-bold text-lg text-gray-800 dark:text-white">
                        #{receipt.orderId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Order Date</p>
                      <p className="font-bold text-lg text-gray-800 dark:text-white">
                        {formatDate(receipt.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-2xl flex items-center justify-center">
                      <User className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                      <p className="font-bold text-lg text-gray-800 dark:text-white">
                        {receipt.customerName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-bold text-lg text-gray-800 dark:text-white break-all">
                        {receipt.customerEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 mb-10">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                  <ShoppingBag className="w-7 h-7 text-indigo-600" />
                  Your Items
                </h3>
                <div className="space-y-5">
                  {receipt.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-5 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl flex items-center justify-center">
                          <Package className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Quantity: <span className="font-bold">{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                      <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white text-center">
                <p className="text-2xl font-light mb-2">Total Amount Paid</p>
                <p className="text-6xl font-extrabold tracking-tight">
                  ${receipt.total.toFixed(2)}
                </p>
                <p className="text-lg mt-3 opacity-90">
                  Thank you for shopping with <span className="font-bold">Vibe Commerce</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="group inline-flex items-center justify-center gap-4 px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <ShoppingBag className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                  Continue Shopping
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-3 px-10 py-6 bg-white/20 dark:bg-white/10 backdrop-blur-md border-2 border-white/50 text-white font-bold rounded-2xl hover:bg-white/30 transition-all duration-300"
                >
                  Print Receipt
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap justify-center gap-6">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Free Shipping
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    30-Day Returns
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .bg-gradient-to-br, .backdrop-blur-3xl {
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          .from-emerald-500, .to-teal-600 {
            background: #10b981 !important;
          }
          .text-white {
            color: black !important;
          }
          button, .fixed {
            display: none !important;
          }
          .max-w-3xl {
            visibility: visible !important;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </>
  );
}