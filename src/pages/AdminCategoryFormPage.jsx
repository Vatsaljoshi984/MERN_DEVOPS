import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminCategoryForm from "../features/admin/components/AdminCategoryForm";
import Footer from "../features/Footer/Footer";

const AdminCategoryFormPage = () => {
  return (
    <>
      <Navbar>
        <AdminCategoryForm></AdminCategoryForm>
      </Navbar>
      <Footer/>

    </>
  );
};

export default AdminCategoryFormPage;
