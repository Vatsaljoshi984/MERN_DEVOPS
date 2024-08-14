import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";
import Footer from "../features/Footer/Footer";

const UserOrderPage = () => {
  return (
    <>
      <Navbar>
        <UserOrders />
      </Navbar>
      <Footer/>
    </>
  );
};

export default UserOrderPage;
