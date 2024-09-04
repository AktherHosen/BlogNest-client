import React from "react";
import useAuth from "../hooks/useAuth";
import { RiHeart2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
const BlogCard = ({ blog, handleWithlist }) => {
  const { user } = useAuth();
  const {
    _id,
    blogTitle,
    photo,
    email,
    category,
    longDescription,
    postedDate,
    author,
  } = blog;

  return (
    <div>
      <div className="w-full min-h-[400px] ">
        <Link to={`/blog/${_id}`}>
          <img
            src={photo}
            alt=""
            className="rounded-lg border w-full h-[250px]"
          />
        </Link>
        <div className="mt-2 space-y-2 min-h-[160px]">
          <div className="flex justify-between items-center">
            <button className="bg-primary text-white font-semibold px-3 rounded-lg text-xs py-1">
              {category}
            </button>
            <div className="flex gap-x-4 items-center flex-row-reverse">
              <button
                onClick={() => handleWithlist(_id)}
                className="text-2xl hover:text-red-600"
                title="Wishlist"
              >
                <RiHeart2Fill />
              </button>
              <p className="text-gray-600 text-sm font-medium ">
                {new Date(postedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <h2 className="font-medium text-lg">{blogTitle}</h2>
          <p className="text-gray-600 text-sm font-normal text-justify">
            {longDescription.substring(0, 200)}...
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
  );
};

export default BlogCard;
