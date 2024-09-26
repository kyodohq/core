import { useMutation } from "@tanstack/react-query";
import { verifyCode } from "@/services/api/authApi";
import { useStep } from "@/stores/stepStore";
import { useAuth } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { useTauriStore } from "./useTauriStore";

interface MutationProps {
  page: "signup" | "signin";
  email: string;
  code: string;
}

export const useVerifyCode = () => {
  const { setStep } = useStep();
  const { setUser } = useAuth();
  const { setSessionId } = useTauriStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ page, email, code }: MutationProps) =>
      verifyCode(page, email, code),
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        setSessionId(data.session_id);
        navigate("/");
      } else {
        setStep("infos");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
