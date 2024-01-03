import React, { useContext, useEffect, useRef, useState } from "react";
import Model from "../../shared/Model";
import CreateClassModal from "../../shared/CreateClassModal";
import HomeCard from "../../component/HomeCard/HomeCard";
import { AuthContext } from "../../shared/AuthPovider";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const securityModule = useRef(null);
  const CrateClassModule = useRef(null);
  const [classData, setClassData] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  const handleSecurityModal = () => {
    securityModule.current.showModal();
  };
  const handleCloseModal = () => {
    securityModule.current.showModal();
  };

  const handleCrateClassModule = () => {
    CrateClassModule.current.showModal();
  };

  const handleCreateClassCloseModule = () => {
    CrateClassModule.current.close();
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/classList")
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, []);

  const filterUserClassData = classData.filter(
    (data) => data?.email === user?.email
  );

  return (
    <>
      {filterUserClassData?.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-2">
          {filterUserClassData?.map((data) => (
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
                <Link to="/joinClass">
                  <button className="bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700">
                    Join Class
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Model
            checkBox={checkBox}
            setCheckBox={setCheckBox}
            handleCrateClassModule={handleCrateClassModule}
            ref={securityModule}
            handleCloseModule={handleCloseModal}
          />
          <CreateClassModal
            handleCreateClassCloseModule={handleCreateClassCloseModule}
            ref={CrateClassModule}
          />
        </div>
      )}
    </>
  );
};

export default Home;
