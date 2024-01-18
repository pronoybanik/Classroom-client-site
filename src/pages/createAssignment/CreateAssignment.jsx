import React, { useContext, useState } from "react";
import PrimaryButton from "../../shared/PrimaryButton";
import toast from "react-hot-toast";
import { AuthContext } from "../../shared/AuthPovider";
import { useNavigate, useParams } from "react-router-dom";

const CreateAssignment = () => {
  const { user } = useContext(AuthContext);
  const [imageData, setImageData] = useState(0);
  const [pdfData, setPdfData] = useState(0);
  const [imageValue, setImageValue] = useState("");
  const [pdfValue, setPdfValue] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleImageFile = (event) => {
    const files = event.target.files;
    if (files) {
      const count = files.length;
      setImageData(count);
    }

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

  const handlePdfFile = (event) => {
    const files = event.target.files;
    const file = event.target.files[0];

    if (files) {
      const count = files.length;
      setPdfData(count);
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("https://classroom-server-one.onrender.com/upload-file", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("pdf if add");
          setPdfValue(data.data);
        }
      });
  };

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}.${date}.${year}`;
  };

  const handleAssignment = (e) => {
    e.preventDefault();
    const from = e.target;
    const title = from.title.value;
    const instructions = from.instructions.value;

    const assignmentData = {
      classListId: id,
      email: user.email,
      name: user.displayName,
      currentDate: getDate(),
      title,
      instructions,
      imageValue,
      pdfValue,
    };

    fetch("https://classroom-server-one.onrender.com/api/v1/assignment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(assignmentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(`class is create successfully`);
          navigate(`/classWork/${data?.data?.classListId}`);
          window.location.reload();
        }
      });
  };

  return (
    <section className="w-[800px] mx-auto bg-white px-20 py-8 mt-4 border-2 rounded-md">
      <form onSubmit={handleAssignment} action="">
        <label
          htmlFor="Title"
          className="relative block overflow-hidden border-b-2 bg-[#C5C5C5] py-2 rounded-sm  border-black bg-transparent pt-3 focus-within:border-blue-600"
        >
          <input
            type="text"
            id="Title"
            name="title"
            placeholder="Title"
            className="peer px-2 mt-2 h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            required
          />

          <span className="absolute mt-1 font-semibold  text-sm px-2 start-0 top-2 -translate-y-1/2  text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            Title
          </span>
        </label>

        <label
          htmlFor="Instructions"
          className="relative py-20 mt-6 block overflow-hidden border-b-2 bg-[#C5C5C5]  rounded-sm  border-black bg-transparent pt-3 focus-within:border-blue-600"
        >
          <input
            type="text"
            id="Instructions"
            name="instructions"
            placeholder="Instructions"
            required
            className="peer px-2 mt-2  h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute mt-2 text-sm font-semibold   px-2 start-0 top-2 -translate-y-1/2  text-gray-500 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            Instructions (optional)
          </span>
        </label>

        <div className="flex items-center justify-end mt-2">
          <PrimaryButton>Submit</PrimaryButton>
        </div>
      </form>

      <div className="flex items-center justify-center gap-2">
        <div className="mt-3 flex items-center space-x-4 border px-2 py-2 bg-slate-100 rounded-lg">
          <label className="bg-[#19200f] hover:bg-[#37491b] text-white rounded-lg px-4 py-2 cursor-pointer">
            upload Image
            <input
              type="file"
              className="hidden"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
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
              className="hidden"
              id="pdf"
              name="pdf"
              accept="application/pdf"
              onChange={handlePdfFile}
              multiple
            />
          </label>
          <span className="text-black font-semibold">
            {pdfData === 1 ? "1 file selected" : `${pdfData} files selected`}
          </span>
        </div>
      </div>
      <br />
      <div className="grid grid-cols-2 gap-4">
        {imageValue && (
          <div className="mt-3 flex items-center space-x-4 border px-2 py-2 bg-slate-100 rounded-lg">
            <img className="w-full h-60 object-cover" src={imageValue} />
          </div>
        )}
        {pdfValue && (
          <div className="mt-3 flex items-center space-x-4 border px-2 py-2 bg-slate-100 rounded-lg">
            <img
              className="w-full h-60 object-contain"
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateAssignment;
