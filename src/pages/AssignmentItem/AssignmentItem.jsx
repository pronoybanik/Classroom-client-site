import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { AuthContext } from "../../shared/AuthPovider";
import ClassNavBar from "../../shared/ClassNavBar";
import toast from "react-hot-toast";
import StudentTaskBox from "../../component/studentTaskBox/StudentTaskBox";

const AssignmentItem = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [assignment, setAssignmentData] = useState({});
  const [classList, setClassList] = useState({});
  const [imageValue, setImageValue] = useState("");

  useEffect(() => {
    fetch(`https://classroom-server-one.onrender.com/api/v1/assignment/${id}`)
      .then((res) => res.json())
      .then((data) => setAssignmentData(data?.data));
  }, [id]);

  useEffect(() => {
    fetch(
      `https://classroom-server-one.onrender.com/api/v1/classList/${assignment?.classListId}`
    )
      .then((res) => res.json())
      .then((data) => setClassList(data?.data));
  }, [assignment?.classListId]);

  const handleImageFile = (event) => {
    const formData = new FormData();
    if (!event.target.files[0]) return;
    formData.append("image", event.target.files[0]);

    const toastId = toast.loading("Image uploading...");

    fetch(
      `https://api.imgbb.com/1/upload?key=99f58a547dc4b1d269148eb1b605ef29`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to upload image");
        }
        return res.json();
      })
      .then((image) => {
        setImageValue(image.data.url);
        toast.dismiss(toastId);
        toast.success("Image uploaded successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.dismiss(toastId);
        toast.error(error.message || "Failed to upload image");
      });
  };

  return (
    <section>
      <ClassNavBar id={assignment?.classListId} />
      <div className="lg:w-[1200px] mx-auto mt-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4 ">
          <div className="h-32 rounded-lg  lg:col-span-2  p-2">
            {/* Assignment details data */}
            <div className="flex gap-2">
              <div className="flex items-center  text-2xl bg-slate-600 text-white  pl-3 h-12 w-12 rounded-full">
                <GrNotes />
              </div>
              <div className=" ">
                <div>
                  <div className="flex items-center justify-between ">
                    <p className="text-3xl  font-medium uppercase">
                      {assignment?.title}
                    </p>
                  </div>

                  <p className="text-sm  mt-1 font-bold">
                    {assignment?.name}
                    <br /> Date: {assignment?.currentDate}
                  </p>
                  <p className="text-sm mt-1 font-medium">
                    {assignment?.assignmentMark
                      ? `Assignment Mark: ${assignment?.assignmentMark}`
                      : ""}
                  </p>
                  <p className="border-b mt-2 lg:w-[700px] border-black "></p>
                </div>

                <div className="mt-1 text-md mb-2 font-medium">
                  {assignment?.instructions}
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4 ">
                    {assignment?.imageValue && (
                      <a
                        className="w-full p-2 flex  border  rounded"
                        href={assignment?.imageValue}
                        target="_blank"
                      >
                        <img
                          className="w-full lg:h-40 h-28 object-cover"
                          src={assignment?.imageValue}
                          alt=""
                        />
                      </a>
                    )}

                    {assignment?.pdfValue && (
                      <a
                        className="w-full p-2 flex  border  rounded"
                        href={`https://classroom-server-one.onrender.com/pdfFiles/${assignment?.pdfValue}`}
                        target="_blank"
                      >
                        <img
                          className="w-full lg:h-40 h-28 object-contain"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt=""
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*only student can see that past*/}
          <div className="lg:mt-0 mt-40 -ml-4">
            {classList?.email !== user.email ? (
              <StudentTaskBox
                setImageValue={setImageValue}
                imageValue={imageValue}
                id={id}
                handleImageFile={handleImageFile}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmentItem;
