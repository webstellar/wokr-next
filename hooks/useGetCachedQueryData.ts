import { QueryClient } from "@tanstack/react-query";

export const useGetCachedQueryData = (key: string) => {
  const queryClient = new QueryClient();
  const data = queryClient.getQueryData([key]);
  return data;
};
