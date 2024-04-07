"use client";

import AutomationStoreCard from "@/components/automation/AutomationStoreCard";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useAllJobsQuery } from "@/hooks/useAllJobsQuery";
import { useAllUsersQuery } from "@/hooks/useAllUsersQuery";
import { categorylists, sortBy, tagOptions } from "@/data/data";
import CreatableSelect from "react-select/creatable";

import { automationData, jobData, newJobData, userData } from "@/types/types";
import { allTools } from "@/data/data";
import { Suspense, useMemo, useState, useEffect } from "react";
import Select from "react-select";
import Image from "next/image";
import Pagination from "@/components/pagination/Pagination";

export const dynamic = "force-dynamic";

interface objectProps {
  id: number;
  value: string;
  label: string;
}

const Automations = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { data: jobs, status, error } = useAllJobsQuery();
  const { data: users } = useAllUsersQuery();

  const [sort, setSort] = useState<objectProps>({
    id: 1,
    label: "Asc",
    value: "Asc",
  });
  const [tags, setTags] = useState<objectProps[]>([]);
  const [categories, setCategories] = useState<objectProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const query = searchParams.query;

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const jobsArray = jobs?.map((job: jobData) => {
    const user = users?.find((user: userData) => user._id === job.owner);
    const toolIcons = job.tools.map((automation: automationData) => {
      return allTools.find((tool) => tool.name === automation.automation);
    });
    return { ...job, user, toolIcons };
  });

  const publishedPosts = jobsArray?.filter(
    (job: jobData) => job.status === "Published"
  );

  const filteredJobs = useMemo(() => {
    let result = publishedPosts;

    if (query) {
      result = result?.filter(
        (job: jobData) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (categories.length >= 1) {
      result = result?.filter((job: jobData) =>
        categories.some(
          (cat) =>
            cat.value ===
            job.categories.find(
              (jobCat: { name: string }) => jobCat.name === cat.value
            )?.name
        )
      );
    }

    if (tags.length >= 1) {
      result = result?.filter((job: jobData) =>
        job.tags.some((jobTag: { name: string }) =>
          tags.some((t) => t.value === jobTag.name)
        )
      );
    }

    if (sort?.value === "Desc") {
      result?.sort((a: any, b: any) => (a.createdAt < b.createdAt ? 1 : -1)); // Descending
    } else if (sort?.value === "Asc") {
      result?.sort((a: any, b: any) => (a.createdAt > b.createdAt ? 1 : -1)); // Ascending
    }

    return result;
  }, [publishedPosts, query, categories, tags, sort?.value]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs?.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredJobs]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (status === "pending") {
    return (
      <section className="mx-auto flex flex-col justify-center items-center h-[50%]">
        <div className="my-6 flex items-center justify-center h-min">
          <Image
            src="/images/wokr-loader.gif"
            alt="loading gif"
            width={100}
            height={100}
            className="h-10 w-10"
          />
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto flex flex-col max-w-screen-2xl item-center justify-start p-6 lg:px-8 gap-y-32">
        <Breadcrumb
          homeElement={"Home"}
          separator={<span className="text-xs md:text-sm font-light"> | </span>}
          activeClasses="text-gray-800 font-normal cursor-default"
          containerClasses="flex flex-wrap gap-y-2"
          listClasses="hover:underline mx-2 text-gray-500 text-xs md:text-sm font-light"
          capitalizeLinks
        />
      </div>
    );
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
      {query && (
        <div className="flex justify-start">
          <h3 className="font-normal text-lg md:text-2xl">
            Result for
            <span className="ml-2 font-bold">{query}</span>
          </h3>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <span className="font-light text-xs md:text-sm">
          {filteredJobs.length} services available
        </span>

        <div className="flex flex-row justify-between items-center gap-x-5">
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="relative mt-2">
              <CreatableSelect
                isMulti
                options={categorylists}
                defaultValue={categories}
                onChange={(e: any) => setCategories(e)}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tags
            </label>
            <div className="relative mt-2">
              <CreatableSelect
                isMulti
                options={tagOptions}
                defaultValue={tags}
                onChange={(e: any) => setTags(e)}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Sort by
            </label>
            <div className="relative mt-2">
              <Select
                options={sortBy}
                defaultValue={sort}
                onChange={(e: any) => setSort(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <Suspense
        key={searchParams.query}
        fallback={
          <div className="my-6 flex items-center justify-center">
            <Image
              src="/images/wokr-loader.gif"
              alt="loading gif"
              width={100}
              height={100}
              className="h-10 w-10"
            />
          </div>
        }
      >
        {isLoading ? (
          <div className="my-6 flex items-center justify-center">
            <Image
              src="/images/wokr-loader.gif"
              alt="loading gif"
              width={100}
              height={100}
              className="h-10 w-10"
            />
          </div>
        ) : paginatedJobs.length > 0 ? (
          <div className="my-6 grid grid-cols-1 md:grid-cols-4 justify-between gap-10">
            {paginatedJobs &&
              paginatedJobs.map((job: newJobData) => (
                <AutomationStoreCard key={job._id} data={job} />
              ))}
          </div>
        ) : (
          <div className="my-6 text-center">
            No jobs found matching your criteria
          </div>
        )}

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredJobs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
};

export default Automations;
