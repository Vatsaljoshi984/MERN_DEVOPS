import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import {
  ChevronDoubleDownIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const ITEMS_PER_PAGE = 5;

export default function UserOrders() {
  const [page, setPage] = useState(1);

  const orders = useSelector(selectUserOrders);

  const dispatch = useDispatch();
  const [openOrderShow, setOpenOrderShow] = useState(-1);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchLoggedInUserOrdersAsync({ pagination }));
  }, [page, dispatch]);

  const handlePage = (page) => {
    setPage(page);
  };

  return (
    <div className="bg-white pb-6 min-h-screen">
      <h1 className="text-4xl py-6 mx-8 font-bold tracking-tight text-gray-900">
        My Orders
      </h1>
      <div className="p-1">
        {orders.orders?.length ? (
          orders.orders?.map((orders, index) => (
            <div key={index} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex rounded-md bg-indigo-100 justify-between border-gray-500 px-2 py-3 my-2 sm:px-6">
                <div className="flex w-2/6 md:w-3/12 items-center -space-x-7 ">
                  {orders.products?.map((item) => (
                    <div key={item?.product?.id}>
                      <img
                        alt={item?.product?.title}
                        src={item?.product?.thumbnail}
                        className="relative inline-block bg-white h-10 w-10 mx-1 md:h-20 md:w-20 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                      />
                    </div>
                  ))}
                </div>
                <div className="my-auto max-w-7xl w-4/6 md:w-8/12 sm:px-6 lg:px-8 ">
                  <h1 className="md:text-2xl text-sm lg:font-bold tracking-tight text-gray-900">
                    Order #{orders.id.slice(0, 12).concat("...")}
                  </h1>
                  <h3 className="md:text-lg text-xs lg:font-bold tracking-tight text-red-900">
                    Order Status : {orders.status}
                  </h3>
                </div>
                <div className="">
                  {openOrderShow !== index ? (
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 "
                      onClick={() => setOpenOrderShow(index)}
                    >
                      <ChevronDoubleDownIcon className="h-6" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 "
                      onClick={() => setOpenOrderShow(-1)}
                    >
                      <XMarkIcon className="h-6" />
                    </button>
                  )}
                </div>
              </div>
              {openOrderShow === index && (
                <div
                  className="mx-auto my-2  max-w-7xl px-4 sm:px-6 lg:px-8"
                  key={orders.id}
                >
                  <header className="bg-white ">
                    <div className="my-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                      <h1 className="md:text-4xl font-semibold md:font-bold tracking-tight text-gray-900">
                        Order #{orders.id}
                      </h1>
                      <h3 className="md:text-xl md:font-bold tracking-tight text-red-900">
                        Order Status : {orders.status}
                      </h3>
                    </div>
                  </header>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {orders.products?.map((item) => (
                          <li key={item?.product?.id} className="flex py-6">
                            <div className="h-16 w-16 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item?.product?.thumbnail}
                                alt={item?.product?.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base md:font-medium text-gray-900">
                                  <h3>
                                    <Link to={`/product/${item?.product?.id}`}>
                                      {item?.product?.title}
                                    </Link>
                                  </h3>
                                  <p className="ml-4">
                                    ₹{item?.product?.discountedPrice}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item?.product?.color}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="Qty"
                                    className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty : {item?.quantity}
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
                      <p>Total Items</p>
                      <p>{orders.totalItems} </p>
                    </div>
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>₹{orders.totalAmount}</p>
                    </div>
                    <p className="mt-0.5 text-base font-medium text-gray-500">
                      Shipping Address
                    </p>
                    <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 my-3">
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {orders?.selectedAddress?.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {orders?.selectedAddress?.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {orders?.selectedAddress?.pincode}
                          </p>
                        </div>
                      </div>
                      <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {orders?.selectedAddress?.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {orders?.selectedAddress?.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            <div className="border-t border-gray-200 px-4 py-8 sm:px-6">
              <div className="text-center mt-20">
                <div className="font-black text-gray-200 w-full h-60 m-auto relative flex justify-center items-center">
                  <XCircleIcon className="absolute text-gray-400/80 my-auto h-60 " />
                </div>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  No Orders
                </p>

                <Link
                  to="/product"
                  className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {orders.orders?.length ? (
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalOrders={orders.totalOrders}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function Pagination({ handlePage, page, setPage, totalOrders }) {
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);
  return (
    <div className="flex m-8 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() => handlePage(totalPages > page ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalOrders
                ? totalOrders
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalOrders}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() => handlePage(1 < page ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array?.from({ length: totalPages }).map((e, index) => (
              <div
                key={index}
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900 cursor-pointer disabled"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={() => handlePage(totalPages > page ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
