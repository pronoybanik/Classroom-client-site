import React, { useContext, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/AuthPovider";
import ClassNavBar from "../../shared/ClassNavBar";
import { PiDotsThree } from "react-icons/pi";
import { GrNotes } from "react-icons/gr";

const ClassWork = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, [id]);

  return (
    <div>
      <ClassNavBar id={id} />
      <div className="text-center font-bold uppercase text-3xl  py-2 border-b border-black w-36 mx-auto">
        {classData?.className}
      </div>

      <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-10">
        {classData?.email === user.email && (
          <div className="flex items-center gap-2 mt-4 mb-6  bg-blue-800 w-80 px-8 py-4 text-white rounded-full">
            <div className="text-4xl">
              <GoPlus />
            </div>
            <Link to={`/createAssignment/${id}`}>
              <button className="text-xl -mt-1 uppercase">Create Assignment</button>
            </Link>
          </div>
        )}
        <div className="border-b border-black"></div>

        <div className="mt-4">
          {classData?.classWork?.map((data) => (
            <Link key={data?._id} to={`/assignmentItem/${data?._id}`}>
              <div className="flex items-center p-2 rounded justify-between mb-2 border br bg-gray-100 hover:bg-gray-200 ">
                <div className="flex  items-center gap-2">
                  <div className="flex items-center  text-2xl bg-slate-600 text-white  pl-3 h-12 w-12 rounded-full">
                    <GrNotes />
                  </div>
                  <div className="text-sm font-medium">
                    {classData?.teacherName} <br />
                    post a new assignment {classData?.className}
                  </div>
                </div>
                <PiDotsThree style={{ fontSize: "40px" }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassWork;
