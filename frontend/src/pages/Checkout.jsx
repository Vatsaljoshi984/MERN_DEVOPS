import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CursorArrowRaysIcon,
  ShoppingCartIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import {
  deleteProductFromCartAsync,
  selectCart,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/Order/OrderSlice";
import Navbar from "../features/navbar/Navbar";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import Footer from "../features/Footer/Footer";
import { useAlert } from "react-alert";
import { loadStripe } from "@stripe/stripe-js";
import { data } from "autoprefixer";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

const Checkout = () => {
  const cartProducts = useSelector(selectCart);
  const products =cartProducts.filter((el)=>(el.product?.stock > 0))
  const totalAmount = products.reduce(
    (amount, item) => item.product?.discountedPrice * item.quantity + amount,
    0
  );
  const totalItems = products.reduce((total, item) => item.quantity + total, 0);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addAddressShow, setAddAddressShow] = useState(-1);

  const currentOrder = useSelector(selectCurrentOrder);

  const handleQuantity = (e, product) => {
    dispatch(updateCartAsync({ id: product.id, quantity: +e.target.value }));
  };

  const handleDelete = (e, product) => {
    dispatch(deleteProductFromCartAsync(product.id));
  };
  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handleOrder = () => {
    if (!selectedAddress) {
      return alert.error("Please select Address !!!");
    }
    const order = {
      products: [...products],
      totalAmount,
      totalItems,
      selectedAddress,
      status: "pending",
    };
    

    dispatch(createOrderAsync(order));
  };

  const handlePayment = async ({ user, totalAmount }) => {
    if (!selectedAddress) {
      return alert.error("Please select Address !!!");
    }
    const order = {
      products: [...products],
      totalAmount,
      totalItems,
      selectedAddress,
      status: "pending",
    };
    const headers = { "Content-type": "application/json" };
    const body = { amount: totalAmount };
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/payments/checkout`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ body, order }),
    });
    const data = await response.json();
    const options = {
      key: "rzp_test_mn7LYsqQixHsO5",
      amount: data.order.amount,
      currency: "INR",
      name: "Online Store",
      description: "Total Payment from Online Store",
      image: "/nav.png",
      order_id: data.order.id,
      callback_url: `${import.meta.env.VITE_BASE_URL}/payments`,
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#4338ca",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);

  return (
    <>
      <Navbar>
        {/* {!products.length && <Navigate to="/cart" replace={true} />} */}
        

        <div className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3  bg-white px-4 pt-10 ">
              <div className="px-3 sm:px-6">
                <h2 className="text-4xl font-bold leading-10 text-gray-900 pb-1">
                  Secure Checkout
                </h2>
                <q className="mt-1 mb-2 block text-sm leading-6 text-gray-800">
                  Your Shopping Experience, Our Priority
                </q>
                {addAddressShow !== 1 ? (
                  <button
                    onClick={() => setAddAddressShow(1)}
                    className=" rounded-md bg-indigo-600 px-3 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                ) : (
                  <button
                    onClick={() => setAddAddressShow(-1)}
                    className=" rounded-md bg-indigo-600 px-3 py-2 my-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
              {addAddressShow === 1 && (
                <form
                  className="bg-white px-6"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      updateUserAsync({
                        ...user,
                        addresses: [...user.addresses, data],
                      })
                    );
                    reset();
                    setAddAddressShow(-1);
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                type="tel"
                                {...register("phone", {
                                  required: "Phone Number is required",
                                })}
                                id="phone"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("street", {
                                  required: "street address is required",
                                })}
                                id="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("state", {
                                  required: "state is required",
                                })}
                                id="state"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pincode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Pin code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("pincode", {
                                  required: "pincode is required",
                                })}
                                id="pincode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-10 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => reset()}
                          >
                            Reset
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              {/* Address List  */}
              <div className="border-b px-3 sm:px-6 border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  {user?.addresses?.length > 1 ? "Addresses" : "Address"}
                </h2>

                {user?.addresses?.length > 0 && (
                  <p className="my-2 text-sm leading-6 text-gray-600">
                    Choose from Existing addresses
                  </p>
                )}
                <ul>
                  {user?.addresses?.length !== 0 ? (
                    user?.addresses?.map((address, index) => (
                      <li
                        key={index}
                        // onClick={}
                        className="md:flex justify-between cursor-pointer hover:border-black gap-x-6 px-5 py-5 rounded border-solid border-2 border-gray-200 my-3"
                      >
                        <label className="flex min-w-full justify-end">
                          <input
                            onChange={handleAddress}
                            id="address"
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 pl-3 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address?.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address?.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address?.pincode}
                            </p>
                          </div>
                          <div className="text-right text-sm sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              Phone: {address.phone}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {address.city}
                            </p>
                          </div>
                        </label>
                      </li>
                    ))
                  ) : (
                    <li className="md:flex justify-between cursor-not-allowed  gap-x-6 px-5 py-5 rounded border-solid border-2 border-gray-200 my-3">
                      <div className="flex justify-center text-gray-500 items-center text-center w-full">
                        <h1>Please Add Address !!!</h1>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {/* Cart section */}
            <div className="lg:col-span-2">
              <div className="mx-auto bg-white max-w-7xl px-4 sm:px-4 lg:mt-10 lg:px-0">
                <header className="bg-white ">
                  <div className="my-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-center tracking-tight text-gray-900">
                      Final Conformation
                    </h1>
                  </div>
                </header>
                {products.length ? (
                  <>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {products.map((item) => (
                            <li key={item?.id} className="flex py-6">
                              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item?.product?.thumbnail}
                                  alt={item?.product?.title}
                                  className="h-full w-full object-contain object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className="cursor-pointer">
                                      <Link
                                        to={`/product/${item?.product?.id}`}
                                      >
                                        {item?.product?.title}
                                      </Link>
                                    </h3>
                                    <p className="ml-4">
                                      ₹{item?.product?.discountedPrice}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="text-gray-500">
                                    <label
                                      htmlFor="Qty"
                                      className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Qty: {item?.quantity}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Total Items in Cart</p>
                        <p>{totalItems} </p>
                      </div>
                      <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{totalAmount}</p>
                      </div>

                      <div className="mt-6">
                        <div
                          onClick={() => {
                            handlePayment({ user, totalAmount });
                            // handleOrder();
                          }}
                          className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Payment
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or &nbsp;
                          <Link to="/product">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="border-t border-gray-200 px-4 py-8 sm:px-6">
                    <div className="text-center ">
                      <div className="font-black text-gray-200 w-full h-36 m-auto relative flex justify-center items-center">
                        <ExclamationTriangleIcon className="absolute text-red-400/75 h-32 items-center " />
                      </div>

                      <p className="text-2xl font-bold tracking-tight text-gray-500 sm:text-2xl">
                        Wait for Stocks
                      </p>

                      <p className="mt-4 text-gray-500 capitalize">
                        Please Add another Product to Continue.
                      </p>

                      <Link
                        to="/product"
                        className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
                      >
                        &larr; Continue Shopping
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Navbar>
      <Footer />
    </>
  );
};

export default Checkout;
