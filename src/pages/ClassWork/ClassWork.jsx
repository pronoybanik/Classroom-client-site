import React, { useContext, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/AuthPovider";
import ClassNavBar from "../../shared/ClassNavBar";
import { GrNotes } from "react-icons/gr";
import homeImage from "../../utils/photo/Blue Minimalist University Logo.png";

const ClassWork = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`https://classroom-server-one.onrender.com/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, [id]);

  const handleDelete = (id) => {
    fetch(`https://classroom-server-one.onrender.com/api/v1/assignment/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Assignment Delete successfully");
          window.location.reload();
        }
      });
  };

  return (
    <div>
      <ClassNavBar id={id} />
      <div className="text-center font-bold uppercase text-3xl  py-2 border-b border-black w-36 mx-auto">
        {classData?.className}
      </div>

      <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-10">
        {classData?.email === user.email && (
          <div className="flex items-center gap-2 mt-4 mb-6  bg-blue-800 w-72 px-6 py-2 text-white rounded-full">
            <div className="text-4xl">
              <GoPlus />
            </div>
            <Link to={`/createAssignment/${id}`}>
              <button className="text-lg -mt-1 uppercase">
                Create Assignment
              </button>
            </Link>
          </div>
        )}

        {classData?.classWork?.length === 0 ? (
          <div>
            <div className="border-b border-black"></div>
            <div className="flex items-center justify-center -mt-10">
              <img src={homeImage} alt="" />
            </div>
          </div>
        ) : null}

        <div className="mt-10 lg:w-full w-10/12 ">
          {classData?.classWork?.map((data) => (
            <div key={data?._id}>
              <div className="flex items-center p-2 rounded justify-between mb-2 border br bg-gray-100 hover:bg-gray-200 ">
                <Link
                  to={`/assignmentItem/${data?._id}`}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center  text-2xl bg-slate-600 text-white  pl-3 h-12 w-12 rounded-full">
                    <GrNotes />
                  </div>
                  <div className="text-sm font-medium">
                    {classData?.teacherName} <br />
                    post a new assignment:- {data?.title}
                  </div>
                </Link>
                {/* delete button */}
                <div>
                  {classData?.email === user?.email && (
                    <button
                      onClick={() => handleDelete(data?._id)}
                      className="block w-full rounded bg-black text-white p-2 text-sm font-medium transition hover:scale-105"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassWork;
