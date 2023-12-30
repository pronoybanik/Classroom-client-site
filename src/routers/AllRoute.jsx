import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import FrontPage from "../component/FrontPage/FrontPage";
import Register from "../pages/Register/Register";
import GenerateAndLog from "../pages/GenerateAndLog/GenerateAndLog ";

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
        path: "/GenerateAndLog",
        element: <GenerateAndLog />,
      },
    ],
  },
]);

export default AllRouter;
