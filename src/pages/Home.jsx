import Banner from "../components/Banner";
import Features from "../components/Features";
import Newsletter from "../components/Newsletter";
import RecentBlogs from "../components/RecentBlogs";

const Home = () => {
  return (
    <div>
      <Banner />
      <RecentBlogs />
      <Features />
      <Newsletter />
    </div>
  );
};

export default Home;
