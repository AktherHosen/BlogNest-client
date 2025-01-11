import { RiHeart2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import defaultBlog from "../assets/defaultblog.jpg";
import defaultUser from "../assets/user.png";
const BlogCard = ({ blog, handleWithlist }) => {
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
      <div className="w-full min-h-[400px] rounded-sm ">
        <Link to={`/blog/${_id}`}>
          {photo ? (
            <img src={photo} alt="" className="w-full h-[200px]" />
          ) : (
            <img src={defaultBlog} alt="" className="w-full h-[200px]" />
          )}
        </Link>
        <div className="space-y-2 min-h-[180px] bg-primary text-white p-6">
          <div className="flex justify-between items-center">
            <button className="font-semibold  rounded-lg text-xs uppercase">
              {category}
            </button>
            <div className="flex gap-x-4 items-center flex-row-reverse">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: 1.3,
                  color: "red",
                }}
                transition={{ bounceDamping: 10, bounceStiffness: 600 }}
                onClick={() => handleWithlist(_id)}
                className="text-2xl text-white hover:text-red-600"
                title="Wishlist"
              >
                <RiHeart2Fill />
              </motion.button>
              <p className=" text-sm font-medium ">
                {new Date(postedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <h2 className="font-medium text-xl">{blogTitle}</h2>
          <p className="text-sm md:text-xs font-normal text-justify">
            {longDescription.substring(0, 110)}...
          </p>
        </div>

        <div className="flex items-center gap-4 mt-2">
          {author?.photo ? (
            <img
              src={author?.photo}
              className="h-[50px] w-[50px] rounded-full border p-1 shadow-md"
              alt=""
            />
          ) : (
            <img
              src={defaultUser}
              className="h-[50px] w-[50px] rounded-full border p-1 shadow-md"
              alt=""
            />
          )}
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
