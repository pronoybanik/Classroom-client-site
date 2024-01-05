import React from "react";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import FrontPage from "../component/FrontPage/FrontPage";
import Register from "../pages/Register/Register";
import ClassItem from "../pages/ClassItem/ClassItem";
import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRoute";
import ClassWork from "../pages/ClassWork/ClassWork";
import People from "../pages/People/People";
import JoinClass from "../pages/JoinClass/JoinClass";
import CreateAssignment from "../pages/createAssignment/createAssignment";
import AssignmentItem from "../pages/AssignmentItem/AssignmentItem";
import StudentDetails from "../pages/StudentDetails/StudentDetails";
import VerifyAccount from "../pages/VerifyAccount/VerifyAccount";

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
    path: "/verifyAccount",
    element: <VerifyAccount />,
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
      {
        path: "/classWork/:id",
        element: <ClassWork />,
      },
      {
        path: "/people/:id",
        element: <People />,
      },
      {
        path: "/joinClass",
        element: <JoinClass />,
      },
      {
        path: "/createAssignment/:id",
        element: <CreateAssignment />,
      },
      {
        path: "/assignmentItem/:id",
        element: <AssignmentItem />,
      },
      {
        path: "/studentDetails/:id",
        element: <StudentDetails />,
      },
     
    ],
  },
]);

export default AllRouter;
