"use client";

import { useState, Fragment, Key } from "react";
import { HiEye, HiEyeSlash, HiMiniPencil } from "react-icons/hi2";
import {
  HiPhoto,
  HiCheckCircle,
  HiChevronUpDown,
  HiCheck,
} from "react-icons/hi2";
import { Transition, Listbox } from "@headlessui/react";
import Image from "next/image";

export const WokrDashboardList = ({ ...props }) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={props.htmlFor}
        className={`${props.labelclass} block text-sm font-medium leading-6 text-gray-900`}
      >
        {props.label}
      </label>
      <Listbox
        value={props.categories}
        onChange={props.setCategories}
        multiple={props.multiple}
      >
        <div className="relative mt-2">
          <Listbox.Button className="bg-white relative w-full rounded-md shadow-sm border-0 text-left py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6 outline-none">
            <span className="block truncate">
              {Array.isArray(props?.categories)
                ? props?.categories
                    .map((person: any) => person.value)
                    .join(", ")
                : props?.categories}
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
                      `relative select-none py-2 pl-10 pr-4 ${
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

export const WokrDashboardSingleList = ({ ...props }) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={props.htmlFor}
        className={`${props.labelclass} block text-sm font-medium leading-6 text-gray-900`}
      >
        {props.label}
      </label>
      <Listbox
        value={props.value}
        onChange={props.onChange}
        multiple={props.multiple}
      >
        <div className="relative mt-2">
          <Listbox.Button className="bg-white relative w-full rounded-md shadow-sm border-0 text-left py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6 outline-none">
            <span className="block truncate">{props?.value}</span>
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
              {props.lists &&
                props.lists.map((list: any, i: number) => (
                  <Listbox.Option
                    key={i}
                    value={list}
                    className={({ active }) =>
                      `relative select-none py-2 pl-10 pr-4 ${
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
                          {list}
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

export const WokrList = ({ ...props }) => {
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
          <Listbox.Button className="bg-white relative w-full rounded-md shadow-sm border-0 text-left py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6 outline-none">
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
                      `relative select-none py-2 pl-10 pr-4 ${
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
            <Image
              src="/images/wokr-loader.gif"
              alt="loading-button"
              className="mr-2 h-4 w-4"
              width={90}
              height={90}
            />
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
        className={`${props.labelclass} block text-sm font-medium leading-6 text-gray-900`}
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
        className={`${props.labelclass} block text-sm font-medium leading-6 text-gray-900`}
      >
        {props.label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-wokr-red-200 sm:max-w-md">
          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
            {props.url}
          </span>
          <input
            required={props.required}
            disabled={props.disabled}
            onChange={props.onChange}
            value={props.value}
            title={props.title}
            type={props.type}
            name={props.name}
            id={props.id}
            autoComplete={props.autocomplete}
            className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
            placeholder={props.placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export const WokrDashboardSelector = ({ ...props }) => {
  return (
    <div className="sm:col-span-5 w-full">
      <label
        htmlFor={props.htmlFor}
        className={`${props.labelclass} block text-sm font-medium leading-6 text-gray-900`}
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
          value={props.value}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6 outline-none"
        >
          {props.options.map((option: any, i: any) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const WokrDashboardSelect = ({ ...props }) => {
  return (
    <div className="sm:col-span-5 w-full">
      <label
        htmlFor={props.htmlFor}
        className={`${props.labelclass} block text-sm font-medium leading-6 text-gray-900`}
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
          value={props.value}
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
        htmlFor={props.htmlFor}
        className={`${props.labelclass} block text-sm font-medium leading-6 text-gray-900`}
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
                required={props.required}
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

export const WokrDashboardDescription = ({ ...props }) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor={props.htmlFor}
        className={`${props.labelclass} block text-sm font-medium leading-6 text-gray-900`}
      >
        {props.title}
      </label>
      <p className="mt-1 text-sm font-light leading-6 text-gray-600">
        {props.writeUp}
      </p>
      <div className="mt-2">
        <textarea
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          rows={props.row}
          required={props.required}
          className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-wokr-red-100 sm:text-sm sm:leading-6 px-2"
        />
      </div>
      <p className="mt-3 text-sm font-light leading-6 text-gray-600">
        Description Character Count: {props.charCount}
      </p>

      {props.charCount === props.maxChars ||
        ("500" && (
          <div className="text-red-500 text-xs">
            You have reached the maximum characters
          </div>
        ))}
    </div>
  );
};

export const WokrFloadingButton = ({ ...props }) => {
  return (
    <button
      type="button"
      onClick={props.handleClick}
      className="fixed bottom-16 right-4 flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-wokr-red-200 transition-colors duration-300 z-50 hover:motion-safe:animate-bounce"
      aria-label="Create new item"
    >
      <HiMiniPencil className="h-5 w-5" />
    </button>
  );
};

export const WokrDashboardButton = ({ ...props }) => {
  return (
    <div className="mt-6 flex items-center gap-x-6">
      <button
        title={props.cancelTitle}
        type="button"
        className="text-sm font-semibold leading-6 text-gray-900 px-5 py-2 bg-gray-100 rounded-md"
        onClick={props.cancel}
      >
        {props.loading ? (
          <>
            <Image
              src="/images/wokr-loader.gif"
              alt="loading-button"
              className="mr-2 h-4 w-4"
              width={90}
              height={90}
            />
            {props.preCancelText}
          </>
        ) : (
          <>{props.cancelText}</>
        )}
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
            <Image
              src="/images/wokr-loader.gif"
              alt="loading-button"
              className="mr-2 h-4 w-4"
              width={90}
              height={90}
            />
            {props.loadingText}
          </>
        ) : (
          <>{props.preLoadingText}</>
        )}
      </button>
    </div>
  );
};
export const WokrDashboardServiceButton = ({ ...props }) => {
  return (
    <div className="mt-8 mb-3 md:mb-5 flex items-center gap-x-6">
      <div className="w-full">
        <Listbox
          value={props.value}
          onChange={props.onChange}
          multiple={props.multiple}
        >
          <div className="relative">
            <Listbox.Button className="bg-white relative w-full rounded-md shadow-sm border-0 text-left py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-wokr-red-100 pl-2.5 sm:text-sm sm:leading-6 outline-none">
              <span className="block truncate">{props?.value}</span>
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
                {props.options &&
                  props.options.map((list: any, i: number) => (
                    <Listbox.Option
                      key={i}
                      value={list}
                      className={({ active }) =>
                        `relative select-none py-2 pl-10 pr-4 ${
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
                            {list}
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

      <button
        title={props.title}
        type={props.type}
        className="cursor-pointer flex items-center justify-center text-center rounded-md bg-wokr-red-200 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-wokr-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wokr-red-100"
        disabled={props.disabled}
      >
        {props.loading ? (
          <>
            <Image
              src="/images/wokr-loader.gif"
              alt="loading-button"
              className="mr-2 h-4 w-4"
              width={90}
              height={90}
            />
            {props.loadingText}
          </>
        ) : (
          <>{props.preLoadingText}</>
        )}
      </button>
    </div>
  );
};
