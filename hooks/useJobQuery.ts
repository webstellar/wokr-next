import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/utils/api";

export const useJobQuery = (data: string) => {
  const jobQuery = useQuery({
    queryKey: ["automation", data],
    queryFn: () => getJob(data),
  });

  return jobQuery;
};
