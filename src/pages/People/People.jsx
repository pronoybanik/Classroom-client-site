import React, { useContext } from "react";
import ClassNavBar from "../../shared/ClassNavBar";
import { AuthContext } from "../../shared/AuthPovider";
import { CgProfile } from "react-icons/cg";

const People = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <ClassNavBar />
      <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
        <div className="flex items-center  mt-4 mb-6 text-blue-600  w-64 px-2 py-2  ">
          <button className="text-5xl font-normal -mt-1">Teachers</button>
        </div>
        <div className="border-b-2 border-blue-500"></div>
        <br />
        <div className="flex items-center gap-4 ">
          <img
            className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
            src={user?.photoURL || <CgProfile />}
            alt=""
          />
          <p className="font-semibold text-gray-500">{user?.displayName}</p>
        </div>
      </div>

      <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
        <div className="flex items-center  mt-4 mb-6 text-blue-600  w-64 px-2 py-2  ">
          <button className="text-5xl font-normal -mt-1">students</button>
        </div>
        <div className="border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
};

export default People;
