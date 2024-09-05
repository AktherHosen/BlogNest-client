import toast from "react-hot-toast";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing our Newsletter.");
    e.target.reset();
  };
  return (
    <div
      id="subscribe"
      className="bg-primary min-h-[250px] opacity-80 bg-blend-overlay text-white rounded-lg px-4 py-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:cols-span-1 flex items-center justify-center border-dashed border-b md:border-b-0 md:border-r border-gray-100 border-opacity-80">
          <svg
            width={200}
            height={200}
            className="w-[200px] h-[200px]"
            viewBox="0 0 24 24"
            id="email-file"
            data-name="Flat Color"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(1, 0, 0, 1, 0, 0)"
            stroke=""
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                id="secondary"
                d="M18.71,4.29l-2-2A1,1,0,0,0,16,2H7A2,2,0,0,0,5,4v7a1,1,0,0,0,.45.83l5.44,3.63h0a2,2,0,0,0,2.22,0l5.44-3.63A1,1,0,0,0,19,11V5A1,1,0,0,0,18.71,4.29Z"
                style={{ fill: "#000000" }}
              ></path>
              <path
                id="primary"
                d="M22,10.87V20a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V10.87A2,2,0,0,1,5.11,9.2L12,13.8l6.89-4.6A2,2,0,0,1,22,10.87ZM16,4a1,1,0,0,0,1,1h2a1,1,0,0,0-.28-.71l-2-2A1,1,0,0,0,16,2Z"
                style={{ fill: "#ffffff" }}
              ></path>
            </g>
          </svg>
        </div>
        <div className="md:col-span-2 min-h-[300px] flex justify-center items-center ">
          <div className="space-y-2 px-4">
            <h1 className="font-suse text-4xl tracking-widest uppercase">
              Newsletter
            </h1>
            <p>Keep up our latest blogs and event. Subscribe our Newsletter</p>
            <div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Email Adress...."
                  className="w-full lg:w-80 outline-none  py-2 border text-black"
                />
                <button className="bg-primary border px-4 py-2 outline-none ms-0 lg:ms-2 hover:bg-white hover:text-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
