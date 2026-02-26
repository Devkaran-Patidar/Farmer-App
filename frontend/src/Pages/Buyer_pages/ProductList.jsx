import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = "http://127.0.0.1:8000"; 
import "./productlist.css"

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
    navigate("/buyerhome/cart");  
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
    <div style={{ padding: "20px" , display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      
      <div className="searchbar">
        <input type="text" name="searchbar" placeholder="Search here.."  value={searchTerm}onChange={(e) => {
          setSearchTerm(e.target.value);
          fetchProducts(e.target.value);  }} />
          <i class="fa-solid fa-magnifying-glass"></i>

      </div>

      <div className="main-product-heading" >
        <h2>🛒 Products </h2>
        <h4>Cart Items: {cartCount}</h4>
      </div>
      {/* <div className="cart">
        <img src={cart} alt="" width={50} className="cartlogo" />
        <p className="count">{cartCount}</p>
      </div> */}
    

      <div className="allproduct">
        {products.map((product) => (
          <div className="product-card">
              <div className="image-wrapper">
                  <img src={API_BASE+product.product_img} alt={product.name}/>
                  <span className="badge">Quality {product.quality_grade} </span>
                </div>

                <div className="card-body">
                    <h2>{product.name}</h2>
                    <p className="description"> <title className="product-title"> {product.description}</title> </p>

                  <div className="price-stock">
                      <span className="price">₹{product.price_per_unit} <small>/{product.unit_type}</small></span>
                   <span className="stock">{product.available_quantity} {product.unit_type} Available  </span>
                  </div>

                  <div className="location">
                   📍  {product.location} | 🚚 {product.delivery_option}
                  </div>
                    <p className="harvest">Harvest Date: {product.harvest_date}</p>
                  <div className="buttons">
                   <button className="cart-btn"  onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                    <button className="buy-btn"  onClick={() => handleBuyNow(product)}>Buy Now</button>
                 </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;