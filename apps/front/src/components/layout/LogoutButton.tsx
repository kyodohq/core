import { useLogout } from "@/hooks/useLogout";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const { triggerLogout } = useLogout();

  return (
    <Button className="absolute left-4 bottom-4" onClick={triggerLogout}>
      Logout
    </Button>
  );
};
