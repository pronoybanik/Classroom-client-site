import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Card from "../../component/ClassCoderCard/ClassCodeCard";
import AnnounceBox from "../../component/AnnounceBox/AnnounceBox";
import ClassNavBar from "../../shared/ClassNavBar";

const ClassItem = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, []);

  return (
    <section>
      <ClassNavBar id={id} />

      <div className="mt-4 container mx-auto lg:w-[1000px] md:w-[600px] w-96">
        <div className="relative">
          <div className="absolute lg:text-2xl md:text-xl text-sm ml-2">
            <p className="text-white ">{classData?.className}</p>
            <p className="text-white ">section: {classData?.section}</p>
            <p className="text-white ">subject: {classData?.subject}</p>
          </div>
          <img
            src={
              classData?.imageURLs ||
              "https://gstatic.com/classroom/themes/img_code.jpg"
            }
            alt=""
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8  mt-4">
          <div className="h-32 rounded-lg  ">
            <Card classCode={classData?.classCode} />
          </div>
          <div className="h-32 rounded-lg  lg:col-span-2 lg:mt-2">
            <AnnounceBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassItem;
