import React from "react";
import { RouterProvider } from "react-router-dom";
import allRouter from "./routers/AllRoute";

const App = () => {
  return (
    <div className="container mx-auto">
      <RouterProvider router={allRouter}></RouterProvider>
    </div>
  );
};

export default App;
