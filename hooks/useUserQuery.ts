import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { getUser } from "@/utils/api";

export const useUserQuery = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const email = String(user?.email);
  const token = String(user?.token);
  const userQuery = useQuery({
    queryKey: ["loggedUser", email],
    queryFn: () => getUser(token),
  });

  return userQuery;
};
