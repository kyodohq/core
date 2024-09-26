import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { codeSchema } from "../schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useAuth } from "@/stores/authStore";
import { useVerifyCode } from "@/hooks/useVerifyCode";

interface Props {
  page: "signup" | "signin";
}

export const CodeForm = ({ page }: Props) => {
  const { mutate, isPending } = useVerifyCode();
  const { emailToVerify } = useAuth();

  const form = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  const { handleSubmit, control } = form;
  const code = useWatch({ control, name: "code" });

  const onCodeSubmit = useCallback(
    async (data: z.infer<typeof codeSchema>) => {
      mutate({ page, email: emailToVerify, code: data.code });
    },
    [emailToVerify, page, mutate],
  );

  useEffect(() => {
    if (code.length === 6) {
      handleSubmit(onCodeSubmit)();
    }
  }, [code, handleSubmit, onCodeSubmit]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onCodeSubmit)} className="flex flex-col">
          <FormField
            control={control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-fit flex flex-col items-center gap-y-4">
                <FormLabel className="ml-2 text-center text-lg w-full">
                  Enter the pin you received by email
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="flex gap-2">
                      {Array.from({ length: 6 }, (_, i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="w-14 h-14 rounded-lg border text-base bg-zinc-50"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          {isPending && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-20">
              Sending code...
            </div>
          )}
        </form>
      </Form>
    </>
  );
};
