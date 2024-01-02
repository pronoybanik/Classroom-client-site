import React, { useContext, useEffect, useState } from "react";
import ClassNavBar from "../../shared/ClassNavBar";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/AuthPovider";

const ClassWork = () => {
  const { user } = useContext(AuthContext);
  const [assignmentData, setAssignmentData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/assignment")
      .then((res) => res.json())
      .then((data) => setAssignmentData(data.data));
  }, []);

  const filterAssignment = assignmentData.filter(
    ({ email }) => email === user.email
  );
  console.log(filterAssignment);

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

        <div>
          {filterAssignment?.map((data) => (
            <Link
              to={`/assignmentItem/${data?._id}`}
              className="mt-4 card w-96 bg-neutral text-neutral-content"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{data?.title}</h2>
                <p>We are using cookies for no reason.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassWork;
