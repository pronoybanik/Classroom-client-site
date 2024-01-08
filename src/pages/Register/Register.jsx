import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import LogIn from "../login/LogIn";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PrimaryButton from "../../shared/PrimaryButton";
import { AuthContext } from "../../shared/AuthPovider";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, logout, profileUpdate, verification } =
    useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [imageValue, setImageValue] = useState("");
  const [selectedFileCount, setSelectedFileCount] = useState(0);

  const [state, setState] = useState("login");
  const [show, setShow] = useState({
    // as password one and password to toggle to password show hidden seperately
    p1: false,
    p2: false,
  });
  const [fireBaseError, setFireBaseError] = useState("");
  const location = useLocation();

  useEffect(() => {
    location.pathname.includes("login") && setState("login");
    location.pathname.includes("register") && setState("register");
  }, [state, location.pathname, show.p1, show.p2]);

  const uploadImage = (event) => {
    const inputElement = event.target;
    const files = inputElement.files;
    if (files) {
      const count = files.length;
      setSelectedFileCount(count);
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

  const handleRegisterAction = (data) => {
    const toastId = toast.loading("Loading...");
    const { name, email, password } = data;
    const userData = {
      name,
      email,
      password
    };
  
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          // post user info in data base...
          fetch(`https://classroom-server-one.onrender.com/api/v1/userInfo`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }).then((response) => response.json());
          // send email varifycation code...
          verification(user?.email, {
            url: "https://class-room-project.web.app/verifyAccount",
            handleCodeInApp: true,
          })
            .then(() => {
              window.localStorage.setItem("emailForSignIn", email);
              alert("Please Check Your Email");
              const userInfo = {
                displayName: name,
                photoURL: imageValue,
              };
              profileUpdate(userInfo);
              setFireBaseError("");
              reset();
              toast.dismiss(toastId);
              toast.success("User signed in successfully");
              logout();
            })
            .catch((error) => {
              console.error(error.code, error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss(toastId);
        toast.error(error.message || "User not signed in");
        setFireBaseError(error.message);
      });
  };

  return (
    <section className="-mt-12 ">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mt-6 duration-300">
            <button
              className={`w-1/3 pb-4 duration-200 ease-linear  transition-all font-medium text-center text-gray-500 capitalize ${
                state === "login" && "border-b-2 border-blue-500"
              }  `}
            >
              sign in
            </button>

            <button
              className={`w-1/3 pb-4 duration-200 ease-linear  transition-all font-medium text-center text-gray-800 capitalize ${
                state === "register" && "border-b-2 border-blue-500"
              } `}
            >
              sign up
            </button>
          </div>
          {state === "login" && <LogIn />}
          {state === "register" && (
            <form onSubmit={handleSubmit(handleRegisterAction)}>
              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40
                            ${errors.name && "border border-red-800"}
                            `}
                  placeholder="name"
                  name="name"
                  required
                  {...register("name", {
                    required: "name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-error font-medium">{errors.name}</p>
              )}

              <div className="mt-3 flex items-center space-x-4 border px-2 py-2 bg-slate-100 rounded-lg">
                <label className="bg-[#19200f] hover:bg-[#37491b] text-white rounded-lg px-4 py-2 cursor-pointer">
                  Browse
                  <input
                    type="file"
                    required
                    className="hidden"
                    id="profileImage"
                    name="profileImage"
                    onChange={uploadImage}
                    multiple // Allow multiple file selection
                  />
                </label>
                <span className="text-black font-semibold">
                  {selectedFileCount === 1
                    ? "1 file selected"
                    : `${selectedFileCount} files selected`}
                </span>
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Email address"
                  name="email"
                  required
                  {...register("email", { required: "email is required" })}
                />
              </div>
              {errors.email && (
                <p className="text-error font-medium">
                  ⚠ Please provide valid email address
                </p>
              )}

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type={show.p1 ? "text" : "password"}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: "You must specify a password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  })}
                />
                {show.p1 ? (
                  <AiFillEye
                    className="absolute right-2 text-gray-600"
                    onClick={() => {
                      setShow({ ...show, p1: !show.p1 });
                    }}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="absolute right-2 text-gray-600"
                    onClick={() => {
                      setShow({ ...show, p1: !show.p1 });
                    }}
                  />
                )}
              </div>

              {errors.password && (
                <>
                  <p className="text-error">⚠ Please provide strong Password</p>
                  <p className="text-red-600 text-base">
                    🎇TIP: min6, max-15 including lowercase,uppercase,special
                    character
                  </p>
                </>
              )}

              {fireBaseError && (
                <>
                  <p className=" font-semibold text-red-600 mt-2">
                    ⚠ {fireBaseError}
                  </p>
                </>
              )}

              <div className="mt-6">
                <PrimaryButton full>Sign up</PrimaryButton>

                <div className="mt-1 text-center ">
                  <Link
                    to="/login"
                    className="text-lg font-serif text-blue-500 hover:underline dark:text-blue-400"
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register;
