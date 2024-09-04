import Home from "../pages/Home";
import Main from "../layout/Main";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";
import ErrorPage from "../pages/ErrorPage";
import AddBlog from "../pages/AddBlog";
import Blogs from "../pages/Blogs";
import BlogDetail from "../pages/BlogDetail";
import UpdateBlog from "../pages/UpdateBlog";
import FeaturedBlogs from "../pages/FeaturedBlogs";
import Wishlist from "../pages/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/add-blog",
        element: <AddBlog />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/blog/${params.id}`),
      },
      {
        path: "/update-blog/:id",
        element: <UpdateBlog />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/blog/${params.id}`),
      },
      {
        path: "/top-blogs",
        element: <FeaturedBlogs />,
      },
      {
        path: "/my-wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);

export default router;
