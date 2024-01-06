import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideMenuComponents from "../component/SideMenuComponents/SideMenuComponents";
import NavBar from "../shared/NavBar";

const AdminDashBoard = () => {
  const [navToggle, setNavToggle] = useState(true);


  return (
    <div>
      <div className=" my-2 ml-6">
        <NavBar navToggle={navToggle} setNavToggle={setNavToggle} />
      </div>
      <p className="border-b-2 mt-2"></p>

      <section>
        <section className={navToggle ? "grid grid-cols-4" : ""}>
          <div className="cursor-pointer ml-2">
            {navToggle === true ? (
              <SideMenuComponents navToggle={navToggle} />
            ) : null}
          </div>

          <div className=" col-span-3 ml-4">
            <Outlet />
          </div>
        </section>
      </section>
    </div>
  );
};

export default AdminDashBoard;
