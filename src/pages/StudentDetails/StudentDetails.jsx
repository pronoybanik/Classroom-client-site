import React, { useEffect, useState } from "react";
import ClassNavBar from "../../shared/ClassNavBar";
import { useParams } from "react-router-dom";
import AssignmentItem from "../../component/AssignmentItem/AssignmentItem";

const StudentDetails = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`https://classroom-server-one.onrender.com/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data?.data));
  }, [id]);

  return (
    <section>
      <ClassNavBar id={id} />
      <div className="w-full p-4 mt-2 container mx-auto">
        {classData?.classWork?.length > 0 ? (
          <div className=" p-4 rounded  grid lg:grid-cols-2 gap-2">
            {classData?.classWork?.map((data) => (
              <AssignmentItem data={data}></AssignmentItem>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <div
              role="alert"
              className="rounded border-s-4 border-red-500 w-1/2 bg-red-50 p-4"
            >
              <strong className="block text-2xl font-medium text-red-800">
                No Task Submit
              </strong>

              <p className="mt-2 text-lg text-red-700">
                Students are still preparing for the exam wait
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentDetails;
