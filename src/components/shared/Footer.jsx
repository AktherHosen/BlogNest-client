import React from "react";
import logo from "../../assets/logo.png";
import { FaSquareFacebook } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { SiLinkedin } from "react-icons/si";
import { BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="mt-8 bg-[#1E1E1E] min-h-[260px] flex items-center opacity-80 bg-blend-overlay text-white px-6 py-6 lg:px-20 ">
      <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4">
        <div className="col-span-2 md:col-span-1 md:grid-cols-1 space-y-2">
          <img src={logo} alt="" className="h-12" />
          <h2 className="font-suse text-xl">Blog Nest</h2>
          <p className="max-w-lg text-justify text-sm">
            We share insights, tips, and stories on a variety of topics. Whether
            you're looking for inspiration, practical advice, or a fresh
            perspective, you'll find it here.
          </p>
        </div>
        <div className="col-span-1 mt-4 flex md:justify-center">
          <ul>
            <li className="font-semibold mb-4">Quick Links</li>
            <li className="hover:underline text-gray-200">
              <Link>Home</Link>
            </li>
            <li className="hover:underline text-gray-200">
              <Link>Blogs</Link>
            </li>
            <li className="hover:underline text-gray-200">
              <Link>Login</Link>
            </li>
            <li className="hover:underline text-gray-200">
              <Link>Register</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 mt-4 flex md:justify-center">
          <ul>
            <li className="font-semibold mb-4">Quick Links</li>
            <li className="hover:underline text-gray-200">
              <Link>Home</Link>
            </li>
            <li className="hover:underline text-gray-200">
              <Link>Blogs</Link>
            </li>
            <li className="hover:underline text-gray-200">
              <Link>Login</Link>
            </li>
            <li className="hover:underline text-gray-200">
              <Link>Register</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-3 lg:col-span-1 mt-4 flex  lg:justify-end w-full pr-4">
          <div>
            <h3>Follow us on</h3>
            <hr className="my-2" />
            <div className="flex gap-2">
              <button className="border p-1 hover:bg-primary hover:text-black hover:scale-105 hover:transition-all hover:duration-300">
                <FaSquareFacebook size={26} />
              </button>
              <button className="border p-1 hover:bg-primary hover:text-black hover:scale-105 hover:transition-all hover:duration-300">
                <FiInstagram size={26} />
              </button>
              <button className="border p-1 hover:bg-primary hover:text-black hover:scale-105 hover:transition-all hover:duration-300">
                <SiLinkedin size={26} />
              </button>
              <button className="border p-1 hover:bg-primary hover:text-black hover:scale-105 hover:transition-all hover:duration-300">
                <BiWorld size={26} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
