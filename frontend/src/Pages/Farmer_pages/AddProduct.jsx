import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_img: [],
    name: "",
    category: "",
    price_per_unit: "",
    available_quantity: "",
    unit_type: "",
    quality_grade: "",
    harvest_date: "",
    description: "",
    location: "",
    delivery_option: "",
  });

  const token = localStorage.getItem("access_token");

  const handleChange = (e) => {
    if (e.target.name === "product_img") {
       const files = Array.from(e.target.files);

        // 🔴 Limit to 5 images
        if (files.length > 5) {
          alert("You can upload maximum 5 images only ❌");
          return;
        }
      setFormData({
        ...formData,
        product_img:Array.from(e.target.files) ,   
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
  if (key === "product_img") {
    formData.product_img.forEach((file) => {
      formDataToSend.append("product_img", file);
    });
  } else {
    formDataToSend.append(key, formData[key]);
  }
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
          multiple
          onChange={handleChange}
          required
        />

        {/* ==== */}
        {formData.product_img && formData.product_img.length > 0 && (
  <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
    {formData.product_img.map((file, index) => (
      <div key={index}>
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          width="100"
          height="100"
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      </div>
    ))}
  </div>
)}
        {/* ==== */}

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
          <option value="A">5</option>
          <option value="B">4</option>
          <option value="C">3</option>
          <option value="D">2</option>
          <option value="E">1</option>
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
