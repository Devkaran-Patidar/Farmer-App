import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = "http://127.0.0.1:8000"; // change if needed
import "./productlist.css"
import cart from "../../assets/cartlogo.png"


const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch all products
  const fetchProducts = async (query ="") => {
    try {
      const res = await fetch(`${API_BASE}/api/farmer/allproducts/?search=${query}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  // Fetch cart count
  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/farmer/view-cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setCartCount(data.cart_count);
      }
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (token) {
      fetchCart();
    }
  }, []);

  // Add To Cart
  const handleAddToCart = async (productId) => {
  if (!token) {
    alert("Please login first");
    return;
  }

  const res = await fetch(`${API_BASE}/api/farmer/add-to-cart/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: productId,
      quantity: 1,
    }),
  });

  if (res.ok) {
    alert("Added to cart!");
    navigate("/buyerhome/cart");   // ✅ REDIRECT HERE
  }
};

  // Buy Now
  const handleBuyNow = (product) => {
  if (!token) {
    alert("Please login first");
    return;
  }

  navigate("/buyerhome/shop-now", {
    state: {
      items: [
        {
          id: product.id,
          product: product,
          quantity: 1,
        },
      ],
      total: product.price_per_unit,
    },
  });
};


  return (
    <div style={{ padding: "20px" }}>
      
      <div className="searchbar">
        <input type="text" name="searchbar" placeholder="Search here.."  value={searchTerm}onChange={(e) => {
    setSearchTerm(e.target.value);
    fetchProducts(e.target.value); // 🔥 live search
  }} />
        <i class="fa-solid fa-magnifying-glass"></i>
        {/* <title>Search Here...</title> */}
      </div>

      <h2>🛒 Products</h2>
      <div className="cart">
        <img src={cart} alt="" width={50} className="cartlogo" />
        <p className="count">{cartCount}</p>
      </div>
      {/* <h4>Cart Items: {cartCount}</h4> */}

      <div className="allproduct">
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              width: "250px",
              borderRadius: "8px",
            }}
          >
            <img
              src={API_BASE+product.product_img}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <h3>{product.name}</h3>
            <p title={product.description} className="product-title">{product.description}</p>
            <p>Price: ₹ {product.price_per_unit} {product.unit_type}</p>
            <p>Available: {product.available_quantity} {product.unit_type}</p>
            <p>Quality: {product.quality_grade}</p>
            <p>location: {product.location} </p>
            <p>Delivery: {product.delivery_option}</p>
            <p></p>

            <button
              onClick={() => handleAddToCart(product.id)}
              style={{
                marginRight: "10px",
                padding: "6px 10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleBuyNow(product)}
              style={{
                padding: "6px 10px",
                backgroundColor: "orange",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;