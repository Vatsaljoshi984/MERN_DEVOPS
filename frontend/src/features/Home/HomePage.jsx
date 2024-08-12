import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopBrands from "./TopCategories";
import NewCollection from "./NewCollection";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBrandsAsync,
  fetchAllCategoriesAsync,
  selectAllBrands,
  selectAllCategories,
} from "../Product/ProductListSlice";
import TopCategories from "./TopCategories";

const images = [
  {
    url: "/poster1.png",
    id: 1,
  },
  {
    url: "/poster2.png",
    id: 2,
  },
  {
    url: "/poster3.png",
    id: 3,
  },
  {
    url: "/poster4.png",
    id: 4,
  },
];

const HomePage = () => {
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
    dispatch(fetchAllBrandsAsync());
  }, []);

  return (
    <div className="h-fit mx-8 lg:mx-32">
      {/* Banner */}
      <section className="-mx-8 px-8 overflow-hidden bg-white bg-cover bg-top bg-no-repeat">
        <div className="md:-mt-10  md:px-8  w-full h-fit py-16 lg:h-screen flex flex-col md:flex-row p-4 items-center  justify-evenly">
          <div className="md:hidden  md:w-3/4 md:p-10 ">
            <img src="/banner.svg" className="w-full" />
          </div>
          <div className="flex  flex-col lg:pl-8 pt-8 justify-center md:w-1/3 h-full ">
            <h2 className="text-3xl pt-4 font-bold text-gray-800 md:text-5xl lg:text-7xl ">
              Online Store
            </h2>

            <p className="hidden max-w-lg text-gray-800/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              Welcome to A Virtual Shopping Wonderland
            </p>

            <div className="mt-4 text-center md:text-left sm:mt-8 ">
              <Link
                to="/product"
                className="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Explore
              </Link>
            </div>
          </div>
          <div className="hidden md:block w-3/4 p-10 lg:p-3">
            <img src="/banner.svg" className="w-full p-1" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <TopCategories items={categories} />

      {/* Carousel */}
      <Carousel
        autoPlay
        showThumbs={false}
        showArrows={false}
        infiniteLoop
        transitionTime={2000}
        interval="4000"
        showStatus={false}
        className=" rounded-xl max-h-[1080px] mb-10 object-center overflow-hidden"
      >
        {images.map((img, i) => (
          <div key={i} className="w-full lg:h-2/3 ">
            <img
              src={img.url}
              alt="offer"
              className=" w-fit h-fit opacity-85"
            />
          </div>
        ))}
      </Carousel>

      {/* New Collections */}
      <NewCollection />
      <div className="flex items-center justify-center mb-20">
        <Link to="/product">
          <span className="mt-1.5 inline-block bg-indigo-600 hover:bg-indigo-700 rounded px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
            All Products
          </span>
        </Link>
      </div>
      {/* Our Partners */}
      <div className="mb-20">
        <div className="w-full text-center mt-8 text-xl lg:text-3xl font-bold">
          <h1>Our Partners</h1>
        </div>
        <div className="flex h-fit  my-8 justify-center flex-wrap">
          {brands?.map((el, i) => (
            <div
              key={i}
              className={`md:my-3 md:mx-3 lg:m-1.5  px-2 py-3 md:w-36 h-fit flex flex-col justify-center items-center `}
            >
              <div className="h-fit">
                <img
                  src={el.image}
                  className="w-full h-14 md:h-24 grayscale rounded-md  object-fill "
                />
              </div>
              {/* <p className=" lg:text-lg text-base font-semibold text-center ">
                  {el?.value}
                </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
