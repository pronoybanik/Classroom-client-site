import React from "react";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import FrontPage from "../component/FrontPage/FrontPage";
import Register from "../pages/Register/Register";
import ClassItem from "../pages/ClassItem/ClassItem";
import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRoute";

const AllRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Register />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: (
      <PrivateRouter>
        <Main />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <FrontPage />,
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
