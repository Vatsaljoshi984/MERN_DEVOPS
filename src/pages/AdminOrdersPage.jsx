import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";
import Footer from "../features/Footer/Footer";

const AdminOrdersPage = () => {
  return (
    <>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
      <Footer />
    </>
  );
};

export default AdminOrdersPage;
