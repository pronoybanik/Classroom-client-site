import React, { useContext, useState } from "react";
import { IoManOutline } from "react-icons/io5";
import CharList from "../ChatList/CharList";
import { VscSend } from "react-icons/vsc";
import toast from "react-hot-toast";
import { AuthContext } from "../../shared/AuthPovider";

const AssignmentItem = ({ data }) => {
  const { user } = useContext(AuthContext);
  const [assignmentMark, setAssignmentMark] = useState("");
  const [value, setValue] = useState("");

  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (data?._id) {
      fetch(
        `https://classroom-server-one.onrender.com/api/v1/assignment/${data?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ assignmentMark }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          toast.success("Mark is send");
          window.location.reload();
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
    const assignmentId = data?._id;

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

  return (
    <div className="bg-slate-200 p-6 rounded-md -ml-8">
      <div>
        <p className="py-2 font-semibold">Student Email: {data?.email}</p>
        <div className="flex items-center gap-2 ">
          {data?.homeWorkImage && (
            <a
              className="w-full p-2 flex  border  rounded"
              href={data?.homeWorkImage}
              target="_blank"
            >
              <img
                className="w-full h-40 object-cover"
                src={data?.homeWorkImage}
                alt=""
              />
            </a>
          )}
          {data?.homeWorkPDF && (
            <a
              className="w-full p-2 flex  border  rounded"
              href={`https://classroom-server-one.onrender.com/pdfFiles/${data?.homeWorkPDF}`}
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

        <div>
          <form
            onSubmit={handleSubmitTask}
            className="flex items-center justify-between my-4 gap-2"
            action=""
          >
            <label
              htmlFor="Mark"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="Mark"
                onChange={(e) => setAssignmentMark(e.target.value)}
                className="peer lg:w-80 py-2 border-4 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Mark"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Assignment Mark
              </span>
            </label>
            <button className="btn">send</button>
          </form>
          <p className="text-center my-4 font-bold">
            Mark: {data?.assignmentMark}
          </p>
        </div>

        <div>
          <div className=" rounded  px-4 py-4">
            {/* comment input box start */}
            <div className="flex items-center gap-2">
              <div className="text-2xl">
                <IoManOutline />
              </div>
              <div className="text-lg font-semibold">
                {data?.privateChatInfo?.length}-Teacher
              </div>
            </div>
            {data?.privateChatInfo?.slice(-6).map((data) => (
              <CharList id={data} />
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
                    placeholder="Sent Message..."
                    required
                    className="lg:w-80 ps-2 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
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
    </div>
  );
};

export default AssignmentItem;
