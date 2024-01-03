import React from "react";
import NavBar from "../shared/NavBar";
import SideMenuComponents from "../component/SideMenuComponents/SideMenuComponents";
import { Outlet } from "react-router-dom";
import ClassNavBar from "../shared/ClassNavBar";

const Teacher = () => {
  const [navToggle, setNavToggle] = React.useState(true);
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
            <ClassNavBar />
              <Outlet />
            </div>
          </section>
        </section>

        <h1>Footer</h1>
      </div>
   
  );
};

export default Teacher;
