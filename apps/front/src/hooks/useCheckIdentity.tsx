import { verifyIdentity } from "@/services/api/authApi";
import { useQuery } from "@tanstack/react-query";
import { useTauriStore } from "./useTauriStore";
import { useAuth } from "@/stores/authStore";

export const useCheckIdentity = () => {
  const { getSessionId } = useTauriStore();
  const { setIsAuthenticated, setUser } = useAuth();

  return useQuery({
    queryKey: ["checkIdentity"],
    queryFn: async () => {
      const sessionId = await getSessionId();
      console.log(sessionId);
      if (!sessionId) {
        throw new Error("No session id");
      }

      const res = await verifyIdentity(sessionId);

      setIsAuthenticated(true);
      setUser(res.user);

      return res;
    },
  });
};
