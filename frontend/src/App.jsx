import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// css file
import "./App.css";

// layouts
import MainLayout from "./Layouts/HomeLayout.jsx";
import FarmerLayout from "./Layouts/FarmerLayout.jsx"
import BuyerLayout from "./Layouts/BuyerLayout.jsx";

// pages login / register
import Login from "./Auth_page/Login.jsx"
import Register from "./Auth_page/Register.jsx"
import Profile from "./Auth_page/Profile.jsx";

// mainhome
import Home from "./Pages/Home_pages/Home.jsx";
import About from "./Pages/Home_pages/About.jsx"
import Features from "./Pages/Home_pages/Features.jsx";
import Product from "./Pages/Home_pages/Product.jsx";
import Contact from "./Pages/Home_pages/Contact.jsx";
import ContactForm from "./Pages/Home_pages/ContactForm.jsx";

// farmer
import FarmerHome from "./Pages/Farmer_pages/FarmerHome.jsx"
import AddProduct from "./Pages/Farmer_pages/AddProduct.jsx"
import MyProducts from "./Pages/Farmer_pages/MyProduct.jsx";
import EditProduct from "./Pages/Farmer_pages/EditProduct.jsx";
import FarmerOrders from "./Pages/Farmer_pages/FarmerOrders.jsx";
import FarmerEarnings from "./Pages/Farmer_pages/FarmerEarning.jsx";

// buyer 
import ProductList from "./Pages/Buyer_pages/ProductList.jsx";
import Cart from "./Pages/Buyer_pages/Cart.jsx";
import ShopNow from "./Pages/Buyer_pages/ShopNow.jsx";
import Reciept from "./Auth_page/Receipt.jsx";
import OrderHistory from "./Pages/Buyer_pages/OrderHistory.jsx"


export default function App() {
  // const [islogin, setIslogin] =useState(false);

  // useEffect(()=>{
  //   if(localStorage.getItem("islogin")=== "true"){
  //     setIslogin(true)
  //   }
  // },[]);

  const [islogin, setIslogin] = useState(
    localStorage.getItem("islogin") === "true",
  );
  return (
    <div className="main_app">
    <BrowserRouter>
        <Routes>
                        {/* Main website */}

          <Route element={<MainLayout />}>
            <Route path="/" element={ <Home />} />
            <Route path="about" element={<About />} />
            <Route path="features" element={<Features />} />
            <Route path="product" element={<Product />} />
            <Route path="contact" element={<Contact />} />
            <Route path="contact/contactform" element={<ContactForm />} />


            <Route  path="login"  element={<Login islogin={islogin} setIslogin={setIslogin} />} />
            <Route path="register"  element={<Register islogin={islogin} setIslogin={setIslogin} />} />
          </Route>

                          {/* farmer */}

          <Route path="farmerhome" element={<FarmerLayout islogin={islogin} setIslogin={setIslogin} />}>
            <Route index element={<MyProducts/>} />
            {/* <Route index element={<FarmerHome />} /> */}
             <Route path="profile" element={<Profile />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="editproduct/:id" element={<EditProduct/>} />
            <Route path="farmerorders" element={<FarmerOrders/>} />
            <Route path="farmerearning" element={<FarmerEarnings/>} />

          </Route>


                        {/* buyer */}

           <Route path="buyerhome" element={<BuyerLayout islogin={islogin} setIslogin={setIslogin} />}>
            <Route index element={<ProductList />} />
             <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="shop-now" element={<ShopNow />} />
            <Route path="receipt/:orderId" element={<Reciept/>} />
            <Route path="orderhistory" element={<OrderHistory/>} />
          </Route>


          <Route path="*" element={<center><h1 style={{ color: "red", fontSize: "3rem" }}>Error 404 <br />This Page is Not Found</h1></center> } />

          </Routes> 

      </BrowserRouter>
    </div>
  );
}
