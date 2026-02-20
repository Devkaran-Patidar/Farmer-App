import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_img: null,
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

  const token = localStorage.getItem("access_token");

  const handleChange = (e) => {
    if (e.target.name === "product_img") {
      setFormData({
        ...formData,
        product_img: e.target.files[0],   // ✅ file object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // farmer_id is set in backend, do not send from frontend
    try {
      const response = await fetch("http://127.0.0.1:8000/api/farmer/addproduct/", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
    },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product Added Successfully ✅");
        navigate("/farmerhome");
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="file"
          name="product_img"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price_per_unit"
          placeholder="Price Per Unit"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="available_quantity"
          placeholder="Available Quantity"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="unit_type"
          placeholder="Unit Type (kg, ton, piece)"
          onChange={handleChange}
          required
        />

        <select
          name="quality_grade"
          onChange={handleChange}
          required
        >
          <option value="">Select Quality</option>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="Organic">Organic</option>
          <option value="Premium">Premium</option>
        </select>

        <input
          type="date"
          name="harvest_date"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <select
          name="org_norg"
          onChange={handleChange}
          required
        >
          <option value="">Organic Type</option>
          <option value="Organic">Organic</option>
          <option value="Non-Organic">Non-Organic</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Farm Location"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="delivery_option"
          placeholder="Delivery Option (Pickup / Home Delivery)"
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
