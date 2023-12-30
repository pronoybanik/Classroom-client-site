import React from "react";

const NavBar = ({ setNavToggle, navToggle }) => {
  return (
    <header className="bg-white">
      <div className="flex justify-between">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setNavToggle((pre) => !pre)}
            
            className="rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 "
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              // fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-18"
              src="https://www.gstatic.com/classroom/logo_square_rounded.svg"
              alt=""
            />
            <p className="text-2xl text-gray-700 font-semibold cursor-pointer  leading-2   relative before:absolute before:-bottom-1 before:h-0.5 before:w-full hover:text-[#a7da5c] before:scale-x-0 before:bg-[#92bb56] before:transition hover:before:scale-x-100">
              Classroom
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mr-4">
          <img
            className="w-10 h-10 hover:bg-slate-100 rounded-full"
            src="https://img.icons8.com/?size=50&id=11153&format=png"
            alt=""
          />

          <div>
            <img
              className="w-10 h-10 rounded-lg"
              src="https://img.icons8.com/?size=50&id=7820&format=png"
              alt=""
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
