import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegBookmark } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidErrorCircle } from "react-icons/bi";
const BlogDetail = () => {
  const navigate = useNavigate();
  const blog = useLoaderData();
  const [comments, setComments] = useState([]);
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
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/comment`,
        commentInfo
      );
      toast.success("Comment added successfully.");
      setComments((prevComments) => [...prevComments, data]);
      form.reset();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments?blogId=${_id}`
      );
      setComments(data);
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
          <h1 className="">
            <span className="font-suse text-primary text- font-semibold">
              {blogTitle} {comments.length}
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

              <button className="text-2xl" title="Wishlist">
                <FaRegBookmark size={30} color="gray" />
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

      {/* show comment */}
      <div className="my-4 max-w-2xl">
        <h3 className="text-2xl font-semibold font-suse">
          {comments.length} Comments
        </h3>
        <div className="grid grid-cols-1">
          {comments.map((comment) => (
            <>
              <div
                key={comment._id}
                className="flex sm:flex-row 
         mt-4 gap-2"
              >
                <div className="">
                  <img
                    src={comment.commentUserPhoto}
                    alt=""
                    className="h-[50px] w-[50px] rounded-full mt-1 "
                  />
                </div>
                <div className="flex-1">
                  <div>
                    <h4 className="font-semibold">{comment.commentUserName}</h4>
                    <p className="">{comment.comment}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* Posting comment  */}
      {user?.email !== email ? (
        <div className="flex  sm:flex-row mt-4 gap-2">
          <div className="mt-7 lg:mt-7">
            <img
              src={user?.photoURL}
              alt=""
              className="h-[50px] w-[50px] rounded-full "
            />
          </div>
          <div className="flex-1">
            <form onSubmit={handleCommentPost}>
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
                  className="h-20 w-full lg:max-w-xl resize-none rounded-sm outline-none border p-2"
                ></textarea>
              </div>
              <div className="flex justify-end mt-2 lg:max-w-xl">
                <button className="bg-primary px-4 py-2 rounded-full text-white">
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <BiSolidErrorCircle size={25} className="text-red-600" />
          <h3 className="font-suse font-semibold">
            Sorry! You can not comment on own blog.
          </h3>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
