"use client";

import { useState, Fragment } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Spinner from "../spinner/Spinner";
import {
  HiPhoto,
  HiCheckCircle,
  HiChevronUpDown,
  HiCheck,
} from "react-icons/hi2";
import PhoneInput from "react-phone-input-2";
import { Transition, Listbox } from "@headlessui/react";

export const WokrDashboardList = ({ ...props }) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={props.htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <Listbox
        value={props.categories}
        onChange={props.setCategories}
        multiple={props.multiple}
      >
        <div className="relative mt-2">
          <Listbox.Button className="bg-white relative w-full cursor-default rounded-md shadow-sm border-0 text-left py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6 outline-none">
            <span className="block truncate">
              {Array.isArray(props.categories)
                ? props.categories.map((person: any) => person.value).join(", ")
                : props.categories.value}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {props.categorylist &&
                props.categorylist.map((person: any) => (
                  <Listbox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-wokr-red-50 text-amber-900"
                          : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person?.value}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-wokr-red-100">
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

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
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6 outline-none"
        />
      </div>
    </div>
  );
};
export const WokrDashboardUrlInput = ({ ...props }) => {
  return (
    <div className={props.classname}>
      <label
        htmlFor={props.htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-wokr-red-200 sm:max-w-md">
          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
            {props.url}
          </span>
          <input
            onChange={props.onChange}
            value={props.value}
            title={props.title}
            type={props.type}
            name={props.name}
            id={props.id}
            autoComplete={props.autocomplete}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
            placeholder={props.placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export const WokrDashboardSelect = ({ ...props }) => {
  return (
    <div className="sm:col-span-5 w-full">
      <label
        htmlFor={props.htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2 w-full">
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
              className="relative cursor-pointer rounded-md bg-white font-semibold text-wokr-red-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-wokr-red-100 focus-within:ring-offset-2 hover:text-wokr-red-100 text-center"
            >
              <span>{props.title}</span>
              <input
                multiple={props.multiple}
                title={props.title}
                onChange={props.onChange}
                accept={props.accept}
                id={props.inputId}
                name={props.inputName}
                type={props.inputType}
                className="sr-only outline-none ring-0"
              />
            </label>
            {/*<p className="pl-1">or drag and drop</p>*/}
          </div>
          {!props.value ? (
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          ) : (
            <p className="text-2xl leading-5 text-green-600 text-center mt-2 flex justify-center items-center">
              <HiCheckCircle />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const WokrPhone = ({ ...props }) => {
  return (
    <div className="sm:col-span-3">
      <label
        className="block text-grey-darker text-sm font-medium leading-6"
        htmlFor="PhoneNumber"
      >
        {props.label}
      </label>
      <div className="mt-2 relative w-full flex flex-col">
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
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 sm:text-sm sm:leading-6 px-2"
          defaultValue={""}
        />
      </div>
      <p className="mt-3 text-sm font-light leading-6 text-gray-600">
        {props.writeUp}
      </p>
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
        {props.cancelText}
      </button>
      <button
        title={props.title}
        type={props.type}
        className="flex items-center justify-center text-center rounded-md bg-wokr-red-200 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-wokr-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wokr-red-100"
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
