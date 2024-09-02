import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();

  // #Email password sign in
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await signIn(email, password);
      e.target.reset();
    } catch (err) {
      console.log(err?.message);
    }
  };
  // #Google sign in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log(result);
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <div>
      <div className="flex my-10 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md ">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
            </div>
            <h3 className="text-center font-suse  font-medium text-2xl">
              Welcome Back
            </h3>

            <form className="mt-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm text-gray-800 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm text-gray-800 dark:text-gray-200">
                    Password
                  </label>
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Sign In
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b lg:w-1/5"></span>

              <p className="text-xs text-center  uppercase  hover:underline">
                or login with Social Media
              </p>

              <span className="w-1/5 border-b  lg:w-1/5"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg  focus:bg-blue-400 focus:outline-none"
              >
                <FaGoogle className="w-5 h-5 mx-2" />
                <span className="hidden mx-2 sm:inline">
                  Sign in with Google
                </span>
              </button>
            </div>

            <p className="mt-8 text-sm font-normal text-center ">
              Don't have an account? {}
              <Link
                to="/registration"
                className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
              >
                Create One
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
