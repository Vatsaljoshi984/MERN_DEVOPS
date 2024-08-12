import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectedProductById,
  updateProductAsync,
} from "../../Product/ProductListSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../../cart/Modal";
import { useAlert } from "react-alert";
import { createBrandAsync } from "../adminSlice";

export default function AdminBrandForm() {
  const category = useSelector(selectAllCategories);
  const brand = useSelector(selectAllBrands);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectedProductById);
  const [openShowModal, setOpenShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const alert = useAlert();
  const navigate = useNavigate();
  return (
    <form
      noValidate
      className="m-8 min-h-screen"
      onSubmit={handleSubmit((data) => {
        const label = data.value.toLowerCase().replace(" ", "-");
        const newBrand = { ...data, label };

        dispatch(createBrandAsync(newBrand));
        alert.success(`Product Successfully Created !!!`);

        reset();
        navigate("/admin")

      })}
    >
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Brand
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed in Selection so be careful what
            you write as Title of Brand.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="value"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("value", {
                      required: "Title is required",
                    })}
                    id="value"
                    autoComplete="value"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Smart Phones"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand Image
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("image", {
                      required: "Image is required",
                    })}
                    id="image"
                    autoComplete="image"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="https://janesmith.xyz.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center md:justify-end gap-x-6 justify-center">
        <Link to="/admin">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </Link>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Brand
        </button>
      </div>
    </form>
  );
}
