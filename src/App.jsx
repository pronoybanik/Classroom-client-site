import React from "react";
import { RouterProvider } from "react-router-dom";
import allRouter from "./routers/AllRoute";

function App() {
  return (
    <div>
      <RouterProvider router={allRouter}></RouterProvider>
    </div>
  );
}

export default App;
