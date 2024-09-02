import toast from "react-hot-toast";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing our Newsletter.");
    e.target.reset();
  };
  return (
    <div className="bg-primary min-h-[300px] opacity-80 bg-blend-overlay text-white rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:cols-span-1 flex items-center justify-center border-dashed border-b md:border-b-0 md:border-r border-gray-100 border-opacity-80">
          <svg
            fill="#ffffff"
            className="h-[200px] md:h-[160px]"
            width="800px"
            height="800px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div className="md:col-span-2 min-h-[300px] flex justify-center items-center">
          <div className="space-y-2">
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
                  className="w-80 outline-none inline py-2 border text-black"
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
