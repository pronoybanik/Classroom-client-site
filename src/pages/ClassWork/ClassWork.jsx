import React, { useContext, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/AuthPovider";
import ClassNavBar from "../../shared/ClassNavBar";

const ClassWork = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, [id]);

  // const [classListData, setClassListData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/v1/classList")
  //     .then((res) => res.json())
  //     .then((data) => setClassListData(data.data));
  // }, []);

  // const filterClassList = classListData.filter(
  //   ({ email }) => email === user.email
  // );
  // const assignmentData = filterClassList[0]?.classWork;

  return (
    <div>
      <ClassNavBar />
      <div className=" lg:w-[800px] md:w-[600px] w-full mx-auto mt-6">
        {classData?.email === user.email && (
          <div className="flex items-center mt-4 mb-12 bg-blue-800 w-64 px-2 py-2 text-white rounded-full">
            <div className="text-4xl">
              <GoPlus />
            </div>
            <Link to="/createAssignment">
              <button className="text-xl -mt-1">create Assignment</button>
            </Link>
          </div>
        )}
        <div className="border-b-2 "></div>

        <div>
          {classData?.classWork?.map((data) => (
            <Link
              to={`/assignmentItem/${data?._id}`}
              className="mt-4 card w-96 bg-neutral text-neutral-content"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{data?.title}</h2>
                <p>We are using cookies for no reason.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassWork;
