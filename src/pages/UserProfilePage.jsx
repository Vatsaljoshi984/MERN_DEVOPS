import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";
import Footer from "../features/Footer/Footer";

const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <UserProfile />
      </Navbar>
      <Footer/>
    </>
  );
};

export default UserProfilePage;
