import { useStep } from "@/stores/stepStore";
import { AnimatePresence } from "framer-motion";
import { Header } from "../shared/auth/Header";
import { Legals } from "../shared/auth/Legals";
import { codeSchema, emailSchema } from "../shared/schema";
import { EmailForm } from "../shared/auth/emailForm";
import { CodeForm } from "../shared/auth/codeForm";
import { z } from "zod";
import { motion } from "framer-motion";
import { animateForm, exitForm, initialForm } from "../shared/animation";

export const Signin = () => {
  const { step, setStep } = useStep();

  const onEmailSubmit = (data: z.infer<typeof emailSchema>) => {
    console.log(data);
    setStep("code");
  };

  const onCodeSubmit = (data: z.infer<typeof codeSchema>) => {
    console.log(data);
  };

  return (
    <>
      <div
        className="w-screen h-6 bg-white/0 fixed top-0 z-[9999]"
        data-tauri-drag-region
      />
      <div className="flex flex-col items-center justify-center h-screen">
        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.div
              className="flex flex-col items-center"
              key="email-step"
              initial={initialForm}
              animate={animateForm}
              exit={exitForm}
            >
              <Header
                title="Welcome back!"
                subtitle="First time? "
                linkText="Create an account"
                linkTo="/signup"
              />
              <EmailForm page="signin" buttonText="Sign in" />
              <Legals />
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center"
              key="code-step"
              initial={initialForm}
              animate={animateForm}
              exit={exitForm}
            >
              <CodeForm page="signin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
