"use client";

import AutomationStoreCard from "@/components/automation/AutomationStoreCard";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useAllJobsQuery } from "@/hooks/useAllJobsQuery";
import { useAllUsersQuery } from "@/hooks/useAllUsersQuery";

import { jobData, userData } from "@/types/types";
import Link from "next/link";

const Automations = () => {
  const { data: jobs, status, error } = useAllJobsQuery();
  const { data: users } = useAllUsersQuery;

  //create new jobsArray where all users are fetched
  //match their user id with the user id of the job
  //and add the user to the job
  const jobsArray = jobs?.map((job: jobData) => {
    const user = users?.find((user: userData) => user._id === job.owner);
    return { ...job, user };
  });

  console.log(jobsArray);

  if (status === "pending")
    return (
      <section className="mx-auto max-w-screen-2xl px-6 lg:px-8">
        Loading...
      </section>
    );
  if (status === "error") {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <div className="mx-auto flex flex-col max-w-screen-2xl item-center justify-start p-6 lg:px-8 gap-y-5">
      <Breadcrumb
        homeElement={"Home"}
        separator={<span className="text-xs md:text-sm font-light"> | </span>}
        activeClasses="text-gray-800 font-normal cursor-default"
        containerClasses="flex flex-wrap gap-y-2"
        listClasses="hover:underline mx-2 text-gray-500 text-xs md:text-sm font-light"
        capitalizeLinks
      />
      <div className="flex flex-row justify-between items-center">
        <span className="font-light text-xs md:text-sm">
          208,807 services available
        </span>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-5  justify-between gap-10">
        {jobs &&
          jobs.map((job: jobData) => (
            <AutomationStoreCard key={job._id} data={job} />
          ))}
      </div>
    </div>
  );
};

export default Automations;
