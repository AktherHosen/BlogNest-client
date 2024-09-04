import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiHeart2Fill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist?email=${user?.email}`
      );
      console.log("Fetched wishlist data:", data); // Check the structure
      setWishlist(data);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };
  useEffect(() => {
    if (user?.email) {
      getData();
    }
  }, [user?.email]);

  const handleDelete = async (_id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/wishlist/${_id}`
      );
      toast.success("Wishlist blog deleted successfully.");
      getData();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="my-4">
      <div className="mb-4">
        <h1 className="text-xl font-suse text-primary font-semibold">Blogs</h1>
        <p className="text-sm font-semibold">
          Discover, Learn, and Grow Together
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-x-10 gap-y-6">
        {wishlist.length > 0 ? (
          wishlist.map((blog) => (
            <div key={blog._id} className="w-full min-h-[400px]">
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={blog.photo}
                  alt={blog.blogTitle}
                  className="rounded-lg border w-full h-[250px]"
                />
              </Link>
              <div className="mt-2 space-y-2 min-h-[160px]">
                <div className="flex justify-between items-center">
                  <button className="bg-primary text-white font-semibold px-3 rounded-lg text-xs py-1">
                    {blog.category}
                  </button>
                  <div className="flex gap-x-4 items-center flex-row-reverse">
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-2xl hover:text-red-600"
                      title="Delete"
                    >
                      <RiDeleteBin6Line />
                    </button>
                    <p className="text-gray-600 text-sm font-medium">
                      {new Date(blog.wishlistDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <h2 className="font-medium text-lg">{blog.blogTitle}</h2>
                <p className="text-gray-600 text-sm font-normal text-justify">
                  {blog.longDescription
                    ? blog.longDescription.substring(0, 200)
                    : "No description available"}
                  ...
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <img
                  src={blog.author?.photo}
                  className="h-[50px] w-[50px] rounded-full border p-1 shadow-md"
                  alt={blog.author?.name}
                />
                <div>
                  <h3 className="font-semibold text-sm">
                    {blog.author?.name || "Unknown Author"}
                  </h3>
                  <p className="text-gray-600 text-sm font-normal text-justify">
                    {blog.author?.email || "No email available"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
