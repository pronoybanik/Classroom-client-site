import React, { useEffect, useState } from "react";
import ClassNavBar from "../../shared/ClassNavBar";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/classList/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data.data));
  }, [id]);

  return (
    <section>
      <ClassNavBar id={id} />
      <div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Date of Birth
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Salary
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {classData?.studentList?.map((data) => (
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {data?.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    24/05/1995
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    Web Developer
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $120,000
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default StudentDetails;
