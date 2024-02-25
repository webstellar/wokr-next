import { jobData } from "@/types/types";
import { Popover, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface jobProps {
  data: jobData;
}

const AutomationCard: React.FC<jobProps> = ({ data }) => {
  return (
    <div className="rounded-3xl border flex flex-row justify-center items-center md:divide-x gap-y-5 gap-x-10 py-8 px-10">
      <div className="basis-full md:basis-1/2 flex flex-col item-center justify-center gap-y-4">
        <h3 className="font-semibold text-xl">{data?.title}</h3>
        <p className="leading-6 text-sm text-gray-400 font-light">
          {data?.description.substring(0, 85)}
        </p>
      </div>

      <div className="basis-1/2 md:basis-1/4 flex flex-col justify-center items-center px-4">
        <p className="text-xs text-gray-400">STARTING AT</p>
        <p className="text-xl md:text-5xl">${data.price}</p>
      </div>

      <Popover.Group className="basis-1/2 md:basis-1/4 flex gap-x-2 justify-center items-center px-4">
        <button
          type="button"
          title="view detail"
          className="rounded-3xl border py-2 px-5 w-full text-nowrap hover:bg-wokr-red-100 hover:text-white"
        >
          <Link href={`/automations/${data._id}`} className="text-base">
            View Details
          </Link>
        </button>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center items-center px-1 py-1 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 rounded-full border border-gray-300">
              <HiOutlineChevronDown
                className="h-4 w-4 text-gray-300"
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
                      Edit
                    </button>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="" className="flex">
                    <button
                      type="button"
                      className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-wokr-red-100"
                    >
                      Delete
                    </button>
                  </Link>
                </Menu.Item>
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
      </Popover.Group>
    </div>
  );
};

export default AutomationCard;
