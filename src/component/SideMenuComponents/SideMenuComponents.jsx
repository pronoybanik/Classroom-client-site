import React, { useContext, useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/AuthPovider";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { GiHedjetWhiteCrown } from "react-icons/gi";

const SideMenuComponents = () => {
  const { user, logout } = useContext(AuthContext);
  const [classData, setClassData] = useState([]);

  const handleLogout = () => {
    logout();
    localStorage.clear();
  };

  useEffect(() => {
    fetch("https://classroom-server-one.onrender.com/api/v1/classList")
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, []);

  const filerTeacher = classData?.filter(
    ({ email, classRole }) => email === user?.email && classRole === "teacher"
  );
  const filerStudent = classData?.filter(
    ({ email, classRole }) => email === user?.email && classRole === "student"
  );

  return (
    <div className="flex sticky top-0 z-50">
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

                <Link
                  to="/Calendar"
                  className="mt-4 group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                >
                  <SlCalender />

                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    Calendar
                  </span>
                </Link>
              </div>
            </div>
            {/* teacher */}
            {filerTeacher?.length ? (
              <div className="px-2 mt-3">
                <div className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700">
                  <LiaChalkboardTeacherSolid />
                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    Teacher
                  </span>
                </div>
              </div>
            ) : null}
            {/* class */}
            {filerTeacher?.map((data) => (
              <div key={data?._id} className="px-2 mt-4">
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
              <div className="px-2 mt-4">
                <div>
                  <div className="group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700">
                    <PiStudentBold />
                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      student
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {filerStudent?.map((data) => (
              <div key={data?.studentId} className="px-2 mt-2">
                <div>
                  <div
                    to={`/classId/${data?.studentId}`}
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

          {/* logout button */}
          <div
            onClick={handleLogout}
            className="sticky inset-x-0 bottom-0  mt-10  border-gray-50  bg-white p-2"
          >
            <form action="/logout">
              <button
                type="submit"
                className="text-blue-700 group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm  hover:bg-gray-50 hover:text-gray-700"
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
          {/* White Board icon */}
          <div className="sticky inset-x-0 bottom-0    border-gray-50  bg-white p-2">
            <form action="/whiteBoard">
              <button
                type="submit"
                className="text-blue-600 group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-lg  hover:bg-gray-50 hover:text-gray-700"
              >
                <GiHedjetWhiteCrown />

                <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                  White Board
                </span>
              </button>
            </form>
          </div>
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

            <li>
              <Link
                to="/calendar"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Calendar
              </Link>
            </li>

            {filerTeacher?.length ? <p className="border-b pt-2"></p> : null}
            {filerTeacher?.length ? (
              <li className="mb-2">
                <div className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  Teaching
                </div>
              </li>
            ) : null}

            {filerTeacher?.map((data) => (
              <div key={data?._id} className="pt-1">
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

            {filerTeacher?.length ? (
              <p className="border-b pt-2 "></p>
            ) : (
              <p className="pt-2"></p>
            )}

            {filerStudent?.length ? (
              <li className="mb-2 mt-2">
                <div className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  student
                </div>
              </li>
            ) : null}

            {filerStudent?.map((data) => (
              <div className="pt-1" key={data?._id}>
                <li>
                  <Link
                    to={`/classId/${data?.teacherId}`}
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {data?.className}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
          <p className="border-t mt-4 border-black"></p>
          <div className="mt-4" onClick={handleLogout}>
            <p className="block rounded-lg pt-2 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              Log out
            </p>
          </div>
          <Link to="/whiteboard">
            <div className="mt-2">
              <p className="block rounded-lg pt-2 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                White Board
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideMenuComponents;
