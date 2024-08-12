import React from "react";
import Cart from "../features/cart/Cart";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/Footer/Footer";

const CartPage = () => {
  return (
    <>
      <Navbar>
        <Cart />
      </Navbar>
      <Footer/>
    </>
  );
};

export default CartPage;
