import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";

const AllRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: "home page",
      },
    ],
  },
]);

export default AllRouter;
