import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/Footer/Footer";
import CategoryProduct from "../features/Home/CategoryProducts";

const CategoryPage = () => {
  return (
    <>
      <Navbar />
      
      <CategoryProduct />

      <Footer />
    </>
  );
};

export default CategoryPage;
