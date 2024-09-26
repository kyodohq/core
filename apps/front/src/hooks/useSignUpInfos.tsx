import { useMutation } from "@tanstack/react-query";
import { signUpCreateAccount } from "@/services/api/authApi";
import { createUserDTO } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/stores/authStore";
import { useTauriStore } from "./useTauriStore";

export const useSignUpInfos = () => {
  const navigate = useNavigate();
  const { setSessionId } = useTauriStore();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: (data: createUserDTO) => signUpCreateAccount(data),
    onSuccess: (data) => {
      setUser(data.user);
      setSessionId(data.session_id);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
