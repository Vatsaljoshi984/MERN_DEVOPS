import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  selectAllProducts,
} from "../Product/ProductListSlice";
import { Link } from "react-router-dom";

const NewCollection = () => {
  const products = useSelector(selectAllProducts);
  const NewProducts = products.slice(-6).reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);
  return (
    <>
      <section>
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              New Arrivals
            </h2>

            <p className="mx-auto mt-1 max-w-md text-gray-600">
            Stay Ahead of the Trends
            </p>
          </header>

          <div className="mt-8 grid gap-4 grid-cols-1 lg:grid-cols-3">
            {NewProducts &&
              NewProducts.map((product, index) => (
                <Link
                  key={index}
                  to={`/product/${product.id}`}
                  className="group overflow-hidden relative  bg-black"
                >
                  <div key={index} className="   hover:border-black">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 bg-white"
                    />

                    <div className="relative p-4 sm:p-6 lg:p-8">
                      <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {product.category}
                      </p>

                      <p className="text-xl font-bold text-white sm:text-2xl">
                        {product.title}
                      </p>

                      <div className="mt-32 sm:mt-48 lg:mt-64">
                        <div className="translate-y-8 hidden lg:inline-block transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="text-sm text-white">
                            <span className="mt-1.5 inline-block bg-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-black">
                              Shop Now
                            </span>
                          </p>
                        </div>
                        <span className="mt-1.5 lg:hidden inline-block bg-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-black">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewCollection;
