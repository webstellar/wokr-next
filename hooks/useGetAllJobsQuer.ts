import { getAllFilteredJobs } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { SortOrder } from "mongoose";

interface searchProps {
  query: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export const useAllJobsQuery = (query: string) => {


    
  const jobsQuery = useQuery({
    queryKey: ["automations", query],
    queryFn: () => getAllFilteredJobs(query),
  });

  return jobsQuery;
};
