// Mock backend API calls
const API_URL = "http://localhost:8000/api"; // replace with your backend

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products/`);
  return res.json();
};

export const addToCart = async (product) => {
  const res = await fetch(`${API_URL}/cart/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const fetchCart = async () => {
  const res = await fetch(`${API_URL}/cart/`);
  return res.json();
};

export const placeOrder = async (order) => {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API_URL}/orders/`);
  return res.json();
};
