import React, { forwardRef } from "react";

const CreateClassModal = ({}, ref) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const className = from.className.value;
    const section = from.section.value;
    const subject = from.subject.value;
    console.log(className, section, subject);
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
            className="peer  h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute px-2 font-semibold start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            subject
          </span>
        </label>

        <div className="flex gap-2 items-end justify-end my-4">
          <button
            className="bg-gray-50 px-4 py-2 hover:bg-gray-200 text-gray-600 font-semibold rounded-md"
            onClick={() => handleCloseModule()}
          >
            Go Back
          </button>
          <button
            onClick={() => handleCrateClassModule()}
            className="bg-gray-50 px-4 py-2 hover:bg-gray-200 text-gray-600 font-semibold rounded-md"
          >
            Continue
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default forwardRef(CreateClassModal);
