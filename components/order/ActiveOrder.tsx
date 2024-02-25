import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

const ActiveOrder = () => {
  return (
    <div className="flex flex-row justify-between items-center rounded-sm bg-gray-50 py-8 px-8 w-full">
      <div className="flex items-center whitespace-nowrap gap-x-2">
        <span className="text-2xl font-medium">Active orders</span> - 0 ($0)
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center items-center px-4 py-2.5 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 border rounded-md border-gray-400">
            <div className="mr-2"> Active orders (0)</div>
            <HiOutlineChevronDown
              className="h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <Link href="" className="flex">
                  <button
                    type="button"
                    className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-wokr-red-100"
                  >
                    Duplicate
                  </button>
                </Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ActiveOrder;
