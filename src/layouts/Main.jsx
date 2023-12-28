import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h1>NavBar</h1>
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
};

export default Main;
