import React, { useContext, useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/AuthPovider";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";

const SideMenuComponents = () => {
  const { user, logout } = useContext(AuthContext);
  const [classData, setClassData] = useState([]);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/classList")
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, []);

  const filerTeacher = classData.filter(
    ({ email, classRole }) => email === user.email && classRole === "teacher"
  );
  const filerStudent = classData.filter(
    ({ email, classRole }) => email === user.email && classRole === "student"
  );

  return (
    <div className="flex">
      <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
        <div>
          <div className="border-t border-gray-100">
            {/* home */}
            <div className="px-2 ">
              <div className="py-4 ">
                <Link
                  to="/home"
                  className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                >
                  <IoHomeOutline />

                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    home
                  </span>
                </Link>
              </div>
            </div>
            {/* teacher */}
            {filerTeacher?.length ? (
              <div className="px-2 mt-3">
                <div>
                  <div
                    // to="/home"
                    className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                  >
                    <LiaChalkboardTeacherSolid />

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Teacher
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            {/* class */}
            {filerTeacher?.map((data) => (
              <div className="px-2 mt-4">
                <div>
                  <div
                    to={`/classId/${data?._id}`}
                    className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                  >
                    <SiGoogleclassroom />

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      {data?.className}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* students */}
            {filerStudent?.length ? (
              <div className="px-2 mt-6">
                <div>
                  <div
                    // to="/home"
                    className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                  >
                    <PiStudentBold />

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      student
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {filerStudent?.map((data) => (
              <div className="px-2 mt-4">
                <div>
                  <div
                    to={`/classId/${data?._id}`}
                    className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                  >
                    <SiGoogleclassroom />

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      {data?.className}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          onClick={handleLogout}
          className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2"
        >
          <form action="/logout">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Logout
              </span>
            </button>
          </form>
        </div>
      </div>
      {/* part 2 start */}
      <div className="flex   h-screen flex-1 flex-col justify-between border-e bg-white">
        <div className="px-4">
          <ul className="mt-4 space-y-1">
            <li>
              <Link
                to="/home"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Home
              </Link>
            </li>

            <p className="border-b pt-2"></p>
            {filerTeacher?.length ? (
              <li className="mb-2">
                <Link className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  Teaching
                </Link>
              </li>
            ) : null}

            {filerTeacher.map((data) => (
              <div className="pt-1" key={data?._id}>
                <li>
                  <Link
                    to={`/classId/${data?._id}`}
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {data?.className}
                  </Link>
                </li>
              </div>
            ))}
            <p className="border-b pt-2"></p>
            {filerStudent?.length ? (
              <li className="mb-2 mt-2">
                <Link className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  student
                </Link>
              </li>
            ) : null}
            {filerStudent.map((data) => (
              <div className="pt-1" key={data?._id}>
                <li>
                  <Link
                    to={`/classId/${data?._id}`}
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {data?.className}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenuComponents;
