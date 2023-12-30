import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const HomeCard = ({ classInfo }) => {
  const { _id, className, section } = classInfo;
  console.log(classInfo);

  return (
    <Link to="" className="group relative block overflow-hidden">
      <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
        <BsThreeDotsVertical />
      </button>

      <div className="h-40 w-full">
        <img
          src="https://gstatic.com/classroom/themes/img_code.jpg"
          alt=""
          className=" object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      </div>

      <div className="relative border border-gray-100 bg-white p-6">
        <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
          New
        </span>

        <h3 className="mt-4  text-lg font-medium text-gray-900">{className}</h3>

        <p className="mt-1.5  text-sm font-semibold text-gray-700">
          section: {section}
        </p>

        <form className="mt-4">
          <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
            Add to Cart
          </button>
        </form>
      </div>
    </Link>
  );
};

export default HomeCard;
