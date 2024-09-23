import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../shared/PrimaryButton";
import toast from "react-hot-toast"; // Ensure you have this imported

const StudentLists = ({ data }) => {
  const [present, setPresent] = useState(data?.present || 0);
  const [absent, setAbsent] = useState(data?.absent || 0);

  const handlePresent = (id) => {
    const updatedPresent = present + 1;
    setPresent(updatedPresent);

    if (id) {
      fetch(`https://classroom-server-one.onrender.com/api/v1/classList/present/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, present: updatedPresent }),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Present marked successfully");
          console.log("Updated data", data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  const handleAbsent = (id) => {
    const updatedAbsent = absent + 1;
    setAbsent(updatedAbsent);

    fetch(`https://classroom-server-one.onrender.com/api/v1/classList/absent/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, absent: updatedAbsent }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Absent marked successfully");
        console.log("Updated data", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div>
      <Link key={data?._id}>
        <div className="flex items-center p-2 rounded justify-between mb-2 border br bg-gray-100 hover:bg-gray-200">
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
              src={data?.studentImage}
              alt=""
            />
            <div className="text-sm font-medium">{data?.email}</div>
          </div>

          <div className="flex gap-2">
            <div onClick={() => handlePresent(data?._id)}>
              <PrimaryButton>Present</PrimaryButton>
              <p className="text-center">{present}</p>{" "}
              {/* Display updated present count */}
            </div>
            <br />
            <div onClick={() => handleAbsent(data?._id)}>
              <PrimaryButton secondary>Absent</PrimaryButton>
              <p className="text-center">{absent}</p>{" "}
              {/* Display updated absent count */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StudentLists;
