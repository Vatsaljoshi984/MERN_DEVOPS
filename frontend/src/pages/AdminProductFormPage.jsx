import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductForm from "../features/admin/components/AdminProductForm";
import Footer from "../features/Footer/Footer";

const AdminProductFormPage = () => {
  return (
    <>
      <Navbar>
        <AdminProductForm></AdminProductForm>
      </Navbar>
      <Footer/>
    </>
  );
};

export default AdminProductFormPage;
