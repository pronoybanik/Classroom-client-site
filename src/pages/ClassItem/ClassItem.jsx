import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../component/ClassCoderCard/ClassCodeCard";
import AnnounceBox from "../../component/AnnounceBox/AnnounceBox";
import ClassNavBar from "../../shared/ClassNavBar";
import { GrNotes } from "react-icons/gr";
import { PiDotsThree } from "react-icons/pi";
import image from "../../utils/photo/Digital Marketing SEEK Cover Image.png";

const ClassItem = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`https://classroom-server-one.onrender.com/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, [id]);

  return (
    <section className="-ml-6">
      <ClassNavBar id={id} />
      <div className="text-center font-bold uppercase text-3xl  py-2 border-b border-black w-36 mx-auto">
        {classData?.className}
      </div>

      <div className="mt-4 container mx-auto lg:w-[1000px] md:w-[600px] w-96 rounded">
        {/* Banner section start */}
        <div className="bg-white ">
          <section className="relative h-[200px] bg-[url(https://i.ibb.co/qrdLQnc/Blue-White-Modern-Business-SEEK-Cover-Image.png)] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/50  sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

            <div className="flex  items-center ml-10   h-full">
              <div className="relative mb-2 ml-24 text-center">
                <p className="text-white mb-2 uppercase lg:text-4xl md:text-3xl text-2xl font-semibold mt-4 max-w-sm sm:text-xl/relaxed">
                  {classData?.className}
                </p>
                <p className="text-white mb-2 font-sans lg:text-2xl md:text-2xl text-xl ">
                  Section: {classData?.section}
                </p>
                <p className="text-white font-sans lg:text-2xl md:text-2xl text-xl ">
                  Subject: {classData?.subject}
                </p>
              </div>
            </div>
          </section>
        </div>
        {/* Banner section End */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8  mt-4">
          <div className="h-32 rounded-lg">
            <Card classData={classData} />
          </div>
          <div className="h-32 rounded-lg lg:col-span-2 lg:mt-2">
            <AnnounceBox classData={classData} />
            {classData?.groupChat?.slice(-5).map((data) => (
              <div
                key={data?._id}
                className="flex items-center  gap-2 mt-4 bg-slate-200 p-1 rounded-sm"
              >
                <div className="mt-2 ">
                  <img
                    className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
                    src={data?.image || <CgProfile />}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold ">{data?.name}</p>
                  <p className="text-sm font-medium">{data?.chatValue}</p>
                </div>
              </div>
            ))}

            {/* assignment Data List start */}
            <div className="mt-4">
              {classData?.classWork?.map((data) => (
                <Link key={data?._id} to={`/assignmentItem/${data?._id}`}>
                  <div className="flex items-center p-2 rounded justify-between mb-2 border br bg-gray-100 hover:bg-gray-200 ">
                    <div className="flex  items-center gap-2">
                      <div className="flex items-center  text-2xl bg-slate-600 text-white  pl-3 h-12 w-12 rounded-full">
                        <GrNotes />
                      </div>
                      <div className="text-sm font-medium">
                        {classData?.teacherName} <br />
                        post a new assignment:- {data?.title}
                      </div>
                    </div>
                    <PiDotsThree style={{ fontSize: "40px" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassItem;
