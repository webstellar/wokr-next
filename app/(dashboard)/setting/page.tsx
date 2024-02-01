"use client";

import { Tab } from "@headlessui/react";
import EditProfile from "@/components/profile/EditProfile";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { title: "My Details" },
  { title: "Billing" },
  { title: "Password and Security" },
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
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Setting;
