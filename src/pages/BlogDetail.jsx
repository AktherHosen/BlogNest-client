import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidErrorCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS for Skeleton
import useAxiosSecure from "../hooks/useAxiosSecure";

const BlogDetail = () => {
  const navigate = useNavigate();
  const blog = useLoaderData();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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
    const blogId = _id;
    const commentUserName = user?.displayName;
    const commentUserPhoto = user?.photoURL;
    const commentInfo = {
      blogId,
      comment,
      commentUserName,
      commentUserPhoto,
    };

    try {
      const { data } = await axiosSecure.post(`/comment`, commentInfo);
      toast.success("Comment added successfully.");

      setComments((prevComments) => [
        ...prevComments,
        {
          ...data,
          commentUserName: user?.displayName,
          commentUserPhoto: user?.photoURL,
          comment: comment,
        },
      ]);

      form.reset();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const getData = async () => {
    try {
      const { data } = await axiosSecure.get(`/comments?blogId=${_id}`);
      setComments(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [_id]);

  return (
    <div>
      <div className="my-4 flex justify-between items-center">
        <div>
          <h1>
            <span className="font-suse text-primary text-lg font-semibold">
              {loading ? <Skeleton width={150} /> : blogTitle}
            </span>
          </h1>
          {loading ? (
            <Skeleton width={80} height={30} />
          ) : (
            <button className="bg-primary text-white font-semibold px-3 rounded-sm text-xs py-1">
              {category}
            </button>
          )}
        </div>

        <div>
          {user?.email === email && !loading && (
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
          )}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-6">
          {/* Image Section */}
          <div className="col-span-2 overflow-hidden rounded-lg">
            {loading ? (
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
                {loading ? (
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
                {loading ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  <span className="font-semibold text-gray-600">
                    {author?.name}
                  </span>
                )}{" "}
                -{" "}
                {loading ? (
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
            {loading ? <Skeleton width={200} /> : blogTitle}
          </h2>

          <p>{loading ? <Skeleton count={2} /> : shortDescription}</p>

          <p className="text-gray-700 text-sm font-normal text-justify">
            {loading ? <Skeleton count={3} /> : longDescription}
          </p>
        </div>
      </div>

      {/* Show comments */}
      <div className="my-4 max-w-2xl">
        <h3 className="text-2xl font-semibold font-suse">
          ({comments?.length}) Comments
        </h3>
        <div className="grid grid-cols-1">
          {loading
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
                  <div className="">
                    <img
                      src={com?.commentUserPhoto}
                      alt=""
                      className="h-[50px] w-[50px] rounded-full mt-1 "
                    />
                  </div>
                  <div className="flex-1">
                    <div>
                      <h4 className="font-semibold">{com?.commentUserName}</h4>
                      <p className="">{com?.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Posting comment */}
      {user?.email !== email ? (
        <div className="flex sm:flex-row mt-4 gap-2">
          <div className="mt-7 lg:mt-7">
            <img
              src={user?.photoURL}
              alt=""
              className="h-[50px] w-[50px] rounded-full "
            />
          </div>
          <div className="flex-1">
            <form onSubmit={handleCommentPost} className="max-w-xl">
              <div>
                <label
                  htmlFor="comment"
                  className="text-gray-600 block mb-1 font-semibold"
                >
                  Leave a comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  className="block w-full mt-2 p-2 border shadow-sm focus:outline-primary resize-none rounded-md"
                  placeholder="Your comment"
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="mt-3">
                <button className="px-4 py-2 rounded-sm bg-primary text-white">
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-error  flex gap-2 items-center font-semibold font-rubik">
          <BiSolidErrorCircle size={20} />
          <p className="">You cannot comment on your own blog</p>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
