import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { IoManOutline } from "react-icons/io5";
import { AuthContext } from "../../shared/AuthPovider";
import { VscSend } from "react-icons/vsc";
import ClassNavBar from "../../shared/ClassNavBar";

const AssignmentItem = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [assignment, setAssignmentData] = useState({});
  const [classList, setClassList] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/assignment/${id}`)
      .then((res) => res.json())
      .then((data) => setAssignmentData(data?.data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/classList/${assignment?.classListId}`)
      .then((res) => res.json())
      .then((data) => setClassList(data?.data));
  }, [assignment?.classListId]);
  console.log(classList);

  return (
    <section>
      <ClassNavBar id={assignment?.classListId} />
      <div className="w-[1200px] mx-auto mt-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4 ">
          <div className="h-32 rounded-lg  lg:col-span-2  p-2">
            {/* Assignment details data */}
            <div className="flex gap-2">
              <div className="flex items-center  text-2xl bg-slate-600 text-white  pl-3 h-12 w-12 rounded-full">
                <GrNotes />
              </div>
              <div className=" ">
                <div>
                  <div className="flex items-center justify-between ">
                    <p className="text-3xl  font-medium uppercase">
                      {assignment?.title}
                    </p>

                    {/* only teacher can see that button */}
                    {classList?.email === user?.email ? (
                      <button className="btn btn-sm btn-error text-white">
                        Delete
                      </button>
                    ) : null}
                  </div>

                  <p className="text-sm  mt-1 font-bold">
                    {assignment?.name}
                    <br /> Date: {assignment?.currentDate}
                  </p>
                  <p className="text-sm  mt-1 font-medium">100 Point</p>
                  <p className="border-b mt-2 w-[700px] border-black "></p>
                </div>

                <div className="mt-1 text-md mb-2 font-medium">
                  {assignment?.instructions}
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4 ">
                    {assignment?.imageValue && (
                      <a
                        className="w-full p-2 flex  border  rounded"
                        href={assignment?.imageValue}
                        target="_blank"
                      >
                        <img
                          className="w-full h-40 object-cover"
                          src={assignment?.imageValue}
                          alt=""
                        />
                      </a>
                    )}

                    {assignment?.pdfValue && (
                      <a
                        className="w-full p-2 flex  border  rounded"
                        href={`http://localhost:5000/pdfFiles/${assignment?.pdfValue}`}
                        target="_blank"
                      >
                        <img
                          className="w-full h-40 object-contain"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt=""
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* only student can see that past  */}
          {classList?.email !== user.email ? (
            <div className="h-32 rounded-lg w-96">
              {/* Assignment submit  box start */}
              <div className="bg-white shadow-lg rounded  h-48 py-4 px-6">
                <h1 className="text-2xl ml-1 font-semibold">Your Work</h1>
                <br />
                <form action="">
                  <div>
                    <div className="dropdown">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-outline w-80 ml-1"
                      >
                        Click
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-96"
                      >
                        <li>
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>upload file</span>
                              <input
                                id="file-upload"
                                name="fileUpload"
                                type="file"
                                required
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                        </li>
                        <li>
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>upload file</span>
                              <input
                                id="file-upload"
                                name="fileUpload"
                                type="file"
                                required
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <br />
                  <button className="block w-full rounded bg-black text-white p-2 text-sm font-medium transition hover:bg-slate-800">
                    submit
                  </button>
                </form>
              </div>
              <br />
              <div className="bg-white shadow-lg rounded  h-full px-4 py-4">
                {/* comment input box start */}
                <div className="flex items-center gap-2">
                  <div className="text-2xl">
                    <IoManOutline />
                  </div>
                  <div className="text-lg font-semibold">Private comments</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="relative border-2 rounded ">
                      <label htmlFor="Search" className="sr-only">
                        Search
                      </label>

                      <input
                        type="text"
                        id="Search"
                        placeholder="Search for..."
                        className="w-80 ps-2 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="text-3xl">
                      <VscSend />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AssignmentItem;
