import React, { useEffect, useState } from "react";
import { RiHeart2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecentBlogs = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/blogs`
        );
        const sortedBlogs = data.sort(
          (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
        );
        setLatestBlogs(sortedBlogs.slice(0, 6));
      } catch (err) {
        toast.error(err?.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getData();
  }, []);

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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        wishListInfo
      );
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
          {loading ? (
            // Render skeletons while loading
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
                      <Skeleton width={30} height={30} circle={true} />
                    </div>
                    <Skeleton width={200} height={30} />
                    <Skeleton width={300} height={20} />
                    <Skeleton width={100} height={20} />
                  </div>
                </div>
              </div>
            ))
          ) : latestBlogs.length > 0 ? (
            latestBlogs.map((blog) => (
              <div
                key={blog._id}
                className="lg:col-span-3 grid grid-cols-1 gap-y-4 mb-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
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
                          className="h-[250px] w-full"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col gap-y-2 justify-center">
                    <div className="flex justify-between">
                      <button className="bg-primary px-4 py-1 text-xs text-white w-fit">
                        {blog?.category}
                      </button>
                      <div>
                        <button
                          onClick={() => handleWithlist(blog._id)}
                          className="text-2xl hover:text-red-600"
                          title="Wishlist"
                        >
                          <RiHeart2Fill />
                        </button>
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
                      className="text-primary hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recent blogs available.</p>
          )}
          <div className="flex justify-center my-4 ">
            <div className="hover:scale-90 w-fit">
              <Link
                to="/blogs"
                className="text-white border-2 px-6 py-2 rounded-sm bg-primary transition-all duration-200"
              >
                Load More
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:col-span-1">
          <div className="w-full px-4 py-2 mb-2 rounded-md bg-[#ecebeb] text-black">
            Browse Categories
          </div>
          <div className="flex flex-col gap-2 gap-y-2">
            <div>
              <button className="px-4 py-1 text-sm bg-primary text-white rounded-full">
                Tech and Gadgets
              </button>
            </div>
            <div>
              <button className="px-4 py-1 text-sm bg-primary text-white rounded-full">
                Education
              </button>
            </div>
            <div>
              <button className="px-4 py-1 text-sm bg-primary text-white rounded-full">
                Travel Adventure
              </button>
            </div>
            <div>
              <button className="px-4 py-1 text-sm bg-primary text-white rounded-full">
                Lifestyle
              </button>
            </div>
            <div>
              <button className="px-4 py-1 text-sm bg-primary text-white rounded-full">
                Science and Innovation
              </button>
            </div>
          </div>
          <div
            className="mt-4 relative bg-cover bg-center h-[400px]"
            style={{
              backgroundImage: `url('https://tse4.mm.bing.net/th?id=OIP.C0xRH3uE7SXLVwYjHt7zPAHaLL&pid=Api&P=0&h=220')`,
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-25 mix-blend-darken"></div>

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
