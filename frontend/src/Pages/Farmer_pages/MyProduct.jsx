import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProducts.css";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/farmer/myproduct/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.log("Error:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await fetch(
      `http://127.0.0.1:8000/api/farmer/deleteproduct/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProducts();
  };

  return (
    <div className="myproducts-container">
      <h2>My Products</h2>

      <button
        className="add-btn"
        onClick={() => navigate("/farmerhome/addproduct")}
      >
        + Add Product
      </button>

      <div className="products-grid">
        {products.length === 0 ? (
          <p className="no-product">No Products Found</p>
        ) : (
          products.map((item) => (
            <div key={item.id} className="product-card">
              <img
                src={`http://127.0.0.1:8000${item.product_img}`}
                alt={item.name}
              />

              <h3>{item.name}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Price:</strong> ₹{item.price_per_unit}</p>
              <p><strong>Quantity:</strong> {item.available_quantity} {item.unit_type}</p>
              <p><strong>Quality:</strong> {item.quality_grade}</p>
              <p><strong>Type:</strong> {item.org_norg}</p>
              <p><strong>Location:</strong> {item.location}</p>

              <div className="btn-group">
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/farmerhome/editproduct/${item.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
