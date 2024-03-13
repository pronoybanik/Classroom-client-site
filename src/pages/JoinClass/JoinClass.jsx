import React, { useContext, useEffect, useState } from "react";
import PrimaryButton from "../../shared/PrimaryButton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../shared/AuthPovider";

const JoinClass = () => {
  const { user } = useContext(AuthContext);
  const [classData, setClassData] = useState([]);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  // const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://classroom-server-one.onrender.com/api/v1/classList")
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterCoder = classData.filter((data) => data?.classCode === code);

    const mapCode = filterCoder.map((data) => {
      if (data?.classCode === code) {
        navigate(`/classId/${data._id}`);
      }

      const classData = {
        teacherId: data._id,
        email: user.email,
        studentImage: user.photoURL,
        className: data.className,
        subject: data.subject,
        section: data.section,
      };
      fetch("https://classroom-server-one.onrender.com/api/v1/classList", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(classData),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(`class is create successfully`);
          window.location.reload();
        });
    });
  };

  return (
    <section className="lg:w-[500px] mx-auto mt-4">
      <div className="border-2 p-6  rounded">
        <p className="text-sm font-semibold text-gray-600 ml-2">
          You're currently signed in as
        </p>

        <div className="flex items-center gap-2 mt-4">
          <img
            className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
            src={user?.photoURL}
            alt=""
          />
          <div>
            <div className="text-sm font-medium">{user?.displayName}</div>
            <div className="text-sm font-medium ">{user?.email}</div>
          </div>
        </div>
      </div>

      <br />

      <div className="border-2 p-6  rounded">
        <p className="text-xl font-semibold text-black ml-2">Class code</p>
        <p className="text-sm font-semibold text-gray-600 ml-2">
          Ask your teacher for the class code, then enter it here.
        </p>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <label
                htmlFor="Username"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  id="Username"
                  className="peer py-4 px-6 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="Username"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-slate-50 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Class Code
                </span>
              </label>
            </div>

            <PrimaryButton>Submit </PrimaryButton>
          </form>
        </div>
      </div>

      {/* {error && toast.error(error)} */}

      <br />

      <p className="text-lg font-semibold mb-2">To sign in with a class code</p>
      <p className="text-sm font-medium mb-2">. Use an authorized account</p>
      <p className="text-sm font-medium mb-2">
        . Use a class code with 5-7 letters or numbers, and no spaces or symbols
      </p>
    </section>
  );
};

export default JoinClass;
