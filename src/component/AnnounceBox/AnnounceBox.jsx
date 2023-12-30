import React, { useContext } from "react";
import { AuthContext } from "../../shared/AuthPovider";
import { CgProfile } from "react-icons/cg";

const AnnounceBox = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="cursor-pointer shadow-lg flex items-center gap-2 bg-slate-100 px-2 py-2  rounded-lg ">
        <img
          className="w-12 h-12 bg-slate-200 hover:bg-gray-300 py-1 px-1 rounded-full"
          src={user?.photoURL || <CgProfile />}
          alt=""
        />
        <p className="text-gray-500 font-semibold hover:text-blue-500">
          Announce something to your class
        </p>
      </div>
    </div>
  );
};

export default AnnounceBox;
