import { useState } from "react";
import {
  ShoppingCartIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCartAsync,
  selectCart,
  updateCartAsync,
} from "./cartSlice";
import Modal from "./Modal";
import { useAlert } from "react-alert";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const [openShowModal, setOpenShowModal] = useState(-1);
  const items = useSelector(selectCart);
  const alert = useAlert();

  const totalAmount = items?.reduce(
    (amount, item) => item?.product?.discountedPrice * item.quantity + amount,
    0
  );
  const totalItems = items?.reduce((total, item) => item.quantity + total, 0);
  const dispatch = useDispatch();

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleDelete = (e, product) => {
    dispatch(deleteProductFromCartAsync(product.id));
    alert.success(`Product Successfully Deleted From Cart`);
  };

  
  return (
    <>
      <div className="mx-auto min-h-screen my-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        {items.length ? (
          <>
            <header className="bg-white ">
              <div className="my-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <q className="text-sm pt-2 pb-4 font-thin md:text-base lg:pb-0">
                  Your Cart, Your Choices: Review and Confirm Your Selections
                </q>
              </div>
            </header>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items?.map((item, index) => (
                    <li key={item?.product?.id} className="flex py-6 relative px-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item?.product?.thumbnail}
                          alt={item?.product?.title}
                          className="h-full w-full object-contain object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3 className={`${item?.product?.stock <= 0?"z-20 text-gray-600 hover:text-gray-700":""}`}>
                              <Link
                                to={`/product/${item?.product?.id}`}
                                className="cursor-pointer hover:italic hover:underline"
                              >
                                {item?.product?.title}
                              </Link>
                            </h3>
                            <p className="ml-4">
                              ₹{item?.product?.discountedPrice}
                            </p>
                          </div>
                          
                          {item?.product?.stock <= 0 && (
                            <div className="absolute top-0 left-0 w-full h-full z-10 ">
                              <p className="text-red-500 border flex items-center justify-center bg-red-100/50 h-full border-red-600 rounded text-center uppercase font-black text-2xl">
                                Out of Stock
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="Qty"
                              className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => handleQuantity(e, item)}
                              value={item?.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </div>

                          <div className="flex">
                            <Modal
                              title={"Remove"}
                              massage={`Are you sure Remove ${item.product?.title} ?`}
                              dangerAction={(e) => handleDelete(e, item)}
                              dangerOption={"Remove"}
                              showModal={openShowModal === index}
                              cancelAction={() => setOpenShowModal(-1)}
                            />
                            <button
                              type="button"
                              className="font-medium text-indigo-600 z-20 hover:text-indigo-500"
                              onClick={() => setOpenShowModal(index)}
                            >
                              Remove
                            </button>
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
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
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
          <div className="flex items-center justify-center mt-20 px-4 py-8 sm:px-6">
            <div className="text-center ">
              <div className="font-black text-gray-200 w-full h-60 m-auto relative flex justify-center items-center">
                <ShoppingCartIcon className="absolute text-gray-400/75 h-64 items-center " />
                <XCircleIcon className="absolute text-gray-400/80 my-auto h-20  -mt-10 -mr-8 " />
              </div>

              <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Cart is Empty
              </p>

              <p className="mt-4 text-gray-500">Please Add Some Products.</p>

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
    </>
  );
}
