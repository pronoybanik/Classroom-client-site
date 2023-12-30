import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import FrontPage from "../component/FrontPage/FrontPage";
import Register from "../pages/Register/Register";
import ClassItem from "../pages/ClassItem/ClassItem";

const AllRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <FrontPage></FrontPage>,
      },
      {
        path: "/login",
        element: <Register></Register>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/classId/:id",
        element: <ClassItem />,
      },
    ],
  },
]);

export default AllRouter;
