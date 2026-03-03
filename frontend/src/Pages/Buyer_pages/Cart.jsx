import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Cart.css";
import emptycart from "../../assets/emptyCart.png";
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
    <div className="mycart">
      {/* <h2> My Cart</h2> */}
      <div className="cart-cards">
        {cartItems.length === 0 ? (
          <div className="emptycart">
            <img src={emptycart} alt="empty Cart" width={200} />
            <h5>Your cart is empty.</h5>
            <button className="emptycartbutt">
              <Link to="/buyerhome">Shop Now!</Link>
            </button>
          </div>
        ) : (
          <div className="cart-allproducts">
            <div className="cart-allproductscard">
              {cartItems.map((item) => (
                <div className="cart-card" key={item.id}>
                  <h3>{item.product.name}</h3>
                  <p>
                    <span className="cart-tag">Price: </span>₹{" "}
                    {item.product.price_per_unit} {item.product.unit_type}{" "}
                  </p>
                  <label htmlFor=""><span className="cart-tag">Quantity:</span> {item.quantity }  {item.product.unit_type} </label>
                  <div
                    className="qty-wrapper"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="qty-btn"  onClick={() =>   item.quantity > 1 &&  handleUpdateQuantity(item.id, item.quantity - 1)  }  >
                      −
                    </button>

                    <input
                      type="number"
                      value={item.quantity}
                      min="1" className="qty-input"  onChange={(e) =>  handleUpdateQuantity(item.id, Number(e.target.value))
                      }
                    />

                    <button
                      className="qty-btn" onClick={() =>  handleUpdateQuantity(item.id, item.quantity + 1)  }  >
                      +
                    </button>
                  </div>

                  <button className="cart-remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              ))}
            </div>

           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
             <h3>Total: ₹ {cartTotal}</h3>

            <button onClick={goToCheckout} className="proceedbtn">
              Proceed to Checkout
            </button>
           </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
