import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { emailSchema } from "../schema";
import { useAuth } from "@/stores/authStore";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";

interface Props {
  page: "signup" | "signin";
  buttonText: string;
}

export const EmailForm = ({ page, buttonText }: Props) => {
  const { mutate, isError, isPending, error } = useVerifyEmail();
  const { setEmailToVerify } = useAuth();

  const onEmailSubmit = (data: z.infer<typeof emailSchema>) => {
    setEmailToVerify(data.email);
    mutate({ page, email: data.email });
  };

  const form = useForm<emailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  type emailForm = z.infer<typeof emailSchema>;

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onEmailSubmit)}
        className="flex flex-col min-w-[18rem] mt-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={clsx(
                  "ml-3 flex items-center",
                  isError && "text-red-500",
                )}
              >
                Email
                {(errors.email || isError) && (
                  <>
                    {" - "}
                    <FormMessage className="ml-1 leading-none">
                      {errors.email?.message || error?.message}
                    </FormMessage>
                  </>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="example@gmail.com"
                  className={clsx(
                    (errors.email || isError) &&
                      "!border-red-500 focus-visible:!border-red-500 !bg-red-500/5",
                    "rounded-xl bg-zinc-50 placeholder:text-zinc-800/45 border-[0.5px] border-zinc-800/15 focus-visible:border-zinc-800 transition-colors",
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-4 bg-zinc-800 text-zinc-50 rounded-xl hover:bg-zinc-700 active:scale-95 transition-all ease-spring duration-300"
        >
          {isPending ? "Sending email..." : buttonText}
        </Button>
      </form>
    </Form>
  );
};
