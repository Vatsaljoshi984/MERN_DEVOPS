import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  selectAllProducts,
} from "../Product/ProductListSlice";
import { Link, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectAllProducts);
  const categoryProducts = products.filter((el) => el.category === id);
  const NewProducts = categoryProducts.slice(-6).reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);
  return (
    <>
      <section className="max-w-7xl mx-auto h-fit lg:mx-32">
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Explore Our Exclusive <h2 className="text-indigo-500 inline-block">{id}</h2> Collection
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
            Quality Meets Style: Unveiling <p className="text-indigo-800 inline-block text-lg">{id}</p> Essentials for Every Taste
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
                      className="absolute bg-white inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
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
          <div className="flex items-center justify-center mt-8 mb-10">
            <Link to="/product">
              <span className="mt-1.5 inline-block bg-indigo-600 hover:bg-indigo-700 rounded px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                More Products
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryProduct;
