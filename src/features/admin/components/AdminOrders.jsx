import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../Order/OrderSlice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import AdminOrderModal from "./AdminOrderModal";
import { Link } from "react-router-dom";
const ITEMS_PER_PAGE = 10;

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const totalOrders = useSelector(selectTotalOrders);
  const orders = useSelector(selectAllOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleSort = (option) => {
    let sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handlePage = (page) => {
    setPage(page);
  };
  const [openShowModal, setOpenShowModal] = useState(-1);
  const [open, setOpen] = useState(true);

  const handleView = (e) => {};
  const handleEdit = (e, order) => {};

  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-red-200 text-red-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-blue-200 text-blue-600";
    }
  };
  return (
    <div className="min-h-screen">
      {/* component */}

      <div className="overflow-x-auto m-8 ">
        <div className=" bg-white px-6 py-0 flex justify-center font-sans overflow-auto ">
          <div className="w-full">
            <h2 className="text-4xl font-bold leading-7 text-gray-900 pb-4">
              Admin Orders Dashbord
            </h2>
            {orders.length ? (
              <div className="bg-white rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th
                        className="py-3 px-6 text-left flex items-center cursor-pointer"
                        onClick={(e) =>
                          handleSort({
                            sort: "id",
                            order: sort._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        # Order
                        {sort._sort === "id" &&
                          (sort._order === "asc" ? (
                            <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                          ))}
                      </th>
                      <th className="py-3 px-6 text-left">Users</th>
                      <th
                        className="py-3 px-6 text-center"
                        onClick={(e) =>
                          handleSort({
                            sort: "totalAmount",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Total Amount{" "}
                        {sort._sort === "totalAmount" &&
                          (sort._order === "asc" ? (
                            <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                          ))}
                      </th>
                      {/* <th className="py-3 px-6 text-center">
                      Shipping Addresses
                    </th> */}
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders.map((order, index) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        {/* OrderID */}
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">#{order.id}</span>
                          </div>
                        </td>
                        {/* Users */}
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-10 h-10 object-cover border-2 border-gray-400 rounded-full"
                                src={order?.user?.image}
                              />
                            </div>
                            {order?.user?.name}
                          </div>
                          {/* {order.products.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-10 h-10 object-cover border-2 border-gray-400 rounded-sm"
                                src={item?.user?.image}
                              />
                            </div>
                            <span className="text-sm">
                              {item?.user?.slice(0, 20)} #
                              {item?.quantity}
                            </span>
                          </div>
                        ))} */}
                        </td>
                        {/* totalAmount */}
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <span>₹{order.totalAmount}</span>
                          </div>
                        </td>
                        {/* Shipping Address */}
                        {/* <td className="py-3 px-6 text-center">
                        <div className="">
                          <strong>
                            {" "}
                            {order.selectedAddress?.name.toUpperCase()}
                          </strong>
                          <div>{order.selectedAddress?.street}</div>
                          <div>{order.selectedAddress?.city.toUpperCase()}</div>
                          <div>
                            {order.selectedAddress?.state.toUpperCase()}
                          </div>
                          <div>{order.selectedAddress?.pincode}</div>
                          <div>{order.selectedAddress?.phone}</div>
                        </div>
                      </td> */}
                        {/* status */}
                        <td className="py-3 px-6 text-center">
                          {editableOrderId === index + 1 ? (
                            <select
                              className="text-xs"
                              onChange={(e) => handleUpdate(e, order)}
                            >
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(
                                order.status
                              )} py-1 px-3 rounded-full text-xs `}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>
                        {/* Actions */}
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center gap-2">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <EyeIcon
                                className="w-5 h-5"
                                onClick={() => setOpenShowModal(index + 1)}
                              />
                            </div>
                            <div>
                              <AdminOrderModal
                                chooseColor={chooseColor}
                                order={order}
                                showModal={openShowModal === index + 1}
                                cancelAction={() => setOpenShowModal(-1)}
                              />
                            </div>
                            {/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-5 h-5"
                              onClick={(e) => handleEdit(e, order)}
                            />
                          </div> */}
                            {editableOrderId !== index + 1 ? (
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <PencilIcon
                                  className="w-5 h-5"
                                  onClick={(e) => setEditableOrderId(index + 1)}
                                />
                              </div>
                            ) : (
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <XMarkIcon
                                  className="w-5 h-5"
                                  onClick={() => setEditableOrderId(-1)}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <div className="border-t mt-4 border-gray-200 px-4 py-8 sm:px-6">
                  <div className="text-center mt-20">
                    <div className="font-black text-gray-200 w-full h-60 m-auto relative flex justify-center items-center">
                      <XCircleIcon className="absolute text-gray-400/80 my-auto h-60 " />
                    </div>

                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      No Orders
                    </p>

                    <Link
                      to="/"
                      className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
                    >
                      &larr; Back to Home
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {orders.length ? (
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalOrders={totalOrders}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminOrders;

function Pagination({ handlePage, page, setPage, totalOrders }) {
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);
  return (
    <div className="flex max-h-full m-8 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
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
