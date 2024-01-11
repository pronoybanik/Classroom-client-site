import React from "react";
import { Link } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";

const HomeCard = ({ handleDelete, classInfo }) => {
  const { _id, className, section, imageURLs, classRole, subject, teacherId } =
    classInfo;

  return (
    <div>
      <Link
        to={`${
          classRole === "teacher" ? `/classId/${_id}` : `/classId/${teacherId}`
        }`}
        className="group relative block overflow-hidden h-96"
      >
        {/* <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <BsThreeDotsVertical />
        </button> */}

        <div className="h-40 w-full">
          <img
            src={
              imageURLs || "https://gstatic.com/classroom/themes/img_code.jpg"
            }
            alt=""
            className=" object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </div>

        <div className="relative border border-gray-100 bg-white p-6">
          <span className="uppercase whitespace-nowrap bg-black text-white rounded px-3 py-1.5 text-xs font-medium">
            {classRole}
          </span>

          <h3 className="mt-4  text-lg font-bold text-gray-900">{className}</h3>

          <p className="mt-1.5  text-sm font-semibold text-gray-700">
            section: {section}
          </p>
          {subject ? (
            <p className="mt-1.5  text-sm font-semibold text-gray-700">
              section: {subject}
            </p>
          ) : null}

          {/* {classRole === "teacher" ? (
            <form className="mt-4">
              <button
                onClick={() => handleDelete(_id)}
                className="block w-full rounded bg-black text-white p-2 text-sm font-medium transition hover:scale-105"
              >
                Delete
              </button>
            </form>
          ) : null} */}
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
