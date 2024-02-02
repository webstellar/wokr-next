"use client";

import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Spinner from "../spinner/Spinner";
import { HiPhoto } from "react-icons/hi2";
import PhoneInput from "react-phone-input-2";

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
          autoComplete={props.inputPlaceholder}
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
    <div className={`${props.classname}`}>
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
          placeholder={props.inputPlaceholder}
          required={props.required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export const WokrDashboardSelect = ({ ...props }) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={props.htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <select
          title={props.title}
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          required={props.required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6 outline-none"
        >
          {props.options.map((option: any, i: any) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const WokrPhotoUpload = ({ ...props }) => {
  return (
    <div className={`${props.classname}`}>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <HiPhoto
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor={props.htmlFor}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>{props.title}</span>
              <input
                id={props.inputId}
                name={props.inputName}
                type={props.inputType}
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export const WokrPhone = ({ ...props }) => {
  return (
    <div className="sm:col-span-3">
      <label
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor="PhoneNumber"
      >
        {props.label}
      </label>
      <div className="relative w-full flex flex-col">
        <PhoneInput
          country={"us"}
          value={props.phoneNumber}
          inputStyle={{ width: "100%" }}
          containerClass="focus:border-wokr-red-100"
          inputClass="font-pangram-medium focus:border-wokr-red-100"
          dropdownClass="font-pangram-medium focus:border-wokr-red-100"
          onChange={props.onChange}
          inputProps={{
            required: true,
            name: "phoneNumber",
          }}
        />

        {!props.valid && <p>Please enter a valid phone number.</p>}
      </div>
    </div>
  );
};

export const WokrDashboardDescription = ({ ...props }) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor="about"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.title}
      </label>
      <div className="mt-2">
        <textarea
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          rows={props.row}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">{props.writeUp}</p>
    </div>
  );
};

export const WokrDashboardButton = ({ ...props }) => {
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="button"
        className="text-sm font-semibold leading-6 text-gray-900"
        onClick={props.cancel}
      >
        Cancel
      </button>
      <button
        title={props.title}
        type={props.type}
        className="rounded-md bg-wokr-red-200 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-wokr-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wokr-red-100"
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
