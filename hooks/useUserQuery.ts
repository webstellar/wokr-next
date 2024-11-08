import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { getUser } from "@/utils/api";

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
      const userData = (queryClient.getQueryData(["users"]) as any[]) || [];

      if (userData) {
        const user = Array.from(userData).find((d: any) => d.email === email);
        if (user) {
          return user;
        }
      }
      return null;
    },
  });

  return userQuery;
};
