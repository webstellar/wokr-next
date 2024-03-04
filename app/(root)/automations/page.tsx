"use client";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useAllJobsQuery } from "@/hooks/useAllJobsQuery";
import { jobData } from "@/types/types";
import Link from "next/link";

const Automations = () => {
  const { data: jobs, status, error } = useAllJobsQuery();

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
    </div>
  );
};

export default Automations;
