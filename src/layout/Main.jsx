import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Main = () => {
  return (
    <div>
      <div className=" font-sans max-w-[1400px] mx-auto px-6 min-h-[calc(100vh-35px)]">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
