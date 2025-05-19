import { useMutation } from "@tanstack/react-query";
import { NewUser } from "../../types/user";

/**
 * hook allows to add a new user with POST request
 *
 * @returns mutation object that allows triggering the user creation
 *
 * -sends POST request with users data
 * -returns the created user data on success
 */

export const useAddUserMutation = () => {
  return useMutation({
    mutationFn: async (newUser: NewUser) => {
      const res = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add user");
      return data;
    },
  });
};
