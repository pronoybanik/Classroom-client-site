import React from "react";
import { RouterProvider } from "react-router-dom";
import allRouter from "./routers/AllRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="">
      <RouterProvider router={allRouter}></RouterProvider>
      <Toaster />
    </div>
  );
};

export default App;
