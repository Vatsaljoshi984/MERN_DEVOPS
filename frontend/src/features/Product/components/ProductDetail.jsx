import { useEffect, useState } from "react";
import { CheckBadgeIcon, StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectAllProducts,
  selectedProductById,
  updateProductAsync,
  updateRatingProductAsync,
} from "../ProductListSlice";
import { Link, useParams } from "react-router-dom";
import { addToCartAsync, selectCart } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useAlert } from "react-alert";
import Star from "../../common/Star";
import { Carousel } from "react-responsive-carousel";
import { useForm } from "react-hook-form";
import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../cart/Modal";
import { selectUserInfo } from "../../user/userSlice";
import { Blocks } from "react-loader-spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedStar, setSelectedStar] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [openShowModal, setOpenShowModal] = useState(-1);
  const [reviewBox, setReviewBox] = useState(-1);
  const [moreDetail, setMoreDetail] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector(selectCart);
  const product = useSelector(selectedProductById);
  const user = useSelector(selectUserInfo);
  const userToken = useSelector(selectLoggedInUser);
  const params = useParams();
  const alert = useAlert();
  const handleCart = (e) => {
    e.preventDefault();

    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newProduct = {
        product: product.id,
        quantity: 1,
      };
      dispatch(addToCartAsync(newProduct));
      alert.success(`${product.title} Added in Cart`);
    } else {
      alert.show(`${product.title} Already in Cart`);
    }
  };

  const handleRating = () => {
    if (!selectedStar) {
      alert.error("Select Star Please");
    } else {
      const rating = { rating: selectedStar, feedback: feedback, user: user };
      const newProduct = { ...product, reviews: [...product.reviews, rating] };
      dispatch(updateRatingProductAsync(newProduct));
      alert.success("Thank you For Feedback");
      setFeedback("");
      setSelectedStar(0);
    }
  };

  const handleDelete = (e, index) => {
    const newData = { ...product, reviews: [...product.reviews] };
    newData.reviews.splice(index, 1);
    dispatch(updateProductAsync(newData));
    setOpenShowModal(-1);
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
    setReviewBox(product?.reviews?.findIndex((e) => user?.id === e?.user?.id));
  }, [dispatch, params.id, handleRating]);

  return (
    <>
      {product ? (
        <div className="bg-white">
          <div className="pt-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto  flex md:max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li className="text-xs">
                  <div
                    // href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    Home
                  </div>
                </li>
                <div className="text-gray-500">&nbsp;&gt;</div>
                <li className="text-xs">
                  <div
                    // href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    Products
                  </div>
                </li>
                <div className="text-gray-500">&nbsp;&gt;</div>
                <li className="text-xs">
                  <div
                    // href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.category}
                  </div>
                </li>
                <div className="text-gray-500">&nbsp;&gt;</div>
                <li className="text-xs">
                  <div
                    // href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.brand}
                  </div>
                </li>
                <div className="text-gray-500">&nbsp;&gt;</div>

                <li className="text-xs">
                  <div
                    // href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.title.slice(0, 20)}...
                  </div>
                </li>
              </ol>
            </nav>
            <div className="lg:flex mx-6 ">
              {/* Image gallery */}
              <Carousel
                thumbWidth={"18%"}
                autoPlay
                showThumbs={true}
                showArrows={true}
                infiniteLoop
                width="100%"
                transitionTime={2000}
                interval="4990"
                showStatus={false}
                className=" my-4 md:mx-8 lg:w-5/12 h-8/12 object-center overflow-hidden "
              >
                <img
                  src={product.thumbnail}
                  alt={"e"}
                  className=" w-fit h-fit p-1"
                />
                {product.images?.map((img, i) => (
                  <div key={i} className="w-full h-2/3 ">
                    <img src={img} alt={i} className=" w-fit h-fit p-1" />
                  </div>
                ))}
              </Carousel>
              {/* Details */}
              <div className="lg:w-1/2 lg:h-8/12 flex flex-col md:p-6">
                <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {product.title}
                  </h1>
                </div>
                <div className=" pt-4 items-end lg:flex-wrap  flex lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-red-600 pr-2">
                    -{product.discountPercentage}%
                  </p>
                  <p className="text-3xl font-medium text-gray-900 ">
                    ₹{""}
                    {product.discountedPrice}
                  </p>
                </div>
                <div className="py-1 lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
                  <p className="text-lg tracking-tight line-through text-gray-600">
                    M.R.P.: ₹{product.price}
                  </p>
                </div>
                <div className="py-2 lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center text-xl">
                      <Star stars={product.rating} />{" "}
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <p className="ml-2 text-lg font-medium text-indigo-600 hover:text-indigo-500">
                      {product.rating?.toPrecision(3)}
                    </p>
                    <p className="ml-3 text-base ">
                      ({product.reviews.length} reviews)
                    </p>
                  </div>
                </div>

                <div className="py-1 lg:col-span-2 lg:col-start-1 lg:border-l lg:border-gray-200 lg:pb-16 lg:pl-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {product.description.slice(0, 200)}
                        {product.description.length > 200 && "..."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>

                    <div className="mt-4 space-y-6">
                      {!moreDetail ? (
                        <p className="text-sm text-gray-600">
                          {product.description?.slice(0, 350)}{" "}
                          {product.description.length > 350 && (
                            <p
                              className="inline-block cursor-pointer text-indigo-500 font-bold"
                              onClick={() => setMoreDetail(!moreDetail)}
                            >
                              {" "}
                              more...
                            </p>
                          )}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          {product.description}
                          <p
                            className="inline-block cursor-pointer text-indigo-500 font-bold"
                            onClick={() => setMoreDetail(!moreDetail)}
                          >
                            {" "}
                            ...less
                          </p>
                        </p>
                      )}
                    </div>
                  </div>
                  {userToken ? (
                    product?.stock > 0 ? (
                      items.findIndex(
                        (item) => item.product.id === product.id
                      ) < 0 ? (
                        <button
                          onClick={handleCart}
                          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <Link to="/cart">
                          <p className="text-indigo-500 px-8 py-3 border mt-10 bg-indigo-200 border-indigo-600 rounded text-center uppercase font-medium text-sm ">
                            Already in Cart 
                          </p>
                        </Link>
                      )
                    ) : (
                      <div>
                        {product?.stock <= 0 && (
                          <p className="text-red-500  px-8 py-3 border mt-10 bg-red-200 border-red-600 rounded text-center uppercase font-medium text-sm">
                            Out of Stock
                          </p>
                        )}
                      </div>
                    )
                  ) : (
                    <Link
                      to="/login"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Review info */}
            <div className="mx-auto  max-w-2xl px-4 pb-16 pt-8 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-20 lg:pt-16">
              {/* Rating */}
              {userToken ? (
                <div className="">
                  {user?.id && reviewBox === -1 ? (
                    <div className="mt-2  lg:row-span-1 lg:mt-0">
                      <div className="p-3 lg:mt-16 border border-gray-300 rounded-md ">
                        <div className="">
                          <div className="flex flex-col justify-items-start gap-2">
                            <h3 className="text-2xl font-medium text-gray-900">
                              Add Your Review
                            </h3>
                            <div className="flex">
                              {[0, 1, 2, 3, 4].map((el, index) => (
                                <StarIcon
                                  key={index}
                                  onClick={(e) => setSelectedStar(index + 1)}
                                  className={classNames(
                                    selectedStar > index
                                      ? "text-yellow-500"
                                      : "text-gray-200",
                                    "h-5 m-1 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <textarea
                              type="textarea"
                              id="textarea"
                              onChange={(e) => setFeedback(e.target.value)}
                              placeholder="What's your Feedback"
                              className="text-sm rounded-md"
                              rows={4}
                            />
                          </div>
                        </div>

                        <button
                          onClick={handleRating}
                          className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Successfully Feedback Done
                    <div className="mt-2  lg:row-span-1 lg:mt-0">
                      <div className="p-3 lg:mt-16 border border-green-300 rounded-md ">
                        <div className="flex items-center justify-center flex-col h-full py-10">
                          <CheckBadgeIcon className="w-16 text-green-500 my-1" />
                          <h1 className="text-2xl text-center font-semibold text-indigo-500">
                            Thank You{" "}
                            <p className="italic text-black">{user?.name}</p>{" "}
                            For Feedback
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}

              {/* Customers Review Display */}
              <div
                className={` ${
                  userToken ? "lg:border-l lg:col-span-2" : "lg:col-span-3"
                } lg:border-gray-200 lg:pl-8`}
              >
                <div className="mt-10 lg:m-0">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Customer Reviews:{" "}
                    {product.reviews[0] && (
                      <p className="text-base px-2 md:text-xl text-gray-500 inline font-thin">
                        Hear What Others Are Saying About{" "}
                        <q className="inline-block font-serif">
                          {product.title}
                        </q>
                      </p>
                    )}
                  </h1>
                </div>
                {product.reviews[0] ? (
                  <div className="py-8 lg:col-span-2 lg:col-start-1  lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 ">
                    <div
                      className={`grid ${
                        userToken ? "md:grid-cols-2" : "md:grid-cols-3"
                      }  grid-flow-row gap-2 rounded-md max-h-[20rem] p-4 overflow-y-auto border`}
                    >
                      {product?.reviews.map((review, index) => (
                        <div
                          className="border rounded-md m-2 p-2 h-fit shadow-md hover:border-black"
                          key={index}
                        >
                          <div className="flex justify-between">
                            <div className="flex  items-center gap-2 ">
                              <img
                                src={review?.user?.image}
                                alt={review?.user?.name}
                                className="w-8 h-8 rounded-full border border-black"
                              />
                              <p className="">{review?.user?.name}</p>
                            </div>
                            <Modal
                              title={"Delete"}
                              massage={`Are you sure Delete this Feedback ?`}
                              dangerAction={(e) => handleDelete(e, index)}
                              dangerOption={"Remove"}
                              showModal={openShowModal === index}
                              cancelAction={() => setOpenShowModal(-1)}
                            />
                            {userToken && user?.id === review?.user?.id && (
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-red-500"
                                onClick={(e) => setOpenShowModal(index)}
                              >
                                <TrashIcon className="h-6" />
                              </button>
                            )}
                          </div>
                          <div className="flex items-center justify-start px-1 my-1">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating > rating
                                    ? "text-yellow-500"
                                    : "text-gray-200",
                                  "h-4 w-4 flex-shrink-0"
                                )}
                              />
                            ))}
                            <h1 className="px-2">{review.rating}</h1>
                          </div>
                          {review.feedback && (
                            <div className="my-3 mx-2 text-gray-700">
                              <q>{review.feedback}</q>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 ">
                    <div className="flex items-center rounded-md justify-center flex-col h-[16.7rem] p-4 border">
                      <XCircleIcon className="w-28 py-1 text-indigo-600/30" />
                      <p className="text-xl font-semibold text-indigo-600/70">
                        No Reviews Available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <Blocks
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </div>
      )}
    </>
  );
}
