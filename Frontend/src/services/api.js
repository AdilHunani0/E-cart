import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Products API
export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

// Cart API
export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`);
  return response.data;
};

export const addToCart = async (productId, qty = 1) => {
  const response = await axios.post(`${API_BASE_URL}/cart`, { productId, qty });
  return response.data;
};

export const updateCartItem = async (itemId, qty) => {
  const response = await axios.put(`${API_BASE_URL}/cart/${itemId}`, { qty });
  return response.data;
};

export const removeFromCart = async (itemId) => {
  const response = await axios.delete(`${API_BASE_URL}/cart/${itemId}`);
  return response.data;
};

// Checkout API
export const processCheckout = async (cartItems, customerName, customerEmail) => {
  const response = await axios.post(`${API_BASE_URL}/checkout`, {
    cartItems,
    customerName,
    customerEmail
  });
  return response.data;
};

