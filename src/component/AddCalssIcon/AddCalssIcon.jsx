import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddClassIcon = ({ handleSecurityModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
   
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          <div
            className="  rounded-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <FaPlus style={{ fontSize: "20px" }} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1]"
        >
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div
                onClick={() => handleSecurityModal()}
                className="cursor-pointer font-serif block font-medium text-lg px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Create Class
              </div>
              <Link
                to="/joinClass"
                className="block font-serif font-medium text-lg px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Join Class
              </Link>
              {/* Add more options if needed */}
            </div>
          </div>
        </ul>
      </div>
  
  );
};

export default AddClassIcon;
