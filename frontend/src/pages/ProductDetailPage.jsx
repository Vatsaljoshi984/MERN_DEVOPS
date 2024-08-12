import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/Product/components/ProductDetail";
import Footer from "../features/Footer/Footer";

const ProductDetailPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
      <Footer/>
    </>
  );
};

export default ProductDetailPage;
