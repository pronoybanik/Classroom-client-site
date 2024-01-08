import React, { useContext, useEffect, useState } from "react";
import { IoManOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { AuthContext } from "../../shared/AuthPovider";

const StudentTaskBox = ({ handleImageFile, imageValue, id, setImageValue }) => {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [assignmentData, setAssignmentData] = useState({});

  const handleSubmitTask = () => {
    const updateData = {
      homeWorkImage: imageValue,
    };

    if (id) {
      fetch(`https://classroom-server-one.onrender.com/api/v1/assignment/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((response) => response.json())
        .then((data) => {
          setImageValue("");
          alert("Assignment Submit");
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = user.displayName;
    const image = user.photoURL;
    const chatValue = value;
    const assignmentId = id;

    const chatData = {
      name,
      image,
      chatValue,
      assignmentId,
    };

    fetch(`https://classroom-server-one.onrender.com/api/v1/chatInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "success") {
          setValue("");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    if (id) {
      fetch(`https://classroom-server-one.onrender.com/api/v1/assignment/${id}`)
        .then((res) => res.json())
        .then((data) => setAssignmentData(data?.data));
    }
  }, [id]);

  return (
    <div>
      <div className="h-full rounded-lg w-96">
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
                          accept="image/png, image/jpeg"
                          onChange={handleImageFile}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">upload Image</p>
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
            <button
              onClick={handleSubmitTask}
              className="block w-full rounded bg-black text-white p-2 text-sm font-medium transition hover:bg-slate-800"
            >
              submit
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {imageValue && (
            <div className="mt-3 flex items-center space-x-4 border px-2 py-2 bg-slate-100 rounded-lg">
              <img className="w-full h-12 object-cover" src={imageValue} />
            </div>
          )}
        </div>
        <br />

        <div className="bg-white shadow-lg rounded  px-4 py-4">
          {/* comment input box start */}
          <div className="flex items-center gap-2">
            <div className="text-2xl">
              <IoManOutline />
            </div>
            <div className="text-lg font-semibold">
              {assignmentData?.privateChatInfo?.length}-Private comments
            </div>
          </div>
          {assignmentData?.privateChatInfo?.slice(-6)?.map((data) => (
            <div key={data?._id} className="flex items-center gap-2 mt-4">
              <img
                className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
                src={data?.image}
                alt=""
              />
              <div>
                <p className="text-lg">{data?.name}</p>
                <p className="text-sm">{data?.chatValue}</p>
              </div>
            </div>
          ))}

          <div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 mt-4"
            >
              <div className="relative border-2 rounded ">
                <label htmlFor="Search" className="sr-only">
                  Search
                </label>

                <input
                  type="text"
                  id="Search"
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Search for..."
                  className="w-80 ps-2 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                />
              </div>
              <button className="cursor-pointer text-3xl">
                <VscSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTaskBox;
