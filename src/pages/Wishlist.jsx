import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const getWishlist = async () => {
    const { data } = await axiosSecure.get(`/wishlist?email=${user?.email}`);
    return data;
  };
  const {
    data: wishlist = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: () => getWishlist(user?.email),
  });

  // Delete wishlist blog
  const deleteWishlist = useMutation({
    mutationFn: async (_id) => {
      await axiosSecure.delete(`/wishlist/${_id}`);
    },
    onSuccess: () => {
      toast.success("Wishlist blog deleted successfully.");
      queryClient.invalidateQueries(["wishlist", user?.email]);
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const handleDelete = (id) => {
    deleteWishlist.mutate(id);
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
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="w-full min-h-[400px]">
              <Skeleton height={250} />
              <div className="mt-2 space-y-2 min-h-[160px]">
                <div className="flex justify-between items-center">
                  <Skeleton width={100} height={20} />
                  <div className="flex gap-x-4 items-center flex-row-reverse">
                    <Skeleton circle={true} height={30} width={30} />
                    <Skeleton width={70} height={20} />
                  </div>
                </div>
                <Skeleton width={200} height={20} />
                <Skeleton count={3} height={20} />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Skeleton circle={true} height={50} width={50} />
                <div>
                  <Skeleton width={100} height={20} />
                  <Skeleton width={80} height={20} />
                </div>
              </div>
            </div>
          ))
        ) : isError ? (
          <p className="text-red-600">Error: {error.message}</p>
        ) : wishlist.length > 0 ? (
          wishlist.map((blog) => (
            <div key={blog._id} className="w-full min-h-[400px]">
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={blog.photo}
                  alt={blog.blogTitle}
                  className="rounded-lg border w-full h-[250px]"
                />
              </Link>
              <div className="mt-2 space-y-2 min-h-[180px]">
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
                    {blog?.email || "No email available"}
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
