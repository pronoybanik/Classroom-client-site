import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgUrl from "../../utils/photo/Digital Marketing SEEK Cover Image.png";

const HomeCard = ({ handleDelete, classInfo }) => {
  const [teacherData, setTeacherData] = useState({});

  const {
    _id,
    className,
    section,
    classRole,
    subject,
    teacherId,
    teacherImage,
    teacherName,
  } = classInfo;

  useEffect(() => {
    if (teacherId) {
      fetch(
        `https://classroom-server-one.onrender.com/api/v1/classList/${teacherId}`
      )
        .then((res) => res.json())
        .then((data) => setTeacherData(data.data));
    }
  }, [teacherId]);

  return (
    <div className="max-w-md mt-4 p-4 shadow-md rounded-2xl space-y-8 hover:bg-slate-100">
      <div>
        <Link
          to={`${classRole === "teacher"
            ? `/classId/${_id}`
            : `/classId/${teacherId}`
            }`}
        >
          <div className="relative">
            <img
              className="w-full h-full rounded-2xl bg-gray-500"
              src={imgUrl}
              alt=""
            />
            <div className="flex items-center gap-6">
              <img
                className="w-[100px] h-[100px]  mt-4 rounded-sm bg-gray-400 border border-white"
                src={teacherImage ? teacherImage : teacherData?.teacherImage}
                alt=""
              />
              {/* profile name & role */}
              <div className="text-center space-y-1">
                <h1 className="text-2xl pt-2 font-semibold">
                  {teacherName ? teacherName : teacherData?.teacherName}
                </h1>
                <p className="text-gray-500 text-sm font-bold uppercase pt-2">
                  Role: {classRole}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mt-4  text-lg font-bold text-gray-900">
              {className}
            </h3>

            <p className="mt-1.5  text-sm font-semibold text-gray-700">
              section: {section}
            </p>

            <p className="mt-1.5  text-sm font-semibold text-gray-700">
              subject: {subject}
            </p>
          </div>
        </Link>
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleDelete(_id)}
          className="block w-full rounded bg-black text-white p-2 text-sm font-medium transition hover:scale-105"
        >
          leave Class
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
