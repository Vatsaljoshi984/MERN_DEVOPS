import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUserAsync, selectError, selectLoggedInUser } from "../authSlice";
import { useForm } from "react-hook-form";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // console.log(user,"ashvsdh");
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div>
        <div className="flex bg-white min-h-screen flex-1 flex-col items-center justify-center px-5 py-10 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
              <img
                className="mx-auto h-16 w-auto"
                src="online2.png"
                alt="Online Store"
              />
            </Link>
            <h2 className="mt-8 text-center capitalize text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login in to your account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              className="space-y-6"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginUserAsync({
                    email: data.email,
                    password: data.password,
                  })
                );
              })}
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    autoComplete="email"
                    {...register(
                      "email",
                      { required: "Email is Required" },
                      {
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: "Email is Not Valid",
                        },
                      }
                    )}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500">{errors?.email?.message}</p>
                </div>
              </div>
              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is Required",
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className="text-red-500">{errors?.password?.message}</p>
                </div>
              </div>

              <p className="text-red-500">{error?.message}</p>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create an Account
              </Link>
            </p>

            <div className="mt-4 text-center mx-auto sm:mt-8 ">
              <Link
                to="/"
                className="inline-block items-center text-center rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
