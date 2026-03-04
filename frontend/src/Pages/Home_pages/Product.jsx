import "./Product.css";
import img1 from "../../assets/product_image/ghee.png"
import img2 from "../../assets/product_image/honey.jpeg"
export default function Product() {
  return (
    <section className="product-section">
       <div className="product-heading">
        <h4>Fresh produce organized just the way you like it</h4>
       </div>

      <div className="product-cards">

          <div className="pro-cards">
              {/* <h1>🍄</h1>
              <h4>Vegetables</h4>
              <p>Fresh & Organic</p> */}
             <div className="pro-img">
                 <img src={img1} alt="img-1" />
             </div>
              <h4>Ghee</h4>
              <p>Fresh & Organic</p>
          </div>
          <div className="pro-cards">
               <div className="pro-img">
                 <img src={img2} alt="img-1" />
             </div>
              <h4>Fruits</h4>
              <p>Seasonal & Imported</p>
          </div>
          <div className="pro-cards">
              <h1>🥬</h1>
              <h4>Leafy Greens</h4>
              <p>Daily Essential Greens</p>
          </div>
          <div className="pro-cards">
              <h1>🌱</h1>
              <h4>Sprouts</h4>
              <p>Health & Nutrition Boost</p>
          </div>
          <div className="pro-cards">
              <h1>🥦</h1>
              <h4>Vegetables</h4>
              <p>Fresh & Organic</p>
          </div>
          <div className="pro-cards">
              <h1>🫑</h1>
              <h4>Vegetables</h4>
              <p>Fresh & Organic</p>
          </div>
          <div className="pro-cards">
              <h1>🍎</h1>
              <h4>Vegetables</h4>
              <p>Fresh & Organic</p>
          </div>


      </div>
      
    </section>
  );
}
