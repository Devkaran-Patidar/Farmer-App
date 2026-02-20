import { Outlet,Navigate } from "react-router-dom";
import FarmerHeader from "../Components/farmer/FarmerHeader.jsx";

const FarmerLayout = ({islogin ,setIslogin}) => {
   const role = localStorage.getItem("role");
   const id = localStorage.getItem("userId");
   console.log("islogin:", islogin);
  console.log("role:", role);
  console.log("userId:",id)
  if (!islogin || role !== "farmer") {
    return <Navigate to="/" replace />;
  }
  return (
    // <>
    //   <main>
    //     <Outlet />
    //   </main>
    //   {/* <FarmerFooter /> */}
    // </>

    < >
      
      <FarmerHeader islogin={islogin} setIslogin={setIslogin} />
      {/* <FarmerSiderBar /> */}

      <main >
        <Outlet />
      </main>

    </>
  );
};

export default FarmerLayout;


  