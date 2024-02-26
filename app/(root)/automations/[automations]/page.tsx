"use client";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useJobQuery } from "@/hooks/useJobQuery";
import {
  HiMiniStar,
  HiMiniArrowDownOnSquare,
  HiMiniClock,
  HiMiniArchiveBox,
  HiMiniArrowPath,
  HiMiniCog8Tooth,
} from "react-icons/hi2";

type Props = {
  params: { automations: string };
};

export default function Automation({ params }: Props) {
  const job = params?.automations;
  const { data, error } = useJobQuery(job);

  return (
    <div className="mx-auto flex flex-col max-w-screen-2xl item-center justify-start p-6 lg:px-8">
      <Breadcrumb
        homeElement={"Home"}
        separator={<span className="text-sm font-light"> | </span>}
        activeClasses="text-gray-800 font-normal"
        containerClasses="flex"
        listClasses="hover:underline mx-2 text-gray-500 text-sm font-light"
        capitalizeLinks
      />

      <div className="grid grid-cols-2 justify-between items-center py-6 mx-2">
        <div className="col-span-1 flex flex-col gap-y-4">
          <span className="font-medium text-lg md:text-3xl mb-5">
            {data?.title}
          </span>

          <div className="flex flex-row divide-x justify-start gap-x-5 items-center">
            <span className="text-white bg-wokr-red-100 px-5 rounded-md py-1">
              Verified
            </span>

            <div className="flex flex-row items-center justify-center gap-1 pl-2">
              5.0
              <div className="flex">
                <HiMiniStar />
                <HiMiniStar />
                <HiMiniStar />
                <HiMiniStar />
                <HiMiniStar />
              </div>
            </div>
            <span className="pl-2 font-medium">1,500 Ratings</span>
          </div>

          <span className="font-medium text-base">Details</span>
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="sm:col-span-3 flex flex-row gap-x-3 items-center text-gray-500">
              <HiMiniArrowDownOnSquare className="text-gray-600" />
              <span className="font-medium text-gray-600">
                Digital Download:
              </span>
              Yes
            </div>
            <div className="sm:col-span-3 flex flex-row gap-x-3 items-center text-gray-500">
              <HiMiniClock className="text-gray-600" />
              <span className="font-medium text-gray-600">Delivery Time:</span>
              {data?.deliveryTime}
            </div>

            <div className="sm:col-span-3 flex flex-row gap-x-3 items-center text-gray-500">
              <HiMiniArchiveBox className="text-gray-600" />
              <span className="font-medium text-gray-600">
                Service Includes:
              </span>
              {data?.servicesIncluded[0]?.name}
            </div>
            <div className="sm:col-span-3 flex flex-row gap-x-3 items-center text-gray-500">
              <HiMiniArchiveBox className="text-gray-600" />
              <span className="font-medium text-gray-600">
                Service Includes:
              </span>
              {data?.servicesIncluded[0]?.name}
            </div>

            <div className="sm:col-span-3 flex flex-row gap-x-3 items-center text-gray-500">
              <HiMiniCog8Tooth className="text-gray-600" />
              <span className="font-medium text-gray-600">Skill</span>
              {data?.servicesIncluded[0]?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
