"use client";

import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Spinner from "../spinner/Spinner";

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
          value={props.inputValue}
          id={props.inputName}
          name={props.inputName}
          type={showPassword ? "text" || "email" : props.inputType}
          placeholder={props.inputPlaceholder}
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
            <Spinner />
            {props.loadingText}
          </>
        ) : (
          <>{props.preLoadingText}</>
        )}
      </button>
    </div>
  );
};

export const WokrDashboardInput = ({ ...props }) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={props.htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          title={props.inputTitle}
          value={props.inputValue}
          disabled={props.disabled}
          onChange={props.onChange}
          type={props.inputType}
          name={props.inputName}
          id={props.inputId}
          autoComplete={props.autoComplete}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export const WokrDashboardInput = ({ ...props }) => {}
