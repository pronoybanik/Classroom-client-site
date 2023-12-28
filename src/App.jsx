import React from "react";
import { RouterProvider } from "react-router-dom";
import allRouter from "./routers/AllRoute";

const App = () => {
  return (
    <div className="container mx-auto">
      <RouterProvider router={allRouter}></RouterProvider>
      {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8">
        <div className="h-32 rounded-lg w-20 bg-gray-200"></div>
        <div className="h-32 rounded-lg  bg-gray-200"></div>
        <div className="h-32 rounded-lg bg-gray-200 lg:col-span-4"></div>
      </div> */}
    </div>
  );
};

export default App;
