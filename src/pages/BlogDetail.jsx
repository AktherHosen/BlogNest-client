import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidErrorCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const getBlog = async (id) => {
    const { data } = await axiosSecure.get(`/blog/${id}`);
    return data;
  };
  const { data: blog, isLoading: blogLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
  });

  const getComment = async (id) => {
    const { data } = await axiosSecure.get(`/comments?blogId=${id}`);
    return data;
  };

  const {
    data: comments = [],
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComment(id),
  });

  const handleBlogDelete = async (id) => {
    try {
      await axiosSecure.delete(`/blog/${id}`);
      toast.success("Blog deleted successfully.");
      navigate("/blogs");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleCommentPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const blogId = id;
    const commentUserName = user?.displayName;
    const commentUserPhoto = user?.photoURL;
    const commentInfo = {
      blogId,
      comment,
      commentUserName,
      commentUserPhoto,
    };

    try {
      await axiosSecure.post(`/comment`, commentInfo);
      toast.success("Comment added successfully.");
      refetchComments();
      form.reset();
    } catch (err) {
      toast.error(err?.message);
    }
  };

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

  return (
    <div>
      <div className="my-4 flex justify-between items-center">
        <div>
          <h1>
            <span className="font-suse text-primary text-lg font-semibold">
              {blogLoading ? <Skeleton width={150} /> : blogTitle}
            </span>
          </h1>
          {blogLoading ? (
            <Skeleton width={80} height={30} />
          ) : (
            <button className="bg-primary text-white font-semibold px-3 rounded-sm text-xs py-1">
              {category}
            </button>
          )}
        </div>

        <div>
          {user?.email === email && !blogLoading && (
            <div className="flex justify-center items-center gap-2 h-[50]">
              <Link to={`/update-blog/${_id}`}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{
                    scale: 1.3,
                    color: "primary",
                  }}
                  transition={{ bounceDamping: 10, bounceStiffness: 600 }}
                  className="hover:transition-colors duration-200 mt-1"
                >
                  <FaEdit size={25} />
                </motion.button>
              </Link>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: 1.3,
                  color: "red",
                }}
                transition={{ bounceDamping: 10, bounceStiffness: 600 }}
                onClick={() => handleBlogDelete(_id)}
                className="hover:transition-colors duration-200"
              >
                <AiFillDelete size={25} />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-6">
          {/* Image Section */}
          <div className="col-span-2 overflow-hidden rounded-lg">
            {blogLoading ? (
              <Skeleton height={500} className="rounded-lg" />
            ) : (
              <img
                src={photo}
                className="max-h-[500px] w-full object-top rounded-lg object-cover duration-500 hover:scale-110 hover:rounded-lg transition-all"
                alt={blogTitle}
              />
            )}
          </div>

          {/* Author Information Section */}
          <div className="flex justify-end col-span-1 text-center w-full">
            <div className="w-full lg:w-[380px]">
              {/* About Author heading */}
              <div className="border w-full mb-4 py-2 rounded-sm">
                <h3 className="font-rubik">About Author</h3>
              </div>

              {/* Author Card */}
              <div className="h-[300px] border rounded-lg hover:bg-primary hover:text-white hover:transition-all hover:bg-opacity-80 duration-300 hover:rounded-lg">
                {blogLoading ? (
                  <>
                    <Skeleton
                      height={150}
                      width={150}
                      className="mx-auto rounded-full mb-4"
                    />
                    <Skeleton
                      height={24}
                      width="80%"
                      className="mx-auto mb-2"
                    />
                    <Skeleton height={20} width="60%" className="mx-auto" />
                  </>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <img
                        src={author?.photo}
                        alt={author?.name}
                        className="h-[150px] w-[150px] mt-4 rounded-full mb-4 border shadow-sm p-2"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{author?.name}</h3>
                    <h4 className="text-sm font-semibold my-1">{email}</h4>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-2 min-h-[160px]">
          <div className="flex gap-4 items-center font-rubik">
            <div>
              <h3 className="font-rubik">
                <span className="text-sm">By </span>
                {blogLoading ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  <span className="font-semibold text-gray-600">
                    {author?.name}
                  </span>
                )}{" "}
                -{" "}
                {blogLoading ? (
                  <Skeleton width={80} height={20} />
                ) : (
                  <span className="font-semibold text-gray-600">
                    {new Date(postedDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </h3>
            </div>
          </div>

          <h2 className="font-normal font-rubik text-lg">
            {blogLoading ? <Skeleton width={200} /> : blogTitle}
          </h2>

          <p>{blogLoading ? <Skeleton count={2} /> : shortDescription}</p>

          <p className="text-gray-700 text-sm font-normal text-justify">
            {blogLoading ? <Skeleton count={3} /> : longDescription}
          </p>
        </div>
      </div>

      {/* Show comments */}
      <div className="my-4 max-w-2xl">
        <h3 className="text-2xl font-semibold font-suse">
          ({comments?.length}) Comments
        </h3>
        <div className="grid grid-cols-1">
          {commentsLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex sm:flex-row mt-4 gap-2">
                  <Skeleton circle={true} height={50} width={50} />
                  <div className="flex-1">
                    <Skeleton height={20} width="40%" />
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={20} width="60%" />
                  </div>
                </div>
              ))
            : comments.map((com) => (
                <div key={com._id} className="flex sm:flex-row mt-4 gap-2">
                  <div>
                    <img
                      src={com?.commentUserPhoto}
                      alt=""
                      className="h-[50px] w-[50px] rounded-full mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <div>
                      <h4 className="font-semibold">{com?.commentUserName}</h4>
                      <p>{com?.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Posting comment */}
      {user?.email !== email ? (
        <div className="flex sm:flex-row mt-4 gap-2">
          <div className="mt-1">
            <img
              src={user?.photoURL}
              alt=""
              className="h-[50px] w-[50px] rounded-full"
            />
          </div>
          <form onSubmit={handleCommentPost} className=" max-w-xl flex-1">
            <textarea
              name="comment"
              placeholder="Write a comment..."
              required
              className="w-full border p-2 rounded-md outline-none resize-none focus:border-primary h-[100px]"
            />
            <div className="flex justify-end">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: 1,
                  backgroundColor: "#1E1E1E",
                  color: "white",
                }}
                transition={{ bounceDamping: 10, bounceStiffness: 600 }}
                className="bg-primary text-white font-semibold px-4 py-2 rounded-md"
              >
                Post Comment
              </motion.button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-start gap-2 items-center">
          <BiSolidErrorCircle size={25} className="text-red-600" />
          <p className="text-red-600">
            You can't post comments on your own blog.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
