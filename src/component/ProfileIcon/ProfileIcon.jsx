import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../../shared/AuthPovider";

const ProfileIcon = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 4000);
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <div>
      <div className="relative">
        <div>
          <img
            className="w-12 h-12 hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
            src={user?.photoURL || <CgProfile />}
            alt=""
            onClick={toggleDropdown}
          />
        </div>

        {isDropdownOpen && (
          <div className=" w-96 absolute right-0 mt-2  rounded-lg shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5">
            <div
              className=" flex items-center justify-center py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-8">
                <p className=" pb-4 text-sm font-semibold text-center">
                  {user?.email}
                </p>
                <img
                  className="w-20 h-20 rounded-full ml-10"
                  src={user?.photoURL}
                  alt=""
                />
                <p className="text-2xl text-black">Hi,{user?.displayName}!</p>
                <div
                  onClick={handleLogOut}
                  className="bg-white font-semibold cursor-pointer mt-4 rounded-full flex items-center justify-center h-full gap-2  py-2"
                >
                  <IoLogOutOutline style={{ fontSize: "30px" }} /> Log Out
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileIcon;
