import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/components/AdminProductList";
import Footer from "../features/Footer/Footer";

const AdminHome = () => {
  return (
    <>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
      <Footer/>
    </>
  );
};

export default AdminHome;
