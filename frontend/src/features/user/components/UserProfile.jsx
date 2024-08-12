import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import Modal from "../../cart/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useAlert } from "react-alert";

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [selectedEdit, setSelectedEdit] = useState(-1);
  const [addAddressShow, setAddAddressShow] = useState(-1);
  const [editProfileShow, setEditProfileShow] = useState(-1);
  const [openShowModal, setOpenShowModal] = useState(-1);

  const handleDelete = (e, index) => {
    const newData = { ...user, addresses: [...user.addresses] };
    newData.addresses.splice(index, 1);
    dispatch(updateUserAsync(newData));
    setOpenShowModal(-1);
    alert.success("Address Deleted Successfully");
  };

  const handleEdit = (data, index) => {
    const newData = { ...user, addresses: [...user.addresses] };
    newData.addresses.splice(index, 1, data);
    dispatch(updateUserAsync(newData));
    setSelectedEdit(-1);
    alert.success("Address Edited Successfully");
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditForm = (index) => {
    setSelectedEdit(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pincode", address.pincode);
  };
  const handleEditProfile = () => {
    setEditProfileShow(1);
    setValue("name", user.name);
    setValue("image", user.image);
  };

  const handleUpdateProfile = (data) => {
    const newData = { ...user, name: data.name, image: data.image };
    dispatch(updateUserAsync(newData));
    setEditProfileShow(-1);
    alert.success("Profile Updated");
  };
  const handleAdd = (data) => {
    const newData = { ...user, addresses: [...user.addresses, data] };
    dispatch(updateUserAsync(newData));
    setAddAddressShow(-1);
    alert.success("Address Added Successfully");
  };
  return (
    <div>
      <div className="mx-auto min-h-screen  bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl py-6 mx-8 font-bold tracking-tight text-gray-900">
          My Profile
        </h1>
        <header className="my-8">
          <div className="flex  flex-col md:flex-row items-center lg:justify-between justify-around">
            <div className="w-40 px-5 mx-2 my-auto ">
              <img
                src={user?.image}
                alt={user?.name}
                className="rounded-full my-5 border-4 border-gray-800 bg-indigo-600 "
              />
            </div>
            <div className="flex flex-col my-auto w-4/5 max-w-7xl px-4  py-6 md:px-6 lg:px-8">
              <h1 className="md:text-1xl lg:text-3xl capitalize font-semibold tracking-tight text-gray-800">
                Name : {user?.name}
              </h1>
              <h3 className="md:text-xl font-semibold tracking-tight text-gray-800">
                Email Address : {user?.email}
              </h3>
              {user?.role === "admin" && (
                <h3 className="md:text-xl font-semibold capitalize tracking-tight text-indigo-500">
                  Role : {user?.role}
                </h3>
              )}
            </div>
            {editProfileShow !== 1 ? (
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 -mr-64 py-3 md:-mt-24 md:mx-2 lg:-mt-24"
                onClick={() => handleEditProfile()}
              >
                <PencilSquareIcon className="h-6" />
              </button>
            ) : (
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 -mr-64 py-3 md:-mt-24 md:mx-2 lg:-mt-24"
                onClick={() => setEditProfileShow(-1)}
              >
                <XMarkIcon className="h-6" />
              </button>
            )}
          </div>
          {editProfileShow === 1 && (
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                handleUpdateProfile(data);
                reset();
              })}
              className=" mx-12 my-auto"
            >
              <div className="py-6  grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile Picture
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("image", {
                        required: "Profile Picture is required",
                      })}
                      id="image"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                      })}
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="font-medium bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-lg text-white mb-4"
              >
                Save
              </button>
            </form>
          )}
        </header>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
          {/* New Address Form */}
          {addAddressShow === 1 && (
            <form
              className="bg-white px-6 "
              noValidate
              onSubmit={handleSubmit((data) => {
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-4xl font-bold leading-7 text-gray-900 pb-4">
                    Address Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Add New Address where you can receive delivery.
                  </p>

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
                      onClick={() => {
                        reset();
                        setAddAddressShow(-1);
                      }}
                    >
                      Cancel
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
            </form>
          )}
          <p className="mt-2 text-base font-medium text-gray-500">
          {user?.addresses?.length >1 ?"Your Addresses:":"Your Address:"}
          </p>
          {user?.addresses?.length !== 0 ? (
            user?.addresses?.map((address, index) => (
              <div key={index}>
                {/* Address Edit Form */}
                {selectedEdit === index && (
                  <form
                    className="bg-white px-6 py-10 "
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
                  >
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-4xl font-bold leading-7 text-gray-900 pb-4">
                          Edit Address Information
                        </h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

                          {/* email section */}
                          {/* <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div> */}

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
                            onClick={() => setSelectedEdit(-1)}
                          >
                            Cancel
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
                  </form>
                )}
                {/* Address boxes */}
                {selectedEdit !== index && (
                  <div
                    key={index}
                    className="md:flex relative justify-between rounded gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 my-3"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.pincode}
                        </p>
                      </div>
                    </div>
                    <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {address.city}
                      </p>
                    </div>

                    <div className="absolute md:relative top-5 right-5 md:top-0 md:right-0">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => handleEditForm(index)}
                        >
                          <PencilSquareIcon className="h-6" />
                        </button>
                        <Modal
                          title={"Delete"}
                          massage={`Are you sure Delete this Address ?`}
                          dangerAction={(e) => handleDelete(e, index)}
                          dangerOption={"Remove"}
                          showModal={openShowModal === index}
                          cancelAction={() => setOpenShowModal(-1)}
                        />
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-red-500"
                          onClick={(e) => setOpenShowModal(index)}
                        >
                          <TrashIcon className="h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="md:flex justify-between cursor-not-allowed  gap-x-6 px-5 py-5 rounded border-solid border-2 border-gray-200 my-3">
              <div className="flex justify-center text-gray-500 items-center text-center w-full">
                <h1>Please Add Address !!!</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
