import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const sliderRef = useRef(null);  // 👈 reference for slider
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch(`${API_BASE}/api/farmer/product/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [id, token]);

  if (!product) return <p>Loading...</p>;

  // ====== Arrow Scroll Handlers ======
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="product-details-container">
      <h3 className="back" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left"></i> BACK
      </h3>

      <div className="product-1">
        {/* ===== Slider with arrows ===== */}
        <div className="slider-wrapper">
          <button className="arrow left" onClick={scrollLeft}>
            &#10094;
          </button>

          <div className="slider" ref={sliderRef}>
            {product.images?.length > 0 ? (
              product.images.map((img, index) => (
                <div className="slide" key={img.id}>
                  <img
                    src={img.image_url}
                    alt={`${product.name}-${index}`}
                    className="detail-image"
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          <button className="arrow right" onClick={scrollRight}>
            &#10095;
          </button>
        </div>

        {/* ===== Product Details ===== */}
        <div className="details">
          <h1>{product.name}</h1>
          <h3 className="price">
            ₹{product.price_per_unit} / {product.unit_type}
          </h3>
          <p className="stock">
            Available: {product.available_quantity} {product.unit_type}
          </p>
          <p>Quality Grade: {product.quality_grade}</p>
          <div className="buttonss">
            <button
              className="cart-btn"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
            <button
              className="buy-btn"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ===== Description & Overview ===== */}
      <div>
        <h3>Description:-</h3>
        <p>{product.description}</p>

        <h3>Overview:-</h3>
        <p>
          <span className="overview">Location:</span>📍 {product.location}
        </p>
        <p>
          <span className="overview">Delivery:</span> 🚚 {product.delivery_option}
        </p>
        <p>
          <span className="overview">Harvest Date:</span> {product.harvest_date}
        </p>

        <h3>Disclaimer:-</h3>
        <p className="disclaimer">
          Every effort is made to maintain accuracy of all information.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;