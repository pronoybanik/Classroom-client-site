import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";

const Card = ({ classCode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFolderClick = () => {
    setIsDropdownOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(classCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Clear "Copied!" message after 2 seconds
      })
      .catch((error) => console.error("Error copying text:", error));
  };

  return (
    <section>
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

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2 ${
              copied ? "bg-green-500 hover:bg-green-700" : ""
            }`}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </div>
      </div>

      <div className="max-w-md w-full rounded-lg shadow-lg p-6 border-2 mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 ">
            Joint Class Link
          </h2>
        </div>
        <div className="flex gap-2 items-center  justify-between">
          <p className=" font-semibold text-2xl mt-2 text-blue-500">Link</p>
        </div>
      </div>
    </section>
  );
};

export default Card;
