import React from "react";
import Marquee from "react-fast-marquee";
import icon from "../assets/quotes.png";

const Testimonial = () => {
  return (
    <div>
      <div className="">
        <h1 className="text-xl font-suse uppercase font-bold">Authors</h1>
        <hr className="flex-1 h-[1px] my-2 bg-primary opacity-10" />
        <div className="my-6 rounded-md">
          <Marquee
            pauseOnHover={true}
            gradient={false}
            speed={50}
            className="space-x-8 rounded-md"
          >
            {/* Tech and Gadgets */}
            <div className="relative rounded-md min-w-[300px] max-w-[350px] h-[300px] p-6 bg-gray-100   md:p-8 me-4">
              <img
                src={icon}
                alt="quote icon"
                className="absolute top-3 right-3 w-8 h-8"
              />

              <p className="mt-2 text-gray-500  h-[150px] overflow-hidden">
                "As a tech enthusiast, I've explored numerous blogging
                platforms, but this one stands out for its seamless integration
                with the latest tech trends. The intuitive interface and
                advanced analytics tools have been invaluable for tracking
                gadget reviews and technology news. It's a game-changer for any
                tech blogger!"
              </p>
              <div className="flex items-center my-4">
                <img
                  className="object-cover rounded-full w-14 h-14"
                  src="https://lh3.googleusercontent.com/a/ACg8ocKBQUEzX9lF865Z-v_Vy0u8UPCApEN1aSF1usDLusMazc1swog=s96-c"
                  alt=""
                />
                <div className="mx-4">
                  <h1 className="font-semibold text-primary">
                    Md. Akther Hosen
                  </h1>
                  <span className="text-sm text-gray-500 ">Web Developer</span>
                </div>
              </div>
            </div>

            {/* Travel Adventure */}
            <div className="relative min-w-[300px] max-w-[350px] h-[300px] p-6 bg-gray-100 rounded-lg  md:p-8 me-4">
              <img
                src={icon}
                alt="quote icon"
                className="absolute top-3 right-3 w-8 h-8"
              />

              <p className="mt-2 text-gray-500  h-[150px] overflow-hidden">
                "This platform has made sharing my travel experiences a breeze!
                With its user-friendly features and customizable options, I can
                easily showcase my adventures through stunning visuals and
                detailed posts. The community engagement tools are perfect for
                connecting with fellow travelers and readers."
              </p>
              <div className="flex items-center my-4">
                <img
                  className="object-cover rounded-full w-14 h-14"
                  src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Mia Brown"
                />
                <div className="mx-4">
                  <h1 className="font-semibold text-blue-500">Brown</h1>
                  <span className="text-sm text-gray-500 ">
                    Marketing Manager at Stech
                  </span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative min-w-[300px] max-w-[350px] h-[300px] p-6 bg-gray-100 rounded-lg  md:p-8 me-4">
              <img
                src={icon}
                alt="quote icon"
                className="absolute top-3 right-3 w-8 h-8"
              />

              <p className="mt-2 text-gray-500  h-[150px] overflow-hidden">
                "For an education blogger like me, this platform offers
                exceptional features to present educational content effectively.
                The robust editing tools and multimedia support allow me to
                create engaging and informative posts that resonate with
                students and educators alike."
              </p>
              <div className="flex items-center my-4">
                <img
                  className="object-cover rounded-full w-14 h-14"
                  src="https://i.ibb.co/jD9xx3k/salma.png"
                  alt="Emma Davis"
                />
                <div className="mx-4">
                  <h1 className="font-semibold text-blue-500">Emma Davis</h1>
                  <span className="text-sm text-gray-500 ">
                    Lifestyle Blogger
                  </span>
                </div>
              </div>
            </div>

            {/* Science and Innovation */}
            <div className="relative min-w-[300px] max-w-[350px] h-[300px] p-6 bg-gray-100 rounded-lg  md:p-8 me-4">
              <img
                src={icon}
                alt="quote icon"
                className="absolute top-3 right-3 w-8 h-8"
              />

              <p className="mt-2 text-gray-500 h-[150px] overflow-hidden">
                "Covering scientific discoveries and innovations has never been
                easier with this platform. Its advanced customization options
                and data visualization tools help me present complex information
                in an accessible and engaging way. It's a fantastic resource for
                science communicators!"
              </p>
              <div className="flex items-center my-4">
                <img
                  className="object-cover rounded-full w-14 h-14"
                  src="https://i.ibb.co/vHHc9x0/sophia.png"
                  alt="Sophia"
                />
                <div className="mx-4">
                  <h1 className="font-semibold text-blue-500">Sophia </h1>
                  <span className="text-sm text-gray-500 ">
                    Science Communicator
                  </span>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="relative min-w-[300px] max-w-[350px] h-[300px] p-6 bg-gray-100 rounded-lg  md:p-8 me-4">
              <img
                src={icon}
                alt="quote icon"
                className="absolute top-3 right-3 w-8 h-8"
              />

              <p className="mt-2 text-gray-500  h-[150px] overflow-hidden">
                "This blogging platform has elevated my lifestyle content with
                its sleek design and easy-to-use features. From fashion tips to
                wellness advice, the flexibility and customization options allow
                me to create a visually appealing and engaging blog that
                reflects my unique style."
              </p>
              <div className="flex items-center my-4">
                <img
                  className="object-cover rounded-full w-14 h-14"
                  src="https://i.ibb.co/4PNnZYX/liam.png"
                  alt="Liam "
                />
                <div className="mx-4">
                  <h1 className="font-semibold text-blue-500">Liam </h1>
                  <span className="text-sm text-gray-500 ">
                    Fashion Blogger
                  </span>
                </div>
              </div>
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
