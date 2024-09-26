import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/services/api/authApi";
import { useStep } from "@/stores/stepStore";

interface MutationProps {
  page: "signup" | "signin";
  email: string;
}

export const useVerifyEmail = () => {
  const { setStep } = useStep();
  return useMutation({
    mutationFn: ({ page, email }: MutationProps) => verifyEmail(page, email),
    onSuccess: () => {
      setStep("code");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
