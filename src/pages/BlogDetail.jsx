import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { RiHeart2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const navigate = useNavigate();
  const blog = useLoaderData();
  const { user } = useAuth();
  const {
    _id,
    blogTitle,
    photo,
    email,
    category,
    shortDescription,
    longDescription,
    postedDate,
    author,
  } = blog || {};
  const handleBlogDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/blog/${id}`
      );
      toast.success("Blog deleted successfully.");
      navigate("/blogs");
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <div>
      <div className="my-4 flex justify-between items-center">
        <div>
          <h1 className="">
            <span className="font-suse text-primary text- font-semibold">
              {blogTitle}
            </span>
          </h1>

          <p className="text-gray-600 text-sm font-medium ">
            {new Date(postedDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          {user?.email === email && (
            <>
              <div className="flex items-center gap-2">
                <Link
                  to={`/update-blog/${_id}`}
                  className=" hover:text-primary hover:transition-colors duration-200"
                >
                  <FaEdit size={25} />
                </Link>
                <button
                  onClick={() => handleBlogDelete(_id)}
                  className=" hover:text-red-600 hover:transition-colors duration-200"
                >
                  <AiFillDelete size={25} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <img
          src={photo}
          className="h-[200px] w-full object-cover object-top rounded-lg"
          alt=""
        />
        <div>
          <div className="mt-2 space-y-2 min-h-[160px]">
            <div className="flex justify-between items-center">
              <button className="bg-primary text-white font-semibold px-3 rounded-lg text-xs py-1">
                {category}
              </button>

              <button className="text-2xl hover:text-red-600" title="Wishlist">
                <RiHeart2Fill size={30} />
              </button>
            </div>
            <h2 className="font-medium text-lg">{blogTitle}</h2>
            <p>{shortDescription}</p>
            <p className="text-gray-600 text-sm font-normal text-justify">
              {longDescription}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <img
              src={author?.photo}
              className="h-[50px] w-[50px] rounded-full border p-1 shadow-md"
              alt=""
            />
            <div>
              <h3 className="font-semibold text-sm">{author?.name}</h3>
              <p className="text-gray-600 text-sm font-normal text-justify">
                {email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
