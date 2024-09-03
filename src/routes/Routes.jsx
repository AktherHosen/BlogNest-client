import Home from "../pages/Home";
import Main from "../layout/Main";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";
import ErrorPage from "../pages/ErrorPage";
import AddBlog from "../pages/AddBlog";
import Blogs from "../pages/Blogs";

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
    ],
  },
]);

export default router;
