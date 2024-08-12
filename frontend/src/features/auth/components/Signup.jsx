import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { createUserAsync, selectLoggedInUser } from "../authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}

      <div>
        <div>
          <div className="flex bg-white min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
            <div className="flex gap-4 mb-6 items-center justify-between sm:mx-auto sm:w-full sm:max-w-sm">
              <Link to="/">
                <img
                  className="mx-auto h-12 w-auto"
                  src="online2.png"
                  alt="Online Store"
                />
              </Link>
              <h2 className=" text-right text-2xl capitalize font-bold leading-9 tracking-tight text-gray-900">
                Sign up for account
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                noValidate
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    createUserAsync({
                      name:data.name,
                      email: data.email,
                      password: data.password,
                      addresses: [],
                      role: "user",
                    })
                  );
                })}
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      autoComplete="name"
                      {...register(
                        "name",
                        { required: "name is Required" },
                        {
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: "Full Name is Not Valid",
                          },
                        }
                      )}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">{errors?.name?.message}</p>
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email Address
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
                      autoComplete="new-password"
                      {...register("password", {
                        required: "Password is Required",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                          message: `- at least 8 characters\n
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                        - Can contain special characters`,
                        },
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">{errors?.password?.message}</p>
                  </div>
                </div>
                {/* Conform Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      autoComplete="new-password"
                      {...register("confirmPassword", {
                        required: "Conform Password is Required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "password not matching ",
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">
                      {errors?.confirmPassword?.message}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Log in
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
      </div>
    </>
  );
}
