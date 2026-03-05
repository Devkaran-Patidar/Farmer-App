import { Outlet } from "react-router-dom";
import BuyerHeader from "../Components/buyer/BuyerHeader.jsx";
import BuyerFooter from "../Components/buyer/BuyerFooter.jsx";
import { useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom";
const BuyerLayout = ({islogin ,setIslogin ,setCartCount, cartCount ,}) => {
  const role = localStorage.getItem("role");
     let navigate = useNavigate();
  if (!islogin || role !== "buyer") {
    return <Navigate to="/" replace />;
  }


  // change Navigate function
  return (
    <>
      <BuyerHeader islogin={islogin} setIslogin={setIslogin} setCartCount={setCartCount} cartCount={cartCount} />
      <main>
        <Outlet />
      </main>
      <BuyerFooter />
    </>
  );
};

export default  BuyerLayout;
