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
import PrivateRoutes from "./PrivateRoutes";

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
        element: (
          <PrivateRoutes>
            <AddBlog />
          </PrivateRoutes>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoutes>
            <BlogDetail />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-blog/:id",
        element: (
          <PrivateRoutes>
            <UpdateBlog />
          </PrivateRoutes>
        ),
      },
      {
        path: "/top-blogs",
        element: <FeaturedBlogs />,
      },
      {
        path: "/my-wishlist",
        element: (
          <PrivateRoutes>
            <Wishlist />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
