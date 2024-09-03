import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(data);
    };
    getData();
  }, []);
  return (
    <div className="my-4">
      <div className="mb-4">
        <h1 className="text-xl font-suse text-primary font-semibold">Blogs</h1>
        <p className="text-sm font-semibold">
          Discover, Learn, and Grow Together
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 lg:gap-x-10 gap-y-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
