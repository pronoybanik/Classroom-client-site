import React, { useEffect, useRef, useState } from "react";
import Model from "../../shared/Model";
import CreateClassModal from "../../shared/CreateClassModal";
import HomeCard from "../../component/HomeCard/HomeCard";

const Home = () => {
  const securityModule = useRef(null);
  const CrateClassModule = useRef(null);
  const [classData, setClassData] = useState([]);

  const handleSecurityModal = () => {
    securityModule.current.showModal();
  };
  const handleCloseModal = () => {
    securityModule.current.showModal();
  };

  const handleCrateClassModule = () => {
    CrateClassModule.current.showModal();
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/classList")
      .then((res) => res.json())
      .then((data) => setClassData(data));
  }, []);

  

  return (
    <>
      {classData?.data?.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-2">
          {classData?.data?.map((data) => (
            <HomeCard key={data?._id} classInfo={data} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div>
            <p className="font-semibold text-center text-gray-600 gap-2 ">
              All of Your Classes Have Been Archived
            </p>
            <div>
              <div className="flex gap-4 mt-2 ">
                <button
                  onClick={() => handleSecurityModal()}
                  className="text-blue-600 font-semibold  hover:bg-blue-200 bg-blue-50 rounded-md px-6 py-2"
                >
                  Create Class
                </button>
                <button className="bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700">
                  Join Class
                </button>
              </div>
            </div>
          </div>
          <Model
            handleCrateClassModule={handleCrateClassModule}
            ref={securityModule}
            handleCloseModule={handleCloseModal}
          />
          <CreateClassModal ref={CrateClassModule} />
        </div>
      )}
    </>
  );
};

export default Home;
