"use client";

import { Tab, Disclosure } from "@headlessui/react";
import EditProfile from "@/components/profile/EditProfile";
import { HiChevronUp } from "react-icons/hi2";
import UpdatePassword from "@/components/auth/UpdatePassword";
import DeleteProfile from "@/components/auth/DeleteProfile";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { title: "My Details", id: "details" },
  { title: "Billing", id: "billing" },
  { title: "Password and Security", id: "security" },
];

const Setting = () => {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 justify-start items-center mx-auto max-w-screen-2xl px-6 lg:px-8">
        <h2 className="my-6 text-3xl font-bold text-gray-900">
          Account Settings
        </h2>
        <Tab.Group vertical>
          <Tab.List className="flex space-x-10 text-sm font-medium border-b border-black/20">
            {tabs.map((tab, i) => (
              <Tab
                id={tab.id}
                key={i}
                className={({ selected }) =>
                  classNames(
                    "py-2.5 outline-none",
                    selected ? "text-wokr-red-200" : "text-black"
                  )
                }
              >
                {tab.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            <Tab.Panel>
              <EditProfile />
            </Tab.Panel>
            <Tab.Panel>Billing information</Tab.Panel>
            <Tab.Panel>
              <div className="justify-start w-full max-w-screen-md rounded-2xl bg-white p-2">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-wokr-red-200/5">
                        <span>Change password</span>
                        <HiChevronUp
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-wokr-red-100`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 text-sm text-gray-500 w-full">
                        <UpdatePassword />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-wokr-red-200/5">
                        <span>Delete account</span>
                        <HiChevronUp
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-wokr-red-100`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 text-sm text-gray-500 w-full">
                        <DeleteProfile />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Setting;
