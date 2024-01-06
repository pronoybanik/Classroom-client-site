import React, { useEffect, useState } from "react";
import ClassNavBar from "../../shared/ClassNavBar";
import { useParams } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
import { IoManOutline } from "react-icons/io5";
import CharList from "../../component/ChatList/CharList";
import AssignmentItem from "../../component/AssignmentItem/AssignmentItem";

const StudentDetails = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data?.data));
  }, [id]);

  return (
    <section>
      <ClassNavBar id={id} />
      <div className="w-full p-4 mt-2 container mx-auto">
        <div className=" p-4 rounded  grid grid-cols-2 gap-2">
          {classData?.classWork?.map((data) => (
            <AssignmentItem data={data}></AssignmentItem>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentDetails;
