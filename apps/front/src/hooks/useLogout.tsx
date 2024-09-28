import { useQuery } from "@tanstack/react-query";
import { logout } from "@/services/api/authApi";
import { useTauriStore } from "./useTauriStore";
import { useAuth } from "@/stores/authStore";

export const useLogout = () => {
  const { getSessionId, clearSessionId } = useTauriStore();
  const { setIsAuthenticated, setUser, isAuthenticated } = useAuth();

  const query = useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      const sessionId = await getSessionId();
      const res = await logout(sessionId);
      await clearSessionId();
      setIsAuthenticated(false);
      setUser(null);

      return res;
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  function triggerLogout() {
    if (isAuthenticated) {
      query.refetch();
    }
  }

  return { ...query, triggerLogout };
};
