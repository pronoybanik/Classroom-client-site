import React from "react";
import ClassNavBar from "../../shared/ClassNavBar";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";

const ClassWork = () => {
  return (
    <div>
      <ClassNavBar />
      <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
        <div className="flex items-center  mt-4 mb-12 bg-blue-800  w-64 px-2 py-2 text-white rounded-full">
          <div className="text-4xl">
            <GoPlus />
          </div>
          <Link to="/createAssignment">
            <button className="text-xl -mt-1">create Assignment</button>
          </Link>
        </div>
        <div className="border-b-2 "></div>
      </div>
    </div>
  );
};

export default ClassWork;
