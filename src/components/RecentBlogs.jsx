import React from "react";
import { RiHeart2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const RecentBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fetchBlogs = async () => {
    const { data } = await axiosSecure.get(`/blogs`);
    return data;
  };

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recentBlogs"],
    queryFn: fetchBlogs,
    select: (data) =>
      data
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .slice(0, 6),
  });

  const handleWithlist = async (id) => {
    if (!user?.email) {
      return toast.error("You can't add to wishlist without logging in.");
    }
    const wishlistDate = new Date();
    const wishListUserEmail = user?.email;
    const blogId = id;
    const wishListInfo = {
      blogId,
      wishListUserEmail,
      wishlistDate,
    };

    try {
      await axiosSecure.post(`/wishlist`, wishListInfo);
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Error adding to wishlist");
    }
  };

  return (
    <div className="my-6">
      <h1 className="text-xl font-suse uppercase font-bold">Recent Blogs</h1>
      <hr className="flex-1 h-[1px] my-2 bg-primary" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="lg:col-span-3 grid grid-cols-1 gap-y-4 mb-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full lg:w-1/3">
                    <Skeleton height={250} />
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col gap-y-2 justify-center">
                    <div className="flex justify-between">
                      <Skeleton width={100} height={20} />
                      <div className="flex items-center gap-2">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={30} height={30} circle={true} />
                      </div>
                    </div>
                    <Skeleton width={200} height={30} />
                    <Skeleton width={300} height={20} />
                    <Skeleton width={100} height={20} />
                  </div>
                </div>
              </div>
            ))
          ) : isError ? (
            <p>Error fetching blogs: {error.message}</p>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="lg:col-span-3 grid grid-cols-1 gap-y-4 mb-6"
              >
                <motion.div
                  initial={{ x: -500 }}
                  animate={{ x: 0 }}
                  transition={{ duration: "2" }}
                  className="flex flex-col md:flex-row gap-4"
                >
                  <div className="w-full lg:w-1/3">
                    <PhotoProvider
                      speed={() => 800}
                      easing={(type) =>
                        type === 2
                          ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                          : "cubic-bezier(0.34, 1.56, 0.64, 1)"
                      }
                    >
                      <PhotoView src={blog?.photo}>
                        <img
                          src={blog?.photo}
                          alt=""
                          className="h-[250px] w-full rounded-md"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col gap-y-2 justify-center">
                    <div className="flex justify-between">
                      <button className="bg-primary px-4 py-1 text-xs text-white w-fit">
                        {blog?.category}
                      </button>
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-gray-600">
                          {new Date(blog?.postedDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{
                            scale: 1.3,
                            color: "red",
                          }}
                          transition={{
                            bounceDamping: 10,
                            bounceStiffness: 600,
                          }}
                          onClick={() => handleWithlist(_id)}
                          className="text-2xl text-primary"
                          title="Wishlist"
                        >
                          <RiHeart2Fill />
                        </motion.button>
                      </div>
                    </div>
                    <h1 className="text-2xl font-suse hover:underline transition-all duration-300">
                      {blog?.blogTitle}
                    </h1>
                    <p className="text-sm text-justify">
                      {blog?.shortDescription}
                    </p>
                    <h4 className="uppercase font-semibold text-sm">
                      by {blog?.author?.name}
                    </h4>
                    <Link
                      to={`/blog/${blog?._id}`}
                      className="text-primary hover:underline flex items-center"
                    >
                      Read More <RiArrowRightDoubleFill />
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))
          ) : (
            <p>No recent blogs available.</p>
          )}
          <div className="flex justify-center my-4 ">
            <div className="hover:scale-90 w-fit hover:transtion-all duration-300">
              <Link to="/blogs">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#eeeded",
                    color: "black",
                  }}
                  transition={{ bounceDamping: 10, bounceStiffness: 600 }}
                  className="text-white border-2 px-6 py-2 rounded-sm bg-primary "
                >
                  Load More
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:col-span-1">
          <div className="w-full flex items-center justify-center h-[50px] mx-auto px-4 py-2 mb-2 rounded-sm bg-[#f6f6f6] text-black">
            <h3>Browse Categories</h3>
          </div>
          <div className="flex flex-col gap-2 gap-y-2">
            <div
              style={{
                backgroundImage: `url('https://i.ibb.co/8MCR96L/cat1.png')`,
                height: "50px",
                objectFit: "cover",
                objectPosition: "center",
                backgroundPosition: "center",
                borderRadius: "4px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "full",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40 mix-blend-darken"></div>
              <h3 className="relative text-white text-center">
                Tech and Gadgets
              </h3>
            </div>
            <div
              style={{
                backgroundImage: `url('https://i.ibb.co/qprk197/kimberly-farmer-l-Uaa-KCUANVI-unsplash.png')`,
                height: "50px",
                objectFit: "cover",
                objectPosition: "center",
                backgroundPosition: "center",
                borderRadius: "4px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "full",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40 mix-blend-darken"></div>
              <h3 className="relative text-white text-center">Education</h3>
            </div>
            <div
              style={{
                backgroundImage: `url('https://i.ibb.co/ZXWsQrb/travel-1.png')`,
                height: "50px",
                objectFit: "cover",
                objectPosition: "center",
                backgroundPosition: "center",
                borderRadius: "4px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "full",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40 mix-blend-darken"></div>
              <h3 className="relative text-white text-center">
                Travel Adventure
              </h3>
            </div>
            <div
              style={{
                backgroundImage: `url('https://i.ibb.co/LvkMhLv/lifestyle.png')`,
                height: "50px",
                objectFit: "cover",
                objectPosition: "center",
                backgroundPosition: "center",
                borderRadius: "4px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "full",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40 mix-blend-darken"></div>
              <h3 className="relative text-white text-center">Lifestyle</h3>
            </div>
            <div
              style={{
                backgroundImage: `url('https://i.ibb.co/P43W20Z/cat5-1.png')`,
                height: "50px",
                objectFit: "cover",
                objectPosition: "center",
                backgroundPosition: "center",
                borderRadius: "4px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "full",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40 mix-blend-darken"></div>
              <h3 className="relative text-white text-center">
                Science and Innovation
              </h3>
            </div>
          </div>
          <div
            className="mt-4 relative bg-cover bg-center h-[400px]"
            style={{
              backgroundImage: `url('https://i.ibb.co/28SqX1D/jess-bailey-PWxs-Exxrf5g-unsplash.png')`,
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-40 mix-blend-darken"></div>

            {/* Content */}
            <div className="relative z-10 p-8 text-white flex flex-col items-center justify-center h-full text-center">
              <h1 className="text-2xl font-suse">Blog Nest</h1>
              <p>Your Daily Dose of Inspiration, Knowledge, and Insight</p>
              <a
                href="#subscribe"
                className="mt-4 px-4 py-2 font-semibold  text-white  rounded-sm bg-primary"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
