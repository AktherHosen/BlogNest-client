import { Typewriter } from "react-simple-typewriter";
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Banner = () => {
  const { user } = useAuth();
  const [backgroundImage, setBackgroundImage] = useState(
    "https://i.ibb.co/WgHMbqf/banner1.jpg"
  );
  const [prevImage, setPrevImage] = useState(backgroundImage);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const images = [
      "https://i.ibb.co/WgHMbqf/banner1.jpg",
      "https://i.ibb.co/mqDdGrc/banner2.png",
      "https://i.ibb.co/b3bBSGf/banner3-2.png",
    ];

    const interval = setInterval(() => {
      setFadeIn(false);

      const currentIndex = images.indexOf(backgroundImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setPrevImage(backgroundImage);
      setBackgroundImage(images[nextIndex]);

      setTimeout(() => {
        setFadeIn(true);
      }, 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, [backgroundImage]);

  return (
    <div className="relative py-10 text-center min-h-[600px] flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          fadeIn ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${prevImage})` }}
      />
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-white lg:text-5xl">
          <Typewriter
            words={["Discover, Learn, and Engage"]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="mt-2 text-white">
          Navigate through a collection of well-crafted posts, exclusive
          features, and expert commentary on trending topics.
        </p>
        <div className="mt-6">
          {user ? (
            <Link to="/add-blog">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#eeeded",
                  color: "black",
                }}
                transition={{ bounceDamping: 10, bounceStiffness: 600 }}
                className="px-6 py-3 mt-4 text-lg font-medium leading-5 text-center text-white capitalize text-suse bg-primary rounded-md lg:mx-0 lg:w-auto focus:outline-none"
              >
                Write Blog
              </motion.button>
            </Link>
          ) : (
            <Link to="/login">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#eeeded",
                  color: "black",
                }}
                transition={{ bounceDamping: 10, bounceStiffness: 600 }}
                className="px-6 py-3 mt-4 text-lg font-medium leading-5 text-center text-white capitalize text-suse bg-primary rounded-md lg:mx-0 lg:w-auto focus:outline-none"
              >
                Get Started
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
