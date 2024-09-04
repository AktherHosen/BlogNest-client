import React, { useEffect, useState } from "react";
import { RiHeart2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
const RecentBlogs = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
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
          {latestBlogs.map((blog) => (
            <>
              <div
                key={blog._id}
                className="lg:col-span-3 grid grid-cols-1 gap-y-4 mb-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full lg:w-1/3">
                    <img
                      src={blog?.photo}
                      alt=""
                      className="h-[250px] w-full"
                    />
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
                    <h1 class="text-2xl font-suse hover:underline transition-all duration-300">
                      {blog?.blogTitle}
                    </h1>
                    <p className="text-sm text-justify">
                      {blog?.shortDescription}
                    </p>
                    <Link className="text-primary hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="text-center  ">
            <Link
              to="/blogs"
              className="text-white hover:px-3 hover:scale-90 border-2 px-6 py-2 rounded-sm bg-primary transition-all duration-200"
            >
              Load More
            </Link>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-wrap gap-2"></div>
      </div>
    </div>
  );
};

export default RecentBlogs;
