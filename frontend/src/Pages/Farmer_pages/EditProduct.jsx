import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProdt.css";

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
    location: "",
    delivery_option: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // ✅ Load product data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/farmer/myproduct/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(id));

        if (found) {
          setProduct({
            ...found,
            harvest_date: found.harvest_date
              ? found.harvest_date.split("T")[0]
              : "",
          });

          if (found.images) {
            setExistingImages(found.images);
          }
        }
      });
  }, [id, token]);

  // ✅ Handle text input
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Handle multiple image select
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setNewImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // ✅ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      if (product[key] !== null && product[key] !== "") {
        formData.append(key, product[key]);
      }
    });

    // Append multiple images
    newImages.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/farmer/editproduct/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Product Updated Successfully!");
        navigate("/farmerhome");
      } else {
        console.log(data);
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <section className="edit-section">
      <div className="edit-div">
        <h2>Edit Product</h2>

        <form onSubmit={handleUpdate} className="edit-form">

          {/* Upload Multiple Images */}
          <div className="formbox">
            <label>Upload New Photos</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {/* Existing Images Preview */}
            <h4 style={{margin:"0"}}>Current Images</h4>
          <div className="preview-container">
            {existingImages.map((img) => (
              <img
                key={img.id}
                src={img.image_url}
                alt="existing"
                className="preview-img"
              />
            ))}
          </div>

          {/* New Selected Images Preview */}
          <div className="preview-container">
            {/* <p>New Images</p> */}
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="preview-img"
              />
            ))}
          </div>

          {/* Rest of your inputs remain same */}
          <div className="formbox">
            <label>Name</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbox">
            <label>Category</label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbox">
            <label>Price per unit</label>
            <input
              type="number"
              name="price_per_unit"
              value={product.price_per_unit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbox">
            <label>Available Quantity</label>
            <input
              type="number"
              name="available_quantity"
              value={product.available_quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbox">
            <label>Unit Type</label>
            <input
              name="unit_type"
              value={product.unit_type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbox">
            <label>Quality Grade</label>
            <select
              name="quality_grade"
              value={product.quality_grade}
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
          </div>

          <div className="formbox">
            <label>Harvest Date</label>
            <input
              type="date"
              name="harvest_date"
              value={product.harvest_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbox">
            <label>Description</label>
            <input
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbox">
            <label>Location</label>
            <input
              name="location"
              value={product.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formbox">
            <label>Delivery Option</label>
            <input
              name="delivery_option"
              value={product.delivery_option}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Update Product</button>
        </form>
      </div>
    </section>
  );
}