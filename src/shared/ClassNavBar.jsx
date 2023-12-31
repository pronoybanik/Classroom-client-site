import React, { useState } from "react";
import { Link } from "react-router-dom";

const ClassNavBar = ({ id }) => {
  //   const [border, setBorder] = useState("classId");

  return (
    <div>
      <ul className="flex items-center border-b-2 w-full  gap-4 ">
        <li className="text-lg font-medium ml-2 hover:bg-gray-100 px-4 py-2">
          <Link to={`/classId/:${id}`}>Stream</Link>
        </li>
        <li className="text-lg font-medium ml-2 hover:bg-gray-100 px-4 py-2">
          <Link to="/classWork">Class Work</Link>
        </li>
        <li className="text-lg font-medium ml-2 hover:bg-gray-100 px-4 py-2">
          <Link to="/people">People</Link>
        </li>
      </ul>
    </div>
  );
};

export default ClassNavBar;
