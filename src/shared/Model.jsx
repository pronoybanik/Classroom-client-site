import React, { forwardRef, useRef } from "react";

const Model = (
  { handleCloseModule, handleCrateClassModule, setCheckBox, checkBox },
  ref
) => {
  
  return (
    <dialog className="lg:w-2/6  bg-white rounded-lg py-2 px-4" ref={ref}>
      <div>
        <p className="text-lg font-semibold mb-4">
          Using Classroom at a school with students?
        </p>
        <p className="my-4">
          If so, your school must sign up for a{" "}
          <h className="text-blue-500 hover:border-b-2 hover:border-blue-400 gap-2 cursor-pointer">
            Google Workspace for
          </h>{" "}
          Education account before you can use Classroom.{" "}
          <h className="text-blue-500 hover:border-b-2 hover:border-blue-400 gap-2 cursor-pointer">
            {" "}
            Learn More
          </h>
        </p>
        <p className="my-4">
          Google Workspace for Education lets schools decide which Google
          services their students can use, and provides additional{" "}
          <h className="text-blue-500 hover:border-b-2 hover:border-blue-400 gap-2 cursor-pointer">
            {" "}
            privacy and security{" "}
          </h>
          protections that are important in a school setting. Students cannot
          use Google Classroom at a school with personal accounts.
        </p>
        <div className="flex gap-0 bg-slate-100 px-6 py-4 rounded-lg">
          <input
            onChange={() => setCheckBox((pre) => !pre)}
            type="checkbox"
            className="border mr-2 "
          />

          <p>
            I've read and understand the above notice, and I'm not using
            Classroom at a school with students
          </p>
        </div>
      </div>
      <form className="flex gap-2 items-end justify-end my-4" method="dialog">
        <button
          className="bg-gray-50 px-4 py-2 hover:bg-gray-200 text-gray-600 font-semibold rounded-md"
          onClick={() => handleCloseModule()}
        >
          Go Back
        </button>
        <button
          disabled={!checkBox}
          onClick={() => handleCrateClassModule()}
          className={
            checkBox
              ? "bg-blue-500 px-4 py-2 hover:bg-blue-600 text-white font-semibold rounded-md"
              : "bg-gray-300 px-4 py-2 hover:bg-gray-400 text-gray-600 font-semibold rounded-md"
          }
        >
          Continue
        </button>
      </form>
    </dialog>
  );
};

export default forwardRef(Model);
