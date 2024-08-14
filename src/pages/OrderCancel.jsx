import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCart } from "../features/cart/cartAPI";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/Order/OrderSlice";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/Footer/Footer";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const OrderCancel = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(resetCartAsync(user?.id));
    dispatch(resetOrder());
  }, [dispatch, user]);
  return (
    <>
      {/* {!params?.id && <Navigate to="/" replace={true} />} */}
      <Navbar/>
      <main className="grid min-h-[90vh] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center ">
          <div className="w-full ">
            <div className="p-10 md:px-20 border-2 border-red-500 rounded-md ">
              <div className="flex items-center justify-center flex-col h-full ">
                {/* <h1 className=" text-lg font-semibold tracking-tight text-gray-900 ">
                  Order Number #{params?.id}
                </h1> */}
                <ExclamationTriangleIcon className="w-24 text-red-500 my-4" />
                <p className="text-3xl mb-2 font-bold text-red-500">
                  Order Canceled
                </p>
                {/* <p className="mt-4 text-base leading-7 text-gray-600">
                  You can check your order in{" "}
                  <Link
                    to="/orders"
                    className="hover:text-indigo-600 font-medium"
                  >
                    My Orders
                  </Link>
                </p> */}

                <div className="mt-6 flex items-center justify-center gap-x-6">
                  <Link
                    to="/"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Go back home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default OrderCancel;
