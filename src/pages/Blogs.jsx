import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-blogs?search=${searchText}`
        );
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getData();
  }, [searchText]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchText); // Update searchText
  };

  return (
    <div className="my-4">
      {/* Search and filter section */}
      <div className="flex gap-2 items-center justify-center">
        <div className="my-8 relative">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search blogs by title..."
              className="w-full lg:w-[400px] pr-16 border border-gray-300 rounded-l-md px-4 py-2 text-gray-900 outline-none focus:outline-none"
            />
            <button
              type="submit" // Ensure the button type is submit
              className="absolute right-0 top-0 bottom-0 px-4 bg-primary text-white rounded-r-md border border-primary flex items-center justify-center"
            >
              Search
            </button>
          </form>
        </div>
        <div>
          <select
            name="category"
            id="category"
            className="border-primary rounded-md w-full px-4 py-2 outline-none"
          >
            <option value="Tech & Gadgets">Tech & Gadgets</option>
            <option value="Travel & Adventure">Travel & Adventure</option>
            <option value="Education & Learning">Education & Learning</option>
            <option value="Science & Innovation">Science & Innovation</option>
            <option value="Lifestyle & Culture">Lifestyle & Culture</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <h1 className="text-xl font-suse text-primary font-semibold">Blogs</h1>
        <p className="text-sm font-semibold">
          Discover, Learn, and Grow Together
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-x-10 gap-y-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            handleWithlist={handleWithlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
