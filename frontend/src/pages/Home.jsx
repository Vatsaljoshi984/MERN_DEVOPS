import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/Product/components/ProductList";
import Footer from "../features/Footer/Footer";
import HomePage from "../features/Home/HomePage";

const Home = () => {
  return (
    <>
      <Navbar />
      
      <HomePage />

      <Footer />
    </>
  );
};

export default Home;
