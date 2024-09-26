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
import { infosSchema } from "../schema";
import { useSignUpInfos } from "@/hooks/useSignUpInfos";
import { useAuth } from "@/stores/authStore";

export const InfosForm = () => {
  type infosForm = z.infer<typeof infosSchema>;

  const { mutate, isPending } = useSignUpInfos();
  const { emailToVerify } = useAuth();
  const form = useForm<infosForm>({
    resolver: zodResolver(infosSchema),
    defaultValues: {
      username: "",
      display_name: "",
    },
  });

  const onInfosSubmit = (data: z.infer<typeof infosSchema>) => {
    const fullData = { ...data, email: emailToVerify };
    mutate(fullData);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onInfosSubmit)}
        className="flex flex-col min-w-[22rem] mt-10"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-3 flex items-center">
                Username
                {errors.username && (
                  <>
                    {" - "}
                    <FormMessage className="ml-1 leading-none" />
                  </>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="batman_123"
                  className={clsx(
                    errors.username &&
                      "!border-red-500 focus-visible:!border-red-500 !bg-red-500/5",
                    "rounded-xl bg-zinc-50 placeholder:text-zinc-800/45 border-[0.5px] border-zinc-800/15 focus-visible:border-zinc-800 transition-colors",
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel className="ml-3 flex items-center">
                Display name
                {errors.display_name && (
                  <>
                    {" - "}
                    <FormMessage className="ml-1 leading-none" />
                  </>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Batman"
                  className={clsx(
                    errors.display_name &&
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
          {isPending ? "Creating account..." : "Create your avatar"}
        </Button>
      </form>
    </Form>
  );
};
