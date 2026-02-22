import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProdt.css"
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [product, setProduct] = useState({
    product_img: null,
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

  const [preview, setPreview] = useState(null);

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
            product_img: null, // keep file empty unless user selects new one
            harvest_date: found.harvest_date
              ? found.harvest_date.split("T")[0]
              : "",
          });

          if (found.product_img) {
            setPreview(found.product_img);
          }
        }
      });
  }, [id, token]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "product_img") {
      const file = e.target.files[0];
      setProduct({ ...product, product_img: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
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

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/farmer/editproduct/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ DO NOT set Content-Type
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
    <section className="edit-section" >
      <div className="edit-div">
        
        <h2>Edit Product</h2>
      <form onSubmit={handleUpdate} className="edit-form">
    

       <div className="formbox">
         <label htmlFor="">Upload New Photo</label>
        <input type="file" name="product_img" onChange={handleChange} />
       </div>

      <div className="formbox">
         <label htmlFor="">Name</label>
        <input name="name"  value={product.name}  onChange={handleChange}  required
        />
      </div>

      <div className="formbox">
          <label htmlFor="">Category</label>
          <input
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
        </div>

      <div className="formbox">
          <label htmlFor="unit">Price per unit</label>
          <input
          id="unit"
          type="number"
          name="price_per_unit"
          value={product.price_per_unit}
          onChange={handleChange}
          required
        />
      </div>

        <div className="formbox">
          <label htmlFor="quantity">Available Quantity</label>
        <input
        id="quantity"
          type="number"
          name="available_quantity"
          value={product.available_quantity}
          onChange={handleChange}
          required
        />
        </div>
      <div className="formbox">
        <label htmlFor="unittype">Unit type</label>
        <input
        id="unittype"
          name="unit_type"
          value={product.unit_type}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formbox">
        <label htmlFor="grade">select Quality Grade</label>
        <select
          name="quality_grade"
          value={product.quality_grade}
          onChange={handleChange}
          required
        >
          <option value="">Select Grade</option>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="Organic">Organic</option>
          <option value="Premium">Premium</option>
        </select>

      </div>

        <div className="formbox">
          <label htmlFor="date">Harvest Date</label>
        <input
          id="date"
          type="date"
          name="harvest_date"
          value={product.harvest_date}
          onChange={handleChange}
          required
        />
        </div>
        
        <div className="formbox">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
        </div>

        <div className="formbox">
          <label htmlFor="location">Location</label>
        <input
        id="location"
          name="location"
          value={product.location}
          onChange={handleChange}
          required
        />

        </div>
        
          <div className="formbox"> 
           <label htmlFor="delivery">Delivery</label> 
          <input
            id="delivery"
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