import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { getUser } from "@/utils/api";
import { userData } from "@/types/types";
import { jobData } from "../types/types";

export const useUserQuery = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const queryClient = useQueryClient();
  const email = String(user?.email);
  const token = String(user?.token);
  const userQuery = useQuery({
    queryKey: ["loggedUser", email],
    queryFn: () => getUser(token),
    initialData: () => {
      return queryClient
        .getQueryData(["users"])
        ?.find((d: userData) => d.email === email);
    },
  });

  return userQuery;
};
