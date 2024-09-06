import Banner from "../components/Banner";
import Features from "../components/Features";
import Newsletter from "../components/Newsletter";
import RecentBlogs from "../components/RecentBlogs";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <RecentBlogs />
      <Features />
      <Testimonial />
      <Newsletter />
    </div>
  );
};

export default Home;
