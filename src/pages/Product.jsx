import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/Product/components/ProductList";
import Footer from "../features/Footer/Footer";

const Product = () => {
  return (
    <>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Footer/>
    </>
  );
};

export default Product;
