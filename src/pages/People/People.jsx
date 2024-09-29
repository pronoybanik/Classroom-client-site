import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/AuthPovider";
import { CgProfile } from "react-icons/cg";
import ClassNavBar from "../../shared/ClassNavBar";
import { Link, useParams } from "react-router-dom";
import PrimaryButton from "../../shared/PrimaryButton";
import toast from "react-hot-toast";
import StudentLists from "../../component/studentLists/StudentLists";

const People = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [classData, setClassData] = useState({});
  const [currentDate, setCurrentDate] = useState("");


  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(); // Format the date
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    fetch(`https://classroom-server-one.onrender.com/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, [id]);

 

  return (
    <div>
      <ClassNavBar id={id} />
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

        {classData?.email !== user?.email && (
          <Link className="mt-4" to="/payment">
            <PrimaryButton full>Payment</PrimaryButton>
          </Link>
        )}
      </div>

      {/* student list start */}
      {classData?.email === user?.email && (
        <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
          <div className="flex items-center  mt-4 mb-2 text-black  w-64 px-2 py-2  ">
            <button className="text-4xl font-normal ">Students</button>
          </div>
          <div className="border-b border-black"></div>

          <div>
            {classData?.studentList.length ? (
              <div className="flex  justify-end text-md text-gray-600 font-bold mt-2 ">
                Date: {currentDate} - {classData?.studentList?.length} Student
              </div>
            ) : null}
          </div>

          <div className="mt-4">
            {classData?.studentList?.map((data) => (
              <StudentLists data={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
