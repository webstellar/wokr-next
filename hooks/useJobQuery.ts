import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/utils/api";

export const useUserQuery = () => {
  const userQuery = useQuery({
    queryKey: ["automationJob"],
    queryFn: (data: any) => getJob(data?._id),
  });

  return userQuery;
};
