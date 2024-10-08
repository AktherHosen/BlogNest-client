import React from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UpdateBlog = () => {
  const { user } = useAuth();
  const { id } = useParams(); // Corrected to destructure `id`
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: blog = {} } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/blog/${id}`);
      return response.data;
    },
  });

  const {
    _id,
    blogTitle,
    photo,
    email,
    category,
    shortDescription,
    longDescription,
  } = blog;

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    const postedDate = new Date();
    const form = e.target;
    const blogTitle = form.blogTitle.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const category = form.category.value;
    const shortDescription = form.shortdescription.value;
    const longDescription = form.longdescription.value;
    const blogInfo = {
      blogTitle,
      photo,
      email,
      category,
      shortDescription,
      longDescription,
      postedDate,
      author: {
        name: user?.displayName,
        photo: user?.photoURL,
      },
    };

    try {
      await axiosSecure.put(`/blog/${_id}`, blogInfo);
      toast.success("Blog updated successfully.");
      navigate("/blogs");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="my-4">
      <h1 className="text-lg font-suse text-primary font-semibold">
        Update Blog
      </h1>
      <p className="text-sm font-semibold">
        Sharing Insights, Ideas, and Inspiration
      </p>
      <div className="mt-4">
        <form onSubmit={handleUpdateBlog}>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="w-full">
              <label
                htmlFor="blogTitle"
                className="text-gray-600 block mb-1 font-semibold"
              >
                Blog Title
              </label>
              <input
                id="blogTitle"
                type="text"
                name="blogTitle"
                defaultValue={blogTitle}
                placeholder="Write blog title"
                className="w-full rounded-sm outline-none"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-gray-600 block mb-1 font-semibold"
              >
                Blog Photo URL
              </label>
              <input
                type="text"
                name="photo"
                defaultValue={photo}
                placeholder="Blog photo url"
                className="w-full rounded-sm outline-none"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-gray-600 block mb-1 font-semibold"
              >
                Author Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={email}
                placeholder="Your Email"
                className="w-full rounded-sm outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor=""
                className="text-gray-600 block mb-1 font-semibold"
              >
                Short Description
              </label>
              <textarea
                name="shortdescription"
                defaultValue={shortDescription}
                className="w-full h-32 resize-none rounded-sm outline-none"
                placeholder="Short Description..."
              ></textarea>
            </div>

            <div>
              <label
                htmlFor=""
                className="text-gray-600 block mb-1 font-semibold"
              >
                Choose Category
              </label>
              <select
                name="category"
                id="category"
                defaultValue={category}
                className="border w-full rounded-sm outline-none"
              >
                <option value="Tech and Gadgets">Tech and Gadgets</option>
                <option value="Travel Adventure">Travel Adventure</option>
                <option value="Education">Education</option>
                <option value="Science and Innovation">
                  Science and Innovation
                </option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor=""
                className="text-gray-600 block mb-1 font-semibold"
              >
                Long Description
              </label>
              <textarea
                name="longdescription"
                defaultValue={longDescription}
                className="resize-none w-full h-48 rounded-sm outline-none"
                placeholder="Long Description..."
              ></textarea>
            </div>
          </div>
          <button className="bg-primary px-4 py-2 text-white font-semibold outline-none rounded-sm hover:bg-[#1E1E1E] hover:bg-blend-overlay hover:transition-colors duration-300">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
