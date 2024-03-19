import { getAllFilteredJobs } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { SortOrder } from "mongoose";

interface QueryParams {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
}

export const useGetAllJobsQuery = ({
  query,
  pageNumber = 1,
  pageSize = 10,
  sortBy = "Desc",
}: QueryParams) => {
  const jobsQuery = useQuery({
    queryKey: ["automations", query],
    queryFn: () =>
      getAllFilteredJobs({
        query,
        pageNumber,
        pageSize,
        sortBy,
      }),
    enabled: !!query,
  });

  return jobsQuery;
};

/*
{
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  }
  */
