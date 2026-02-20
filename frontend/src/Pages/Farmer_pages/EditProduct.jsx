import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price_per_unit: "",
    available_quantity: "",
    unit_type: "",
    quality_grade: "",
    harvest_date: "",
    description: "",
    org_norg: "",
    location: "",
    delivery_option: "",
  });

  // Load product data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/farmer/myproduct/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));
        if (found) setProduct(found);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://127.0.0.1:8000/api/farmer/editproduct/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    );

    if (res.ok) {
      alert("Product Updated Successfully!");
      navigate("/farmer/myproducts");
    } else {
      const error = await res.json();
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>
        <input name="name" value={product.name} onChange={handleChange} required />
        <input name="category" value={product.category} onChange={handleChange} required />
        <input type="number" name="price_per_unit" value={product.price_per_unit} onChange={handleChange} required />
        <input type="number" name="available_quantity" value={product.available_quantity} onChange={handleChange} required />
        <input name="unit_type" value={product.unit_type} onChange={handleChange} required />

        <select name="quality_grade" value={product.quality_grade} onChange={handleChange} required>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="Organic">Organic</option>
          <option value="Premium">Premium</option>
        </select>

        <input type="date" name="harvest_date" value={product.harvest_date} onChange={handleChange} required />
        <input name="description" value={product.description} onChange={handleChange} required />

        <select name="org_norg" value={product.org_norg} onChange={handleChange} required>
          <option value="Organic">Organic</option>
          <option value="Non-Organic">Non-Organic</option>
        </select>

        <input name="location" value={product.location} onChange={handleChange} required />
        <input name="delivery_option" value={product.delivery_option} onChange={handleChange} required />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
