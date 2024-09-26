import { useStep } from "@/stores/stepStore";
import { AnimatePresence } from "framer-motion";
import { Header } from "../shared/auth/Header";
import { Legals } from "../shared/auth/Legals";
import { EmailForm } from "../shared/auth/emailForm";
import { CodeForm } from "../shared/auth/codeForm";
import { motion } from "framer-motion";
import { animateForm, exitForm, initialForm } from "../shared/animation";
import { Button } from "../ui/button";
import { InfosForm } from "../shared/auth/infosForm";

export const Signup = () => {
  const { step, setStep } = useStep();

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
                title="Welcome!"
                subtitle="Already have an account? "
                linkText="Sign in"
                linkTo="/signin"
              />
              <EmailForm page="signup" buttonText="Create your account" />
              <Legals />
            </motion.div>
          ) : step === "code" ? (
            <motion.div
              className="flex flex-col items-center"
              key="code-step"
              initial={initialForm}
              animate={animateForm}
              exit={exitForm}
            >
              <CodeForm page="signup" />
            </motion.div>
          ) : (
            step === "infos" && (
              <motion.div
                className="flex flex-col items-center"
                key="infos-step"
                initial={initialForm}
                animate={animateForm}
                exit={exitForm}
              >
                <InfosForm />
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Can't put it inside the AnimatePresence otherwise the position gets fucked up */}
        {step === "code" && (
          <div className="fixed top-14 left-[5rem]">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.5, delay: 0.1 },
              }}
            >
              <Button
                onClick={() => setStep("email")}
                className="bg-transparent text-zinc-800 text-base p-0 hover:bg-transparent hover:underline"
              >
                Back
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};
