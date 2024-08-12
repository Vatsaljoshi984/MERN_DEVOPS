import { useEffect } from "react";
import Protected from "./features/auth/components/Protected";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignupPage from "./pages/SignupPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import {
  checkUserAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import PageNotFound from "./pages/404";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import AdminHome from "./pages/AdminHome";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { Provider, positions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Product from "./pages/Product";
import AdminCategoryFormPage from "./pages/AdminCategoryFormPage";
import AdminBrandFormPage from "./pages/AdminBrandFormPage";
import CategoryPage from "./pages/CategoryPage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import OrderCancel from "./pages/OrderCancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/admin",
    element: (
      <Protected>
        <ProtectedAdmin>
          <AdminHome />
        </ProtectedAdmin>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/category/:id",
    element: <CategoryPage />,
  },
  {
    path: "admin/product/:id",
    element: (
      <Protected>
        <ProtectedAdmin>
          <AdminProductDetailPage />
        </ProtectedAdmin>
      </Protected>
    ),
  },
  {
    path: "admin/orders",
    element: (
      <Protected>
        <ProtectedAdmin>
          <AdminOrdersPage />
        </ProtectedAdmin>
      </Protected>
    ),
  },
  {
    path: "admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "admin/category-form",
    element: (
      <ProtectedAdmin>
        <AdminCategoryFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "admin/brand-form",
    element: (
      <ProtectedAdmin>
        <AdminBrandFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccess />,
      </Protected>
    ),
  },
  {
    path: "/order-cancel",
    element: (
      <Protected>
        <OrderCancel />,
      </Protected>
    ),
  },
  
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrderPage />,
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />,
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

function App() {
  const dispatch = useDispatch();
  const userChecked = useSelector(selectUserChecked);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userChecked && user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <>
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </>
  );
}

export default App;
