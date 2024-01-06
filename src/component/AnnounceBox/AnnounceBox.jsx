import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/AuthPovider";
import { CgProfile } from "react-icons/cg";
import PrimaryButton from "../../shared/PrimaryButton";
import { PiDotsThree } from "react-icons/pi";

const AnnounceBox = ({ classData }) => {
  console.log(classData);
  const { user } = useContext(AuthContext);
  const [postData, setPostData] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const classId = classData?._id;
    const chatValue = value;
    const name = user?.displayName;
    const image = user?.photoURL;

    const chatInfo = {
      classId,
      chatValue,
      name,
      image,
    };
    console.log(chatInfo);

    fetch(`http://localhost:5000/api/v1/chatInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("chatdata", data);
        if (data?.status === "success") {
          setValue("");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="mt-8">
      {postData ? (
        <form
          onSubmit={handleSubmit}
          className="w-[650px] mx-auto bg-white px-10 py-6 border rounded-md border-gray-300"
        >
          <div>
            <p className="font-semibold ml-1 mb-2">For</p>
            <p className="bg-gray-200 mt-2 px-2 py-2  w-32 ps-2 rounded-md   text-lg font-medium">
              {classData.className}
            </p>
          </div>
          <label
            htmlFor="Instructions"
            className="relative py-20 mt-6 block overflow-hidden border-b-2 bg-[#C5C5C5]  rounded-sm  border-black bg-transparent pt-3 focus-within:border-blue-600"
          >
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              id="Instructions"
              name="instructions"
              placeholder="Instructions"
              className="peer px-2 mt-2  h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute mt-2 text-2xl font-semibold   px-2 start-0 top-2 -translate-y-1/2  text-gray-500 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Instructions (optional)
            </span>
          </label>
          <div className="flex items-center justify-end mt-2 gap-2">
            <div onClick={() => setPostData(false)}>
              <PrimaryButton>cencle</PrimaryButton>
            </div>
            <PrimaryButton>Submit</PrimaryButton>
          </div>
        </form>
      ) : (
        <div
          onClick={() => setPostData((pre) => !pre)}
          className="cursor-pointer  shadow-lg flex items-center justify-between gap-2 bg-slate-100 p-4   rounded-lg "
        >
          <div className="flex items-center gap-2">
            <img
              className="w-14 h-14 bg-slate-200 hover:bg-gray-300 py-1 px-1 rounded-full"
              src={user?.photoURL || <CgProfile />}
              alt=""
            />
            <p className="text-gray-500 font-semibold text-md hover:text-blue-500">
              Announce something to your class
            </p>
          </div>
          <PiDotsThree style={{ fontSize: "40px" }} />
        </div>
      )}
    </div>
  );
};

export default AnnounceBox;
