import React, { useEffect, useState } from "react";

const CharList = ({ id }) => {
  const [chatData, setChatData] = useState({});

  useEffect(() => {
    fetch(`https://classroom-server-one.onrender.com/api/v1/chatInfo/${id}`)
      .then((res) => res.json())
      .then((data) => setChatData(data?.data));
  }, [id]);

  return (
    <div>
      <div className="flex items-center gap-2 mt-4">
        <img
          className="w-12 h-12 border hover:bg-gray-200 py-1 px-1 rounded-full cursor-pointer"
          src={chatData?.image}
          alt=""
        />
        <div>
          <p className="text-lg">{chatData?.name}</p>
          <p className="text-sm">{chatData?.chatValue}</p>
        </div>
      </div>
    </div>
  );
};

export default CharList;
