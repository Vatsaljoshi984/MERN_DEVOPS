import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function AdminOrderModal({
  order,
  chooseColor,
  showModal,
  cancelAction,
}) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const handelDanger = () => {
    setOpen(false);
    dangerAction();
  };
  const handelCancel = () => {
    setOpen(false);
    cancelAction();
  };

  useEffect(() => {
    if (showModal) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showModal]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="bg-gray-50 px-4 items-center  py-3 sm:flex sm:justify-between sm:px-6">
                  <div className="mx-auto mt-4 md:mt-0 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <img
                      className="h-full rounded-full border-gray-400 border-2"
                      src={order?.user?.image}
                    />
                  </div>
                  <div className="w-full text-center md:text-left md:px-4 text-2xl text-gray-800  gap-2">
                    <p className=" text-xl">{order?.user?.name}</p>
                    <p className=" text-base">{order?.user?.email}</p>
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handelCancel}
                    ref={cancelButtonRef}
                  >
                    <XMarkIcon className="w-8 h-8" />
                  </button>
                </div>
                <div className="bg-white px-4 pb-4   sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold px-4 mt-2 leading-6 text-gray-800"
                      >
                        ORDER# {order?.id}
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="mx-2" key={order.id}>
                          <div className=" px-2 py-3 sm:px-2">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="divide-y divide-gray-200"
                              >
                                {order.products?.map((item) => (
                                  <li
                                    key={item?.product?.id}
                                    className="flex py-1.5"
                                  >
                                    <div className="h-14 w-14 md:h-14 md:w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={item?.product?.thumbnail}
                                        alt={item?.product?.title}
                                        className="h-full w-full object-contain object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base md:font-medium text-gray-900">
                                          <Link
                                            to={`/product/${item?.product?.id}`}
                                          >
                                            <h3 className="hover:italic capitalize hover:underline">
                                              <p>{item?.product?.title}</p>
                                            </h3>
                                          </Link>
                                          <p className="ml-4">
                                            ₹{item?.product?.discountedPrice}.00
                                          </p>
                                        </div>
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

                          <div className=" px-1.5 py-1.5 sm:px-6">
                            <div className="flex justify-between my-2 text-base font-medium text-gray-800">
                              <p>Status</p>
                              <p
                                className={`${chooseColor(
                                  order.status
                                )} py-1 px-3 capitalize rounded-full `}
                              >
                                {order.status}
                              </p>
                            </div>
                            <div className="flex justify-between my-2 text-base font-medium text-gray-800">
                              <p>Total Items</p>
                              <p>{order.totalItems} </p>
                            </div>
                            <div className="flex justify-between my-2 text-base font-medium text-gray-800">
                              <p>Subtotal</p>
                              <p>₹{order.totalAmount}.00</p>
                            </div>
                            <p className="mt-0.5 text-base font-medium text-gray-800">
                              Shipping Address
                            </p>
                            <div className="flex justify-between uppercase gap-x-6 p-2 border-solid border-2 border-gray-600 my-3">
                              <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    Name: {order?.selectedAddress?.name}
                                  </p>
                                  <p className="mt-1 truncate text-sm leading-5 text-gray-800">
                                    {order?.selectedAddress?.street}
                                  </p>
                                  <p className="mt-1 truncate text-sm leading-5 text-gray-800">
                                    {order?.selectedAddress?.pincode}
                                  </p>
                                </div>
                              </div>
                              <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">
                                  Phone: {order?.selectedAddress?.phone}
                                </p>
                                <p className="text-sm leading-6 text-gray-900">
                                  {order?.selectedAddress?.city}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
