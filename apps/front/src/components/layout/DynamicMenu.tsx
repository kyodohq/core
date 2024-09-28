import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SolarChatRoundDotsBoldDuotone from "~icons/solar/chat-round-dots-bold-duotone";
import SolarCompassBigBoldDuotone from "~icons/solar/compass-big-bold-duotone";
import SolarSettingsBoldDuotone from "~icons/solar/settings-bold-duotone";

export function DynamicMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    console.log(containerRef.current);
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: width + 16, height: height + 16 });
    }
  }, []);

  const closedWidth = containerSize.width + "px";
  const closedHeight = containerSize.height + "px";

  const containerVariants = {
    closed: {
      width: closedWidth,
      height: closedHeight,
      y: 0,
    },
    open: {
      width: "95vw",
      height: "65vh",
      y: -20,
    },
  };

  const buttonVariants = {
    closed: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
    open: (i: number) => ({
      opacity: 0,
      y: 20,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const buttons = [
    { text: "Hub", onClick: () => {}, icon: SolarCompassBigBoldDuotone },
    {
      text: "Chat",
      onClick: () => setIsMenuOpen(true),
      icon: SolarChatRoundDotsBoldDuotone,
    },
    { text: "Settings", onClick: () => {}, icon: SolarSettingsBoldDuotone },
  ];

  return (
    <motion.div
      className="bg-zinc-900 rounded-2xl shadow-md fixed bottom-4 left-1/2 flex items-center justify-center overflow-hidden max-w-[61rem] max-h-[42rem]"
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      variants={containerVariants}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{ x: "-50%" }}
    >
      <AnimatePresence mode="wait">
        {!isMenuOpen ? (
          <motion.div
            key="buttons"
            className="flex gap-x-2 absolute bottom-2 left-1/2 -translate-x-1/2"
            initial="open"
            animate="closed"
            exit="open"
            ref={containerRef}
          >
            {buttons.map((button, index) => (
              <motion.div
                key={button.text}
                custom={index}
                variants={buttonVariants}
              >
                <Button
                  onClick={button.onClick}
                  className="bg-transparent hover:bg-zinc-600/50 hover:text-zinc-50 text-zinc-600 !h-fit py-[0.45rem] px-3 text-base font-semibold rounded-lg gap-x-[0.625rem]"
                >
                  <button.icon className="w-5 h-5" />
                  {button.text}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => setIsMenuOpen(false)}
              className="bg-transparent hover:bg-zinc-600/50 hover:text-zinc-50 text-zinc-600 !h-fit py-[0.35rem] text-base font-semibold rounded-lg"
            >
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
