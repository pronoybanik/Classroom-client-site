import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddClassIcon = ({ handleSecurityModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 3000);
  };
  

  return (
    <div>
      <div className="relative ">
        <div
          className="hover:bg-gray-200 py-3 px-3 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        >
          <FaPlus style={{ fontSize: "20px" }} />
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div
                onClick={() => handleSecurityModal()}
                className="cursor-pointer block font-semibold text-lg px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Create Class
              </div>
              <a
                href="#"
                className="block font-semibold text-lg px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Join Class
              </a>
              {/* Add more options if needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddClassIcon;
