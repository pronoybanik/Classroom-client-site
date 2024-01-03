import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrNotes } from "react-icons/gr";

const AssignmentItem = () => {
  const { id } = useParams();
  const [assignment, setAssignmentData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/assignment/${id}`)
      .then((res) => res.json())
      .then((data) => setAssignmentData(data.data));
  }, [id]);

  console.log(assignment);

  return (
    <section className="flex gap-4 w-[1000px] mx-auto mt-4">
      <div className="flex items-center  text-2xl bg-slate-600 text-white  pl-3 h-12 w-12 rounded-full">
        <GrNotes />
      </div>
      <div className=" ">
        <div>
          <p className="text-3xl  font-medium uppercase">{assignment?.title}</p>
          <p className="text-sm  mt-1 font-medium">
            {assignment?.name} . {assignment?.currentDate}
          </p>
          <p className="text-sm  mt-1 font-medium">100 Point</p>
          <p className="border-b-2 mt-2 w-[600px] border-black "></p>
        </div>

        <div className="mt-2 text-lg mb-2">{assignment?.instructions}</div>
        <p> pdf section </p>
      </div>
    </section>
  );
};

export default AssignmentItem;
