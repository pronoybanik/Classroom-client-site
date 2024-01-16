import React, { forwardRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthPovider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateClassModal = ({ handleCreateClassCloseModule }, ref) => {
  const { user } = useContext(AuthContext);
  const [classCode, setClassCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const randomWord = generateRandomWord();
    const combinedString = `${randomNumber}${randomWord}`;
    setClassCode(combinedString);
  }, []);

  const generateRandomWord = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let word = "";
    for (let i = 0; i < 5; i++) {
      word += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return word;
  };

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}.${date}.${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const className = from.className.value;
    const section = from.section.value;
    const subject = from.subject.value;

    const classData = {
      className,
      section,
      subject,
      classCode: classCode,
      email: user?.email,
      teacherName: user?.displayName,
      teacherImage: user?.photoURL,
      classRole: "teacher",
      currentDate: getDate(),
    };

    fetch("http://localhost:5000/api/v1/classList", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(classData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          alert(`class is create successfully`);
          navigate("/home");
          window.location.reload();
        }
      });
  };

  return (
    <dialog className="w-2/6 bg-white rounded-lg py-2 px-4" ref={ref}>
      <p className="text-xl font-semibold mb-4">Create classroom</p>
      <form onSubmit={handleSubmit} method="dialog">
        <label
          htmlFor="className"
          className="relative rounded-md mb-4 bg-gray-200 px-2  block overflow-hidden border-b border-gray-100 bg-transparent pt-3 focus-within:border-blue-600"
        >
          <input
            type="text"
            id="className"
            name="className"
            placeholder="className"
            required
            className="peer  h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute px-2 font-semibold start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            Class Name (required)
          </span>
        </label>

        <label
          htmlFor="section"
          className="relative mb-4 rounded-md bg-gray-200 px-2  block overflow-hidden border-b border-gray-100 bg-transparent pt-3 focus-within:border-blue-600"
        >
          <input
            type="text"
            id="section"
            name="section"
            required
            placeholder="section"
            className="peer  h-8  w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute px-2 font-semibold start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            section
          </span>
        </label>

        <label
          htmlFor="subject"
          className="relative rounded-md mb-4  bg-gray-200 px-2  block overflow-hidden border-b border-gray-100 bg-transparent pt-3 focus-within:border-blue-600"
        >
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="subject"
            required
            className="peer  h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute px-2 font-semibold start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            subject
          </span>
        </label>

        <div className="flex gap-2 items-end justify-end my-4">
          <button
            className="bg-gray-50 px-4 py-2 hover:bg-gray-200 text-gray-600 font-semibold rounded-md"
            onClick={() => handleCreateClassCloseModule()}
          >
            cancel
          </button>
          <button
            // onClick={() => handleCreateClassCloseModule()}
            className="bg-gray-50 px-4 py-2 hover:bg-gray-200 text-gray-600 font-semibold rounded-md"
          >
            create
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default forwardRef(CreateClassModal);
