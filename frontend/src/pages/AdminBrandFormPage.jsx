import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminBrandForm from "../features/admin/components/AdminBrandForm";
import Footer from "../features/Footer/Footer";

const AdminBrandFormPage = () => {
  return (
    <>
      <Navbar>
        <AdminBrandForm></AdminBrandForm>
      </Navbar>
      <Footer/>

    </>
  );
};

export default AdminBrandFormPage;
