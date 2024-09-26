import { verifyUsername } from "@/services/api/authApi";
import { useQuery } from "@tanstack/react-query";

export const useCheckUsername = (username: string) => {
  return useQuery({
    queryKey: ["checkUsername", username],
    queryFn: () => verifyUsername(username),
    enabled: !!username && username.length >= 3,
    refetchOnWindowFocus: false,
    staleTime: 5000,
    retry: false,
  });
};
