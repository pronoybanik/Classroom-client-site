import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/AuthPovider";
import { CgProfile } from "react-icons/cg";
import ClassNavBar from "../../shared/ClassNavBar";
import { Link, useParams } from "react-router-dom";

const People = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, [id]);
  console.log("people", classData);

  return (
    <div>
      <ClassNavBar id={id} />
      <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
        <div className="flex items-center  mt-4 mb-6 text-blue-600  w-64 px-2 py-2  ">
          <button className="text-5xl font-normal -mt-1">Teachers</button>
        </div>
        <div className="border-b-2 border-blue-500"></div>
        <br />
        <div className="flex items-center gap-4 ">
          <img
            className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
            src={classData?.teacherImage || <CgProfile />}
            alt=""
          />
          <p className="font-semibold text-gray-500">{classData?.email}</p>
        </div>
      </div>

      {classData?.email === user?.email && (
        <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
          <div className="flex items-center  mt-4 mb-6 text-blue-600  w-64 px-2 py-2  ">
            <button className="text-5xl font-normal -mt-1">students</button>
          </div>
          <div className="border-b-2 border-blue-500"></div>
          <div>
            {classData?.studentList?.map((data) => (
              <Link
                to={`/assignmentItem/${data?._id}`}
                className="mt-4 card w-96 bg-neutral text-neutral-content"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{data?.email}</h2>
                  <p>We are using cookies for no reason.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
