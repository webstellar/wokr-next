import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJob } from "@/utils/api";
import { jobData } from "@/types/types";

export const useJobQuery = (data: string) => {
  const queryClient = useQueryClient();
  const jobQuery = useQuery({
    queryKey: ["automation", data],
    queryFn: () => getJob(data),
    initialData: () => {
      return queryClient
        .getQueryData(["automations"])
        ?.find((d: jobData) => d._id === data);
    },
  });

  return jobQuery;
};
