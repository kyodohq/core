export const initialForm = {
  opacity: 0,
  filter: "blur(10px)",
};

export const animateForm = {
  opacity: 1,
  filter: "blur(0px)",
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

export const exitForm = {
  opacity: 0,
  filter: "blur(10px)",
  transition: {
    duration: 0.2,
    ease: "easeIn",
  },
};
