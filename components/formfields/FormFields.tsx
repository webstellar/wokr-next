"use client";

import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export const WokrInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-3 relative">
      <label
        htmlFor={props.htmlFor}
        className="mb-2 block text-xs font-semibold"
      >
        {props.labelName}
      </label>
      <div className="relative">
        <input
          value={props.inputName}
          id={props.inputName}
          name={props.inputName}
          type={showPassword ? "text" || "email" : props.inputType}
          placeholder={`Enter your ${props.inputPlaceholder}`}
          disabled={props.disabled}
          className="block w-full rounded-md border border-gray-300 focus:border-wokr-red-100 focus:outline-none focus:ring-1 focus:ring-wokr-red-100 py-1 px-1.5 text-gray-500"
          onChange={props.onChange}
        />
        {props.inputType === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <HiEyeSlash /> : <HiEye />}
          </div>
        )}
      </div>
    </div>
  );
};

export const WokrButton = ({ ...props }) => {
  return (
    <div className="mb-3">
      <button
        title={props.title}
        type={props.type}
        className="flex items-center justify-center mb-1.5 w-full text-center text-white bg-wokr-red-100 hover:bg-wokr-red-200 px-2 py-1.5 rounded-md"
        disabled={props.disabled}
        onClick={props?.onClick}
      >
        {props.loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M12 2C6.477 2 2 6.477 2 12c0 1.656.337 3.223 0.943 4.65C3.65 16.73 4.26 17 5 17c.74 0 1.35-.27 1.057-.35C7.663 15.223 8 13.656 8 12c0-2.21-.895-4.21-2.343-5.657C4.105 4.895 2.105 4 0 4"
              ></path>
            </svg>
            {props.loadingText}
          </>
        ) : (
          <>{props.preLoadingText}</>
        )}
      </button>
    </div>
  );
};
