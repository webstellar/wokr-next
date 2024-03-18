"use client";

import AutomationStoreCard from "@/components/automation/AutomationStoreCard";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useAllJobsQuery } from "@/hooks/useAllJobsQuery";
import { useAllUsersQuery } from "@/hooks/useAllUsersQuery";
import CreatableSelect from "react-select/creatable";

import { automationData, jobData, newJobData, userData } from "@/types/types";
import { allTools } from "@/data/data";

const Automations = () => {
  const { data: jobs, status, error } = useAllJobsQuery();
  const { data: users } = useAllUsersQuery();

    const [tags, setTags] = useState([tagOptions[0]]);

  const jobsArray = jobs?.automations?.map((job: jobData) => {
    const user = users?.find((user: userData) => user._id === job.owner);

    const toolIcons = job.tools.map((automation: automationData) => {
      return allTools.find((tool) => tool.name === automation.automation);
    });
    return { ...job, user, toolIcons };
  });

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
          {jobsArray.length} services available
        </span>

        <div className="flex">
          <div className="relative mt-2">
            <CreatableSelect
              isMulti
              options={tagOptions}
              defaultValue={tags}
              onChange={(e: any) => setTags(e)}
            />
          </div>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-4 justify-between gap-10">
        {jobsArray &&
          jobsArray.map((job: newJobData) => (
            <AutomationStoreCard key={job._id} data={job} />
          ))}
      </div>
    </div>
  );
};

export default Automations;
