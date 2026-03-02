import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css"
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

const ProductDetails = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch(`${API_BASE}/api/farmer/product/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);   // ✅ correct
        console.log(data);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

//   =============

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
    <div className="product-details-container">
        <h3 className="back" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
  <i className="fa-solid fa-arrow-left"></i> BACK
</h3>
      <div className="product-1">
        <div className="slider">
        <img src={API_BASE + product.product_img} alt={product.name} />
      </div>

      <div className="details">
        <h1>{product.name}</h1>

        <h3 className="price">₹{product.price_per_unit} / {product.unit_type}</h3>
        <p className="stock" >Available: {product.available_quantity} {product.unit_type}</p>
        <p>Quality Grade: {product.quality_grade}</p>
        <div className="buttonss">
            <button className="cart-btn"  onClick={(e) => {handleAddToCart(product.id);   e.stopPropagation();   }}>Add to Cart</button>
             <button className="buy-btn"  onClick={(e) => {handleBuyNow(product); e.stopPropagation();}}>Buy Now</button>
             </div>

      </div>
      </div>

      <div>
        <h3>Description:-</h3>
        <p>{product.description}</p>

        <h3>Overview:-</h3>
        <p> <span className="overview">Location:</span>📍 {product.location}</p>
        <p> <span className="overview">Delivery:</span> 🚚 {product.delivery_option}</p>
        <p> <span className="overview">Harvest Date:</span> {product.harvest_date}</p>

        <h3>Disclaimer:-</h3>
        <p className="disclaimer"> Every effort is made to maintain accuracy of all information. However, actual product packaging and materials may contain more and/or different information. It is recommended not to solely rely on  the information presented.</p>
      </div>

    </div>
  );
};

export default ProductDetails;