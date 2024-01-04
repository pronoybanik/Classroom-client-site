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

  return (
    <div>
      <ClassNavBar  id={id} />
      <div className="text-center font-bold uppercase text-3xl  py-2 border-b border-black w-36 mx-auto">
        {classData?.className}
      </div>

      {/* Teacher list start */}
      <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
        <div className="flex items-center mb-2 text-black  w-64 px-2 py-2  ">
          <button className="text-4xl font-normal">Teachers</button>
        </div>
        <div className="border-b border-black mb-3" />
        <div className="flex items-center gap-4 ">
          <img
            className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
            src={classData?.teacherImage || <CgProfile />}
            alt=""
          />
          <p className="font-semibold text-gray-700">{classData?.email}</p>
        </div>
      </div>

      {/* student list start */}
      {classData?.email === user?.email && (
        <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
          <div className="flex items-center  mt-4 mb-2 text-black  w-64 px-2 py-2  ">
            <button className="text-4xl font-normal ">Students</button>
          </div>
          <div className="border-b border-black"></div>

          {classData?.studentList.length ? (
            <div className="flex  justify-end text-md text-gray-600 font-bold mt-2 ">
              {classData?.studentList?.length} Student
            </div>
          ) : null}

          <div className="mt-4">
            {classData?.studentList?.map((data) => (
              <Link key={data?._id} >
                <div className="flex items-center p-2 rounded justify-between mb-2 border br bg-gray-100 hover:bg-gray-200 ">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
                      src={data?.studentImage}
                      alt=""
                    />
                    <div className="text-sm font-medium">{data?.email}</div>
                  </div>
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
