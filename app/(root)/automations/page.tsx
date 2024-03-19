"use client";

import AutomationStoreCard from "@/components/automation/AutomationStoreCard";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useAllJobsQuery } from "@/hooks/useAllJobsQuery";
import { useAllUsersQuery } from "@/hooks/useAllUsersQuery";
import { categorylists, sortBy, tagOptions } from "@/data/data";

import { automationData, jobData, newJobData, userData } from "@/types/types";
import { allTools } from "@/data/data";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const Automations = () => {
  const searchParams = useSearchParams();
  const { data: jobs, status, error } = useAllJobsQuery();
  const { data: users } = useAllUsersQuery();

  const query = searchParams.get("query") || "";

  const jobsArray = jobs?.automations?.map((job: jobData) => {
    const user = users?.find((user: userData) => user._id === job.owner);

    const toolIcons = job.tools.map((automation: automationData) => {
      return allTools.find((tool) => tool.name === automation.automation);
    });
    return { ...job, user, toolIcons };
  });

  const filteredJobs = useMemo(() => {
    if (!query) return jobsArray;

    return jobsArray?.filter((job: newJobData) => {
      return (
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query, jobsArray]);

  const FormSchema = z.object({
    tag: z.string(),
    category: z.string(),
    sortBy: z.string(),
    search: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tag: "",
      category: "",
      sortBy: "",
      search: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {}

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <span className="font-light text-xs md:text-sm">
          {filteredJobs.length} services available
        </span>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex md:flex-row items-center gap-x-4 mt-5 md:m-0 justify-between"
          >
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-x-2">
                  <FormLabel className="text-gray-400">Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-auto md:w-[180px]">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tagOptions.map((tag) => (
                        <SelectItem key={tag.id} value={tag.value.toString()}>
                          {tag.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-x-2">
                  <FormLabel className="text-gray-400">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-auto md:w-[200px]">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorylists.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.value.toString()}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sortBy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-x-2">
                  <FormLabel className="text-gray-400">Sort by</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-auto md:w-[100px]">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sortBy.map((sort) => (
                        <SelectItem key={sort.id} value={sort.value.toString()}>
                          {sort.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-4 justify-between gap-10">
        {filteredJobs &&
          filteredJobs.map((job: newJobData) => (
            <AutomationStoreCard key={job._id} data={job} />
          ))}
      </div>
    </div>
  );
};

export default Automations;
