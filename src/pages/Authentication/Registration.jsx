import React from "react";
import { FaUser } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const axiosSecure = useAxiosSecure();
  const { createUser, setUser, updateUserProfile } = useAuth();
  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const pass = form.pass.value;
    if (pass.length < 6) {
      toast.error("Your password must contains at least 6 character");
      return;
    }
    if (!/[A-Z]/.test(pass)) {
      toast.error("Your password must contain at least one uppercase letter");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
      toast.error("Your password must contain at least one special character.");
      return;
    }
    if (!/\d/.test(pass)) {
      toast.error("Your password must contain a numeric value.");
      return;
    }
    try {
      const result = await createUser(email, pass);
      await updateUserProfile(name, photo);
      setUser({ ...result?.user, photoURL: photo, displayName: name });
      // jwt
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });

      toast.success("Registration successful.");
      e.target.reset();
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <div>
      <div className="flex my-10 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md ">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
            </div>
            <h3 className="text-center font-suse  font-medium text-2xl">
              New Here? Register First
            </h3>

            <form onSubmit={handleRegistration} className="w-full">
              <div className="relative flex items-center mt-3">
                <span className="absolute">
                  <FaUser className="w-6 h-6 mx-3 text-gray-300 " />
                </span>

                <input
                  type="text"
                  name="name"
                  required
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your name"
                />
              </div>
              <div className="relative flex items-center mt-3">
                <span className="absolute">
                  <MdMarkEmailUnread className="w-6 h-6 mx-3 text-gray-300" />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your email"
                />
              </div>
              <div className="relative flex items-center mt-3">
                <span className="absolute">
                  <IoMdPhotos className="w-6 h-6 mx-3 text-gray-300" />
                </span>
                <input
                  type="text"
                  name="photo"
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your photo url"
                />
              </div>

              <div className="relative flex items-center mt-3">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    stroke-width
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  name="pass"
                  required
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your password"
                />
              </div>

              <div className="mt-6">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-8 text-sm font-normal text-center ">
              Already have an account? {}
              <Link
                to="/login"
                className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
              >
                Please Login
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden w-full lg:block lg:w-1/2">
          <img src="https://i.ibb.co/pdF924t/494640-PHEPSD-293-ai.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
