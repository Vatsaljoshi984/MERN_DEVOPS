import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/Product/components/ProductDetail";

const AdminProductDetailPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
    </>
  );
};

export default AdminProductDetailPage;
