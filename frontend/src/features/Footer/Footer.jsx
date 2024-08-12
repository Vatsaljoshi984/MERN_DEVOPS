import React from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 ">
        <div className="mx-auto  max-w-7xl sm:px-6 lg:px-8 ">
          <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
            <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
              <ScrollToTop
                smooth
                 className={classNames("rounded-full w-14 h-14 flex justify-center items-center bg-indigo-300  hover:bg-indigo-400 shadow-2xl ring-2 ring-indigo-500")}
              />
            </div>

            <div className="lg:flex lg:items-end lg:justify-between">
              <div>
                <div className="flex justify-center text-indigo-600 lg:justify-start">
                  {/* <img src="./online.png" className="h-20" alt="logo" /> */}
                  <h1 className="text-5xl font-bold text-white text-center">
                    Online Store
                  </h1>
                </div>

                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-300 lg:text-left">
                  invites you to explore a virtual shopping wonderland. With the
                  strength of MERN stack and the security of Razorpay, your
                  digital shopping experience has never been this enchanting.
                </p>
              </div>

              <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
                <li>
                  <Link
                    className="text-gray-400 transition hover:text-gray-100/75"
                    to="https://divyesh-nandanwar.vercel.app" target="_blank"
                  >
                    {" "}
                    Developed by Divyesh 🧑🏻‍💻{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <p className="mt-12 text-center text-sm text-gray-200 lg:text-right">
              Copyright &copy; 2023. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
