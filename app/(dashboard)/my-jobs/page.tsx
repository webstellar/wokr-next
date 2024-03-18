"use client";

import AutomationCard from "@/components/automation/AutomationCard";
import MiniProfileCard from "@/components/profileCard/MiniProfileCard";
import { useAllJobsQuery } from "@/hooks/useAllJobsQuery";
import { useUserQuery } from "@/hooks/useUserQuery";
import { jobData } from "@/types/types";
import Link from "next/link";

const Automations = () => {
  const { data: jobs, status, error } = useAllJobsQuery();
  const { data: user } = useUserQuery();

  if (status === "pending")
    return (
      <section className="mx-auto max-w-screen-2xl px-6 lg:px-8">
        Loading...
      </section>
    );
  if (status === "error") {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  //filter jobs based on user logged in
  const filteredJobs = jobs.filter((job: jobData) => job.owner === user?._id);

  return (
    <section className="mx-auto mb-20">
      <div className="mx-auto grid md:grid-cols-3 justify-between items-start gap-10 max-w-screen-2xl px-6 lg:px-8">
        <div className="md:col-span-2 mt-10 flex flex-col gap-y-5">
          {filteredJobs.map((job: jobData) => (
            <AutomationCard key={job._id} data={job} />
          ))}

          <div className="rounded-2xl flex flex-row justify-center items-center py-5 bg-gray-100">
            <button type="button" title="add new job">
              <Link href="/post-job">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
                  <path
                    d="M22.0469 12L22.0469 32.0926"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M32.0918 22.0464L11.9992 22.0464"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </Link>
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-y-5">
          <MiniProfileCard data={user} />
        </div>
      </div>
    </section>
  );
};

export default Automations;
