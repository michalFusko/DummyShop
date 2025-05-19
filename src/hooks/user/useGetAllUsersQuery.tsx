import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";

/**
 * @returns list of all available users
 */

export const useGetAllUsersQuery = () => {
  return useQuery<User[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/users");
      if (!res.ok) throw new Error("Error fething users");
      const data = await res.json();
      return data.users;
    },
  });
};
