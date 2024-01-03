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

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/classList")
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, []);

  console.log(classData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterCoder = classData.filter((data) => data?.classCode === code);
    console.log(filterCoder);

    const mapCode = filterCoder.map((data) => {
      if (data?.classCode === code) {
        navigate(`/classId/${data._id}`);
      }

      const classData = {
        teacherId: data._id,
        email: user.email,
        className: data.className,
        subject: data.subject,
        section: data.section,
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
          toast.success(`class is create successfully`);
          window.location.reload();
        });
    });
    console.log(mapCode);
  };

  return (
    <form onSubmit={handleSubmit} className=" flex items-center gap-2 mt-4">
      <input
        onChange={(e) => setCode(e.target.value)}
        type="text"
        className="px-20 py-6 border-2"
      />
      <PrimaryButton>Joint </PrimaryButton>
    </form>
  );
};

export default JoinClass;
