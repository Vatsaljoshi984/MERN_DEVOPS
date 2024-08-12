import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../cart/cartSlice";
import { selectLoggedInUser, selectUserChecked } from "../auth/authSlice";
import { fetchLoggedInUserAsync, selectUserInfo } from "../user/userSlice";

const navigation = [
  { name: "Home", link: "/", user: true },
  { name: "Products", link: "/product", user: true },
  {
    name: "About",
    link: "https://divyesh-nandanwar.vercel.app/projects/e-commerce-onlineStore",
    user: true,
    target: "_blank",
  },
];
const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = ({ children }) => {
  const items = useSelector(selectCart);
  const user = useSelector(selectUserInfo);
  const userChecked = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userChecked && user) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [userNavigation]);

  const location = useLocation();
  return (
    <div>
      <div className="min-h-full " id="navbar">
        <Disclosure as="nav" className="bg-gray-800 ">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link to="/">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 lg:pr-8"
                          src="/online.png"
                          alt="Online Store"
                        />
                      </div>
                    </Link>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            target={item?.target}
                            key={item.name}
                            to={item.link}
                            className={classNames(
                              location.pathname == item.link
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                        {/* Admins Menu */}
                        {userChecked?.role === "admin" ? (
                          <>
                            <Link
                              to="/admin"
                              className={classNames(
                                location.pathname === "/admin"
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                            >
                              Admin
                            </Link>
                            <Link
                              to="/admin/orders"
                              className={classNames(
                                location.pathname === "/admin/orders"
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                            >
                              Admin Orders
                            </Link>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {userChecked ? (
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <Link to="/cart">
                          <div className="ml-4 flex items-center md:ml-6">
                            <button
                              type="button"
                              className={`${
                                location.pathname == "/cart"
                                  ? "bg-gray-900 text-white focus:outline-none ring-2 ring-white focus:ring-offset-gray-800 "
                                  : " "
                              } relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white `}
                            >
                              <span className="absolute -inset-1.5" />
                              <ShoppingCartIcon
                                className="h-6 w-6 "
                                aria-hidden="true"
                              />
                            </button>
                            {items.length > 0 ? (
                              <span className="inline-flex items-center rounded-full bg-blue-50  px-2 py-1 mb-7 -ml-3 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700 z-10">
                                {items.length}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </Link>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full bg-indigo-400 "
                                src={user?.image}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:block ">
                      <div className="gap-4 flex items-center md:gap-6">
                        <Link
                          to={"/login"}
                          className={classNames(
                            "hover:bg-gray-900 bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          Login
                        </Link>
                        <Link
                          to={"/signup"}
                          className={classNames(
                            "hover:bg-indigo-900 bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          Signup
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden h-fit">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.link}
                        className={classNames(
                          location.pathname === item.link
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={
                          location.pathname === item.link ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                  {/* Admins Menu */}
                  {userChecked?.role === "admin" ? (
                    <div className="h-20">
                      <Link
                        to="/admin"
                        className={classNames(
                          location.pathname === "/admin"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                      >
                        Admin
                      </Link>
                      <Link
                        to="/admin/orders"
                        className={classNames(
                          location.pathname === "/admin/orders"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md block my-1 px-3 py-2 text-base font-medium"
                        )}
                      >
                        Admin Orders
                      </Link>
                    </div>
                  ) : null}
                </div>
                {userChecked ? (
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center justify-between px-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user?.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {user?.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                      <Link to="/cart">
                        <div className="flex items-center px-5">
                          <button
                            type="button"
                            className={`${
                              location.pathname == "/cart"
                                ? "bg-gray-900 text-white focus:outline-none ring-2 ring-white focus:ring-offset-gray-800 "
                                : " "
                            } relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white `}
                          >
                            <span className="absolute -inset-1.5" />

                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                          {items.length > 0 ? (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 mb-7 -ml-3 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 z-10">
                              {items.length}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation?.map((item) => (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={classNames(
                            location.pathname === item.link
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md block my-1 px-3 py-2 text-base font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-6 items-center justify-end px-2 pb-3 pt-2 sm:px-3">
                    <Link
                      to="/signup"
                      className={
                        "hover:bg-indigo-900 bg-indigo-700 text-white block rounded-md px-3 py-2 text-base font-medium"
                      }
                    >
                      Signup
                    </Link>
                    <Link
                      to="/login"
                      className={classNames(
                        "hover:bg-gray-900 bg-gray-700 text-white block rounded-md px-3 py-2 text-base font-medium"
                      )}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto  max-w-7xl sm:px-6 lg:px-8 ">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Navbar;
