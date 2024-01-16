import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgUrl from "../../utils/photo/Digital Marketing SEEK Cover Image.png";

const HomeCard = ({ handleDelete, classInfo }) => {
  const [teacherData, setTeacherData] = useState({});

  const {
    _id,
    className,
    section,
    imageURLs,
    classRole,
    subject,
    teacherId,
    teacherImage,
    teacherName,
  } = classInfo;

  useEffect(() => {
    if (teacherId) {
      fetch(`http://localhost:5000/api/v1/classList/${teacherId}`)
        .then((res) => res.json())
        .then((data) => setTeacherData(data.data));
    }
  }, [teacherId]);

  return (
    <Link
      to={`${
        classRole === "teacher" ? `/classId/${_id}` : `/classId/${teacherId}`
      }`}
    >
      <div className="max-w-md mt-4 p-4 shadow-md rounded-2xl space-y-8 hover:bg-slate-100">
        <div className="relative">
          <img
            className="w-full h-full rounded-2xl bg-gray-500"
            src={imgUrl}
            alt=""
          />
          <img
            className="w-[100px] h-[100px] absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-400 border border-white"
            src={teacherImage ? teacherImage : teacherData?.teacherImage}
            alt=""
          />
        </div>
        {/* profile name & role */}
        <div className="text-center space-y-1 ">
          <h1 className="text-2xl pt-2">
            {teacherName ? teacherName : teacherData?.teacherName}
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase pt-5">
            Role: {classRole}
          </p>
        </div>
        <div>
          <h3 className="mt-4  text-lg font-bold text-gray-900">{className}</h3>

          <p className="mt-1.5  text-sm font-semibold text-gray-700">
            section: {section}
          </p>
          {subject ? (
            <p className="mt-1.5  text-sm font-semibold text-gray-700">
              section: {subject}
            </p>
          ) : null}

          {/* {classRole === "teacher" ? ( */}
          <form className="mt-4">
            <button
              onClick={() => handleDelete(_id)}
              className="block w-full rounded bg-black text-white p-2 text-sm font-medium transition hover:scale-105"
            >
              leave Class
            </button>
          </form>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
