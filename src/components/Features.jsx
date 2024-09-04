import React from "react";

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  min-h-[400px] my-6 gap-4 md:gap-0">
      <div className="max-w-md flex flex-col space-y-4 items-center justify-center">
        <h1 className="text-5xl">
          You Can <span className="font-semibold text-gray-700">Read</span>
        </h1>
        <h1 className="text-5xl">
          And Write <span className="font-semibold text-gray-700">Write</span>
        </h1>
        <h1 className="text-5xl font-suse">BlogNest.</h1>
      </div>
      <div className="border flex flex-col justify-center gap-x-6 rounded-md">
        <div className="border-b-2 rounded-t-md space-y-4 h-full p-6 hover:bg-primary hover:text-white transition-colors duration-200 hover:opacity-80 hover:rounded-t-md">
          <h1 className="text-xl font-semibold">Open Platform</h1>
          <p>
            Discover the freedom of our open platform where creativity and
            innovation thrive. Users can freely contribute and share their ideas
            across various categories. Engage with diverse content, collaborate
            with others, and explore a world of possibilities. Our platform
            fosters an inclusive environment for all creators and enthusiasts.
          </p>
        </div>
        <div className="space-y-4 rounded-b-md h-full p-6 hover:bg-primary hover:text-white transition-colors duration-200 hover:opacity-80 hover:rounded-b-md">
          <h1 className="text-lg font-semibold">Digital Publishing</h1>
          <p>
            Explore our diverse collection of digital publishing content. From
            insightful articles and posts to interactive media, discover a range
            of categories created by users. Dive into topics that spark your
            interest and stay informed with the latest in digital publishing
            trends and innovations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
