import React, { useContext, useEffect, useRef, useState } from "react";
import AddClassIcon from "../component/AddCalssIcon/AddCalssIcon";
import ProfileIcon from "../component/ProfileIcon/ProfileIcon";
import CreateClassModal from "./CreateClassModal";
import { IoBookSharp } from "react-icons/io5";
import { AuthContext } from "./AuthPovider";
import { Link } from "react-router-dom";
import Model from "./Model";

const NavBar = ({ setNavToggle }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [checkBox, setCheckBox] = useState(false);
  const securityModule = useRef(null);
  const CrateClassModule = useRef(null);

  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});

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

  useEffect(() => {
    if (userId) {
      fetch(`https://classroom-server-one.onrender.com/api/v1/userInfo/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserData(data.data));
    }
  }, [userId]);

  return (
    <section>
      <header className="bg-white rounded">
        <div className="flex justify-between ">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setNavToggle((pre) => !pre)}
              className="cursor-pointer rounded  bg-gray-100 p-2 m-2 text-gray-600 transition hover:text-gray-600/75 "
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
              <Link
                className="btn normal-case text-xl btn-sm font-serif text-gray-600"
                to="/home"
              >
                <IoBookSharp style={{ marginTop: "4px" }} />
                Smart .<p className="text-amber-600">class</p>
              </Link>
            </div>
          </div>

          <div className=" flex items-center gap-4 mr-4">
            {userData?.userRole === "admin" && (
              <Link to="/admin/allUser">
                <button className="btn btn-active btn-sm">Admin Route</button>
              </Link>
            )}
            <AddClassIcon handleSecurityModal={handleSecurityModal} />
            <ProfileIcon />
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
    </section>
  );
};

export default NavBar;
