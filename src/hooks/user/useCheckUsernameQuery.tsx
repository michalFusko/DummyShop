import { useQuery } from "@tanstack/react-query";

/**
 * hook checks if username exists in the database
 *
 * @param userName users input for username
 * @returns boolean value to determine if username exist
 */

export const useCheckUsernameQuery = (userName: string | undefined) => {
  return useQuery<boolean>({
    queryKey: ["userName", userName],
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/users/search?q=${userName}`,
      );
      const data = await res.json();
      const matchingUsers = data.users.find(
        (user: { username: string }) => user.username === userName,
      );
      return matchingUsers ? true : false;
    },
    enabled: !!userName,
  });
};
