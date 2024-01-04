import React, { useContext, useEffect, useRef, useState } from "react";
import Model from "../../shared/Model";
import CreateClassModal from "../../shared/CreateClassModal";
import HomeCard from "../../component/HomeCard/HomeCard";
import { AuthContext } from "../../shared/AuthPovider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../shared/Loading";
import homeImage from "../../utils/photo/Blue Minimalist University Logo.png";

const Home = () => {
  const { user } = useContext(AuthContext);
  const securityModule = useRef(null);
  const CrateClassModule = useRef(null);
  const [classData, setClassData] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    setIsLoading(true);
    fetch("http://localhost:5000/api/v1/classList")
      .then((res) => res.json())
      .then((data) => {
        setClassData(data.data);
        setIsLoading(false);
      });
  }, []);

  const filterUserClassData = classData.filter(
    (data) => data?.email === user?.email
  );

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/v1/classList/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("Class is Delete successfully");
          navigate("/home");
          window.location.reload();
        }
      });
  };

  return (
    <section className="container mx-auto">
      {filterUserClassData?.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-2">
          {isLoading ? (
            <Loading />
          ) : (
            filterUserClassData?.map((data) => (
              <HomeCard
                handleDelete={handleDelete}
                key={data?._id}
                classInfo={data}
              />
            ))
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center">
            <img src={homeImage} alt="" />
          </div>
          <div className="flex items-center justify-center h-full -mt-24 ">
            <div>
              <p className="font-semibold font-serif text-center text-2xl text-gray-600 gap-2 ">
                All of Your Classes Have Been Archived
              </p>
              <div>
                <div className="flex gap-4 mt-2 ml-20 font-serif">
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
        </div>
      )}
    </section>
  );
};

export default Home;
