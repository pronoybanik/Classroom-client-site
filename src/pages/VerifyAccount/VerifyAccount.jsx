import React from "react";
// import {
//   RecaptchaVerifier,
//   getAuth,
//   signInWithPhoneNumber,
// } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../shared/PrimaryButton";

// const auth = getAuth();
// auth.languageCode = "it";

const VerifyAccount = () => {
  const navigate = useNavigate();

  // mobile verification code start:---

  // const navigate = useNavigate();
  // const onSignInSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const phoneNumber = "+880" + form.phoneNumber.value;

  //   // Initialize RecaptchaVerifier
  //   const recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
  //     size: "invisible",
  //     callback: (response) => {
  //       onSignInSubmit();
  //     },
  //   });

  //   signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       alert("otp has been sent");
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  // const onSubmitOTP = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const otpNumber = form.otp.value;
  //   confirmationResult
  //     .confirm(otpNumber)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log(user);
  //       alert("opt Right");
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  const handleSubmit = () => {
    navigate("/login");
    alert("verification is Done");
  };

  return (
    <section>
      {/* <form onSubmit={onSignInSubmit}>
        <div id="sign-in-button"></div>
        <label
          htmlFor="phoneNumber"
          className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="number"
            id="phoneNumber"
            placeholder="phoneNumber"
            name="phoneNumber"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            phoneNumber
          </span>
        </label>
        <button>submit</button>
      </form>

      <form onSubmit={onSubmitOTP}>
        <label
          htmlFor="otp"
          className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="number"
            id="otp"
            placeholder="otp"
            name="otp"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            OTP
          </span>
        </label>
        <button> submit</button>
      </form> */}

      <div className="flex items-center justify-center h-full mt-20">
        <div className="bg-green-200 text-center shadow-md   rounded p-6">
          <p className="text-2xl uppercase my-2 font-semibold">
            please Verify Your Account
          </p>
          <p className="my-2 font-semibold">
            {localStorage.getItem("emailForSignIn")}
          </p>
          <div onClick={handleSubmit}>
            <PrimaryButton>Confirm</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyAccount;
