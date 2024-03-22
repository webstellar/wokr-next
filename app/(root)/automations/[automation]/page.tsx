"use client";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import JobProfileCard from "@/components/profileCard/JobProfileCard";
import { useAllUsersQuery } from "@/hooks/useAllUsersQuery";
import { useJobQuery } from "@/hooks/useJobQuery";
import { userData } from "@/types/types";
import {
  HiMiniStar,
  HiMiniArrowDownOnSquare,
  HiMiniClock,
  HiMiniArchiveBox,
  HiMiniArrowPath,
  HiMiniCog8Tooth,
} from "react-icons/hi2";
import { useRouter, useSearchParams } from "next/navigation";
import AutomationPriceCard from "@/components/automation/AutomationPriceCard";
import AutomationGallery from "@/components/automation/AutomationGallery";
import Image from "next/image";
import { WokrFloadingButton } from "@/components/formfields/FormFields";
import { auth } from "@/config/firebase";

type Props = {
  params: { automations: string };
};

export default function Automation({ params }: Props) {
  const id = params?.automations;
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUser = auth.currentUser;

  const search = String(searchParams.get("_id"));
  const { data: job, error, status } = useJobQuery(search);
  const { data: users, status: state } = useAllUsersQuery();

  const filterUserInfo =
    state === "success" &&
    users.filter((user: userData) => user._id === job?.owner);

  const loggedInUser = currentUser?.email;
  const jobOwner = filterUserInfo[0]?.email;

  const handleClick = () => {
    router.push(`/my-services/${job._id}/edit`);
  };

  const handleEmptyClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/automations");
  };



  if (status === "pending")
    return (
      <div className="mx-auto flex flex-col justify-center items-center h-[50%]">
        <div className="my-6 flex items-center justify-center h-min">
          <Image
            src="/images/wokr-loader.gif"
            alt="loading gif"
            width={100}
            height={100}
            className="h-10 w-10"
          />
        </div>
      </div>
    );

  if (status === "error") {
    return (
      <div className="mx-auto flex flex-col justify-center items-center h-[50%]">
        <h1 className="text-lg md:text-xl">
          The automation service you're trying to access does not exist anymore
        </h1>
        <button
          title="reset-button"
          type="button"
          className="rounded-md bg-wokr-red-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wokr-red-100  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wokr-200 mt-6 cursor-pointer"
          onClick={handleEmptyClick}
        >
          Click to see other services
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col max-w-screen-2xl item-center justify-start p-6 lg:px-8">
      <>
        <Breadcrumb
          homeElement={"Home"}
          separator={<span className="text-xs md:text-sm font-light"> | </span>}
          activeClasses="text-gray-800 font-normal cursor-default"
          containerClasses="flex flex-wrap gap-y-2"
          listClasses="hover:underline mx-2 text-gray-500 text-xs md:text-sm font-light"
          capitalizeLinks
        />
        <div className="grid grid-col-1 md:grid-cols-2 justify-between items-start py-6 mx-2 gap-5 ">
          <div className="order-last md:order-first md:col-span-1 flex flex-col gap-y-4">
            <span className="font-medium text-2xl md:text-3xl mb-5">
              {job?.title}
            </span>

            <div className="flex flex-row divide-x justify-start gap-x-5 items-center">
              <span className="text-white bg-wokr-red-100 px-3 md:px-5 rounded-md py-1 md:text-sm text-xs">
                Verified
              </span>

              <div className="flex flex-row items-center justify-center gap-1 pl-2 md:text-sm text-xs">
                5.0
                <div className="flex">
                  <HiMiniStar />
                  <HiMiniStar />
                  <HiMiniStar />
                  <HiMiniStar />
                  <HiMiniStar />
                </div>
              </div>
              <span className="pl-2 font-medium md:text-sm text-xs">
                1,500 Ratings
              </span>
            </div>

            <span className="md:font-medium text-sm md:text-base">Details</span>
            <div className="flex flex-col divide-y gap-y-5">
              <div className="text-xs md:text-sm grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6 justify-start place-items-start">
                <div className="sm:col-span-3 flex flex-row gap-x-3 items-center text-gray-500">
                  <HiMiniArrowDownOnSquare className="text-gray-600" />
                  <span className="font-medium text-gray-600">
                    Digital Download:
                  </span>
                  Yes
                </div>
                <div className="sm:col-span-3 flex flex-row gap-x-3 items-center text-gray-500">
                  <HiMiniClock className="text-gray-600" />
                  <span className="font-medium text-gray-600">
                    Delivery Time:
                  </span>
                  {job?.deliveryTime}
                </div>

                <div className="sm:col-span-3 flex flex-row gap-x-3 items-start text-gray-500">
                  <HiMiniArchiveBox className="text-gray-600" />
                  <span className="font-medium text-gray-600">
                    Service Includes:
                  </span>
                  <div className="flex flex-col justify-start">
                    {job?.servicesIncluded.map((service: any) => (
                      <span
                        key={service._id}
                        className="text-gray-500 font-light"
                      >
                        {service.name},
                      </span>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-3 flex flex-row gap-x-3 items-center text-gray-500">
                  <HiMiniArrowPath className="text-gray-600" />
                  <span className="font-medium text-gray-600">
                    Max Revisions:
                  </span>
                  {job?.maxRevisions}
                </div>

                <div className="sm:col-span-full flex flex-row gap-x-3 items-start text-gray-500">
                  <HiMiniCog8Tooth className="text-gray-600" />
                  <span className="font-medium text-gray-600">Skill</span>
                  <div className="flex flex-row justify-start gap-x-2">
                    {job?.skills.map((skill: any) => (
                      <span
                        key={skill._id}
                        className="text-gray-500 font-light"
                      >
                        {skill.skill} |{" "}
                        <span className="font-normal">{skill.skillLevel}</span>,
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 font-light leading-loose md:text-base text-sm">
                {job?.description}
              </div>

              <div className="pt-5 flex flex-row justify-start items-center gap-5">
                {job?.tools.map((tool: any) => (
                  <span
                    key={tool._id}
                    className="text-gray-500 bg-transparent border border-gray-500 px-5 rounded-md py-1 md:text-base text-xs"
                  >
                    {tool.automation}
                  </span>
                ))}
              </div>
            </div>

            {state === "success" && <JobProfileCard user={filterUserInfo[0]} />}
          </div>

          <div className="md:col-span-1 flex flex-col gap-y-4 md:pl-10">
            <AutomationGallery data={job} />
            <AutomationPriceCard data={job} />
          </div>
        </div>
        {loggedInUser === jobOwner && (
          <WokrFloadingButton handleClick={handleClick} />
        )}
      </>
    </div>
  );
}
