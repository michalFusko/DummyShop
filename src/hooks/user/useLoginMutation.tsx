import { useMutation } from "@tanstack/react-query";
import { LoginData } from "../../types/user";

/**
 * hook to handle user login with a POST request
 *
 * sends user credentials to the api endpoint
 * @returns  the user data and token if successful
 */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
      expiresInMins = 60,
    }: LoginData) => {
      const res = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    },
  });
};
