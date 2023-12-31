import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";

const Card = ({ classCode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [text, setText] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFolderClick = () => {
    setIsDropdownOpen(false);
  };

  const handleCopyClick = () => {
    setText(classCode);
    navigator.clipboard.writeText(text);
    toast.success("code in copy");
  };

  return (
    <div className="max-w-md w-full rounded-lg shadow-lg p-6 border-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 ">Class Code</h2>
        <div className="relative">
          <button onClick={toggleDropdown}>
            <FiMoreHorizontal
              className="text-gray-600 cursor-pointer"
              size={20}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={handleFolderClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Folder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center  justify-between">
        <p className=" font-semibold text-2xl mt-2 text-blue-500">
          {classCode}
        </p>
        <IoCopyOutline
          className="cursor-pointer mt-2 text-2xl"
          onClick={handleCopyClick}
        ></IoCopyOutline>
      </div>
    </div>
  );
};

export default Card;
