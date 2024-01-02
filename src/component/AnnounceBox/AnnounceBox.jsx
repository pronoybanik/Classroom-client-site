import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/AuthPovider";
import { CgProfile } from "react-icons/cg";
import PrimaryButton from "../../shared/PrimaryButton";

const AnnounceBox = ({ classData }) => {
  const { user } = useContext(AuthContext);
  const [postData, setPostData] = useState(false);
  const [imageData, setImageData] = useState(0);
  const [pdfData, setPdfData] = useState(0);
  const handleImageFile = (event) => {
    const files = event.target.files;
    if (files) {
      const count = files.length;
      setImageData(count);
    }
  };
  const handlePdfFile = (event) => {
    const files = event.target.files;
    if (files) {
      const count = files.length;

      setPdfData(count);
    }
  };
  return (
    <div>
      {postData ? (
        <section className="w-[650px] mx-auto bg-white px-10 py-6  border-2 rounded-md">
          <div>
            <p className="font-semibold ml-1">For</p>
            <p className="bg-gray-200 mt-2 px-2 py-2  w-32 ps-2 rounded-md   text-lg font-medium">{classData.className}</p>
          </div>
          <label
            htmlFor="Instructions"
            className="relative py-20 mt-6 block overflow-hidden border-b-2 bg-[#C5C5C5]  rounded-sm  border-black bg-transparent pt-3 focus-within:border-blue-600"
          >
            <input
              type="text"
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

          <div className="flex items-center gap-2">
            <div className="mt-3 flex items-center space-x-4 border px-2 py-2 bg-slate-100 rounded-lg">
              <label className="bg-[#19200f] hover:bg-[#37491b] text-white rounded-lg px-4 py-2 cursor-pointer">
                upload Image
                <input
                  type="file"
                  required
                  className="hidden"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageFile}
                  multiple
                />
              </label>
              <span className="text-black font-semibold">
                {imageData === 1
                  ? "1 file selected"
                  : `${imageData} files selected`}
              </span>
            </div>

            <div className="mt-3 flex items-center space-x-4 border px-2 py-2 bg-slate-100 rounded-lg">
              <label className="bg-[#19200f] hover:bg-[#37491b] text-white rounded-lg px-4 py-2 cursor-pointer">
                upload pdf
                <input
                  type="file"
                  required
                  className="hidden"
                  id="profileImage"
                  name="profileImage"
                  onChange={handlePdfFile}
                  multiple
                />
              </label>
              <span className="text-black font-semibold">
                {pdfData === 1
                  ? "1 file selected"
                  : `${pdfData} files selected`}
              </span>
            </div>
          </div>
        </section>
      ) : (
        <div
          onClick={() => setPostData((pre) => !pre)}
          className="cursor-pointer shadow-lg flex items-center gap-2 bg-slate-100 px-2 py-2  rounded-lg "
        >
          <img
            className="w-12 h-12 bg-slate-200 hover:bg-gray-300 py-1 px-1 rounded-full"
            src={user?.photoURL || <CgProfile />}
            alt=""
          />
          <p className="text-gray-500 font-semibold hover:text-blue-500">
            Announce something to your class
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnounceBox;
