import { getAllJobs } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useAllJobsQuery = () => {
  const jobsQuery = useQuery({
    queryKey: ["automations"],
    queryFn: () => getAllJobs(),
  });

  return jobsQuery;
};
