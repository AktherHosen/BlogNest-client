import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";
import { Dropdown } from "flowbite-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white  border-r-0 shadow-sm">
      <div className="py-4 ">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <div className="flex gap-x-2">
              <a href="#">
                <img className="w-auto h-6 sm:h-7" src={logo} alt="" />
              </a>
              <h3 className="font-suse font-bold text-2xl">Blog Nest</h3>
            </div>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500  hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full  py-4 transition-all duration-300 ease-in-out bg-white  lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 ${
                    isActive ? "bg-primary text-white" : "text-gray-700"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  `px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 ${
                    isActive ? "bg-primary text-white" : "text-gray-700"
                  }`
                }
              >
                Blogs
              </NavLink>
              <NavLink
                to="/featured-blogs"
                className={({ isActive }) =>
                  `px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 ${
                    isActive ? "bg-primary text-white" : "text-gray-700"
                  }`
                }
              >
                Featured Blogs
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-6 py-2 mx-3 mt-2 ml-5 rounded-full transition-colors duration-300 transform  lg:mt-0 ${
                    isActive ? "bg-primary text-white" : "bg-primary text-white"
                  } w-fit`
                }
              >
                Login
              </NavLink>
            </div>

            <div className="flex items-center mt-4  lg:mt-0">
              <Dropdown label="Md. Akther Hosen">
                <Dropdown.Header>
                  <div className="flex flex-row-reverse items-center gap-x-2">
                    <div className="h-[50px] w-[50px]">
                      <img
                        referrerPolicy="no-referrer"
                        alt="User Profile Photo"
                        className="w-full h-full rounded-full border-2 p-2"
                        src={logo}
                      />
                    </div>

                    <span className="block truncate text-sm font-medium">
                      bonnie@flowbite.com
                    </span>
                  </div>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link to="/add-job" className="justify-between">
                    Add Blog
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/my-posted-jobs">Wishlist</Link>
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item>
                  <button className="text-white  hover:bg-red-500 w-full  lg:w-full bg-red-500 py-2 font-semibold hover:text-white px-3 rounded-md">
                    Logout
                  </button>
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
