import { getAllUsers } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useAllUsersQuery = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  return usersQuery;
};
