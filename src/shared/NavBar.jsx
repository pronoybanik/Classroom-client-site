import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "./AuthPovider";
import AddClassIcon from "../component/AddCalssIcon/AddCalssIcon";
import ProfileIcon from "../component/ProfileIcon/ProfileIcon";
import Model from "./Model";
import CreateClassModal from "./CreateClassModal";

const NavBar = ({ setNavToggle }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [checkBox, setCheckBox] = useState(false);

  const securityModule = useRef(null);
  const CrateClassModule = useRef(null);

  const handleSecurityModal = () => {
    securityModule.current.showModal();
  };
  const handleCloseModal = () => {
    securityModule.current.showModal();
  };

  const handleCrateClassModule = () => {
    CrateClassModule.current.showModal();
  };

  const handleCreateClassCloseModule = () => {
    CrateClassModule.current.close();
  };

  return (
    <header className="bg-white">
      <div className="flex justify-between">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setNavToggle((pre) => !pre)}
            className="cursor-pointer rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 "
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
            <p className="text-2xl  text-gray-700 font-semibold cursor-pointer  leading-2   relative before:absolute before:-bottom-1 before:h-0.5 before:w-full hover:text-[#00A300] before:scale-x-0 before:bg-[#00A300] before:transition hover:before:scale-x-100">
              Classroom
            </p>
          </div>
        </div>

        <div className=" flex items-center gap-4 mr-4">
          <AddClassIcon handleSecurityModal={handleSecurityModal} />
          <ProfileIcon  />
        </div>
      </div>
      <Model
        checkBox={checkBox}
        setCheckBox={setCheckBox}
        handleCrateClassModule={handleCrateClassModule}
        ref={securityModule}
        handleCloseModule={handleCloseModal}
      />
      <CreateClassModal
        handleCreateClassCloseModule={handleCreateClassCloseModule}
        ref={CrateClassModule}
      />
    </header>
  );
};

export default NavBar;
