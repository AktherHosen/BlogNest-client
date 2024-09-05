import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true); // Start loading
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/all-blogs?search=${searchText}&filter=${filter}`
        );
        setBlogs(data);
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false); // Stop loading on error
      }
    };

    getData();
  }, [searchText, filter]);

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
        wishListInfo,
        { withCredentials: true }
      );
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Error adding to wishlist");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchText);
  };

  return (
    <div className="my-4">
      {/* Search and filter section */}
      <div className="w-full mb-6 md:mb-4 lg:mb-2 flex flex-col md:flex-row gap-2 items-center justify-center">
        <div className="relative w-full lg:max-w-md">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search blogs by title..."
              className="w-full pr-16 border border-gray-300 rounded-l-md px-4 py-2 text-gray-900 outline-none focus:outline-none"
            />
            <button
              type="submit" // Ensure the button type is submit
              className="absolute right-0 top-0 bottom-0 px-4 bg-primary text-white rounded-r-md border border-primary flex items-center justify-center"
            >
              Search
            </button>
          </form>
        </div>
        <div className="w-full lg:max-w-fit">
          <select
            name="category"
            id="category"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="border-primary rounded-md w-full px-4 py-2 outline-none"
          >
            <option value="">All</option>
            <option value="Tech and Gadgets">Tech and Gadgets</option>
            <option value="Travel Adventure">Travel Adventure</option>
            <option value="Education">Education</option>
            <option value="Science and Innovation">
              Science and Innovation
            </option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <h1 className="text-xl font-suse text-primary font-semibold">Blogs</h1>
        <p className="text-sm font-semibold">
          Discover, Learn, and Grow Together
        </p>
      </div>
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-x-10 gap-y-6">
            {/* Render skeletons while loading */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full min-h-[400px]">
                <Skeleton height={250} />
                <Skeleton height={20} width={120} className="mt-2" />
                <Skeleton height={20} className="mt-2" />
                <Skeleton count={2} height={15} className="mt-2" />
                <div className="flex items-center gap-4 mt-2">
                  <Skeleton circle={true} height={50} width={50} />
                  <div>
                    <Skeleton height={15} width={100} />
                    <Skeleton height={15} width={150} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-x-10 gap-y-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                handleWithlist={handleWithlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
