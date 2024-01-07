import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllUserInfo = () => {
  const [user, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/userInfo")
      .then((res) => res.json())
      .then((data) => setUserData(data.data));
  }, []);

  const handleUserDelate = (id) => {
    fetch(`http://localhost:5000/api/v1/userInfo/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Deleted successfully", {
          position: "top-center",
          theme: "light",
        });
        const userData = user.filter((data) => data._id !== id);
        setUserData(userData);
      });
  };

  return (
    <section className="mt-4 container mx-auto">
      <p className="text-center uppercase border-b border-black w-60 mx-auto pb-2 text-2xl font-semibold ">
        all user info
      </p>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Delate Account</th>
              </tr>
            </thead>
            <tbody>
              {user?.reverse().map((data, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.email}</td>
                  <td className="font-bold">{data?.userRole}</td>
                  <td>
                    <button
                      onClick={() => handleUserDelate(data?._id)}
                      className="btn btn-outline btn-sm btn-error"
                    >
                      Delete
                    </button>
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

export default AllUserInfo;
