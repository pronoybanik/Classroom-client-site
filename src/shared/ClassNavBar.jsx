import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthPovider";

const ClassNavBar = ({ email, id }) => {
  const { user } = useContext(AuthContext);
  const [classData, setClassData] = useState({});
  useEffect(() => {
    fetch(`https://classroom-server-one.onrender.com/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, [id]);

  return (
    <div className="mx-auto lg:w-2/4">
      <ul className="flex items-center border-b border-black w-full  gap-4 ">
        <li className="text-lg font-medium ml-2 hover:bg-gray-200 px-4 py-2">
          <Link to={`/classWork/${id}`}>Class Work</Link>
        </li>
        <li className="text-lg font-medium ml-2 hover:bg-gray-200 px-4 py-2">
          <Link to={`/people/${id}`}>People</Link>
        </li>
        {classData?.email === user?.email ? (
          <li className="text-lg font-medium ml-2 hover:bg-gray-200 px-4 py-2">
            <Link to={`/studentDetails/${id}`}>Communication</Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default ClassNavBar;
