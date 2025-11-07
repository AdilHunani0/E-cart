import React from "react";
import Spline from "@splinetool/react-spline";

export default function Items({ products, onAddToCart }) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-slate-900">
      
      {/* Hero Section with Spline 3D */}
      <div className="relative w-full h-screen max-h-[560px] overflow-hidden rounded-b-3xl shadow-2xl">
        <Spline 
          scene="https://prod.spline.design/RjjCsUhnVosDc9Mz/scene.splinecode" 
          className="absolute inset-0 w-full h-full"
        />

        {/* Gradient Overlay + Content */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 flex flex-col justify-end items-center text-center pb-20 px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl animate-fade-in-up">
            Vibe <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">Commerce</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-blue-100 font-light max-w-2xl animate-fade-in delay-200">
            Elevate your style with curated products that match your energy ✨
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#products" className="px-8 py-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 shadow-xl">
              Shop Now
            </a>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-2xl">
              Explore 3D
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Curated Just For You
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Handpicked vibes, delivered with love
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="group relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs font-bold rounded-full shadow-lg">
                  NEW
                </span>
              </div>

              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x300/6366f1/ffffff?text=No+Image";
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">In Stock</span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(product._id)}
                  className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Load More Placeholder */}
        <div className="mt-16 text-center">
          <button className="px-12 py-5 bg-white/10 backdrop-blur-md border border-gray-300/50 rounded-full text-gray-700 dark:text-gray-200 font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg">
            Load More Products
          </button>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in-up 1s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}