import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

const ProfileIcon = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 4000);
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
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Option 1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Option 2
              </a>
              {/* Add more options if needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileIcon;
