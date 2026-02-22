import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css"
const API_BASE = "http://127.0.0.1:8000";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const fetchCart = async () => {
    const res = await fetch(`${API_BASE}/api/farmer/view-cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      setCartItems(data.items);
      setCartTotal(data.cart_total);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    await fetch(`${API_BASE}/api/farmer/remove-cart/${itemId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCart();
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    await fetch(`${API_BASE}/api/farmer/update-cart/${itemId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    fetchCart(); 
  };

  const goToCheckout = () => {
    navigate("/buyerhome/shop-now", {
      state: {
        items: cartItems,
        total: cartTotal,
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 My Cart</h2>
      <div className="cart-cards">
        
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10}}>
              <h3>{item.product.name}</h3>
              <p>₹ {item.product.price_per_unit} {item.product.unit_type} </p>
              
              <label htmlFor="quantity">Quantity</label>
              <input
              id="quantity"
                type="number"
                min="1"
               value={item.quantity}
                onChange={(e) =>
                  handleUpdateQuantity(item.id, Number(e.target.value))
                }
              />

              <button
                onClick={() => handleRemove(item.id)}
                style={{ marginLeft: 10, background: "red", color: "white" }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹ {cartTotal}</h3>

          <button
            onClick={goToCheckout}
            style={{ padding: "10px 15px", background: "green", color: "white" }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
      </div>
    </div>
  );
};

export default CartPage;