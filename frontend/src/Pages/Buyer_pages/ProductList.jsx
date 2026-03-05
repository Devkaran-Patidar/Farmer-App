import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = "http://127.0.0.1:8000"; 
import "./productlist.css"

const ProductPage = ({setCartCount,cartCount}) => {
  const [products, setProducts] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  // Fetch all products
  const fetchProducts = async (query ="",cat = "") => {
    try {
      const res = await fetch(`${API_BASE}/api/farmer/allproducts/?search=${query}&category=${cat}`);
      const data = await res.json();
      setProducts(data);
      // console.log(data)
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
    fetchProducts(searchTerm, category);
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
    // alert("Added to cart!");
    // setCartCount +=1; 
    fetchCart();
    navigate("/buyerhome"); 
    setCartItems((prev) => [...prev, productId]);
  
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
    <div className="allproduct-page" >
      
      <div className="product-navbar">        
        <div className="searchbar">
          <select name="category" id="selectcat" value={category}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            setCategory(selectedCategory);
            fetchProducts(searchTerm, selectedCategory);
            }}>
            <option value="">Select Category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Flowers">Flowers</option>
            <option value="Organic">Organic Product</option>
          </select>
        <div className="search">
          <input type="text" name="searchbar" placeholder="Search here.."  value={searchTerm}onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          fetchProducts(value,category);  }} />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>

      </div>
         
      </div>

      <div className="allproduct">
        {products.map((product) => (
          <div key={product.id} className="product-card" 
            onClick={() => navigate(`/buyerhome/product/${product.id}`)}
              style={{ cursor: "pointer" }}>
               <div className="image-wrapper">
              {product.images && product.images.length > 0 ? (
  <img
    src={product.images[0].image_url}
    alt={product.name}
  />
) : (
  <p>No Image</p>
)}
              <span className="badge">{product.quality_grade} ⭐</span>
            </div>
                <div className="card-body">
                    <h2>{product.name}</h2>
                    {/* <p className="description"> <title className="product-title"> {product.description}</title> </p> */}

                  <div className="price-stockk">
                      <span className="pricee">₹{product.price_per_unit} <small>/{product.unit_type}</small></span>
                   <span className="stockk">{product.available_quantity} {product.unit_type} Available  </span>
                  </div>

                  <div className="location">
                   📍  {product.location} | 🚚 {product.delivery_option}
                  </div>
                    {/* <p className="harvest">Harvest Date: {product.harvest_date}</p> */}
                  <div className="buttonns">
                   <button className="cartt-btn"  onClick={(e) => {  e.stopPropagation(); 
                   if (cartItems.includes(product.id)) {
                     navigate("/buyerhome/cart");
                    } else {
                   handleAddToCart(product.id);
                      }
                       }}>  
                       {cartItems.includes(product.id) ? "Go to Cart" : "Add to Cart"}</button>
                    <button className="buyy-btn"  onClick={(e) => {handleBuyNow(product); e.stopPropagation();}}>Buy Now</button>
                 </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;