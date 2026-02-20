import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Home/Home_header.jsx";

export default function HomeLayout() {
  return (
    <section>
      <Header />  
      <main>
        <Outlet />
      </main>
    </section>
  );
}
