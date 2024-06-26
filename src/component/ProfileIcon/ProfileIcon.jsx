import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../../shared/AuthPovider";

const ProfileIcon = ({ userData }) => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = () => {
    logout();
    localStorage.clear();
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn p-0 m-1">
        <div>
          <img
            className="w-12 h-12 hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
            src={user?.photoURL || <CgProfile />}
            alt=""
            onClick={toggleDropdown}
          />
        </div>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] ">
        <div className="w-96 absolute right-0 mt-2 rounded-lg shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5">
          <div
            className=" flex items-center justify-center py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-8 text-center">
              {userData?.userRole !== "admin" ? (
                <div>
              
                  <p className="pb-2 text-sm font-bold ">
                    Email: {user?.email}
                  </p>
                  <p className="pb-2 text-sm font-bold ">
                    Mobile Number: {userData?.mobileNumber}
                  </p>
                  <p className="pb-4 text-sm font-bold ">
                    Date Of Birth: {userData?.dateOfBirth}
                  </p>
                </div>
              ) : null}

              {userData?.userRole === "admin" ? (
                <p className="pb-4 text-sm font-bold  ">{user?.email}</p>
              ) : null}

              <div className="flex items-center justify-center">
                <img
                  className=" w-24 h-24 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
              <p className="text-2xl text-black">{user?.displayName}!</p>
              <div
                onClick={handleLogOut}
                className="bg-white font-semibold cursor-pointer mt-4 rounded-full flex items-center justify-center h-full gap-2  py-2"
              >
                <IoLogOutOutline style={{ fontSize: "30px" }} /> Log Out
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default ProfileIcon;
