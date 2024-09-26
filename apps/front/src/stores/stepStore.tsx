import { create } from "zustand";

interface StepState {
  step: string;
  setStep: (step: string) => void;
}

export const useStep = create<StepState>((set) => ({
  step: "email",
  setStep: (step: string) => set({ step }),
}));
