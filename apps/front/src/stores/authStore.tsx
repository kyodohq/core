import { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  emailToVerify: string;
  setEmailToVerify: (email: string) => void;

  user: User | null;
  setUser: (user: User) => void;
}

export const useAuth = create<AuthState>((set) => ({
  emailToVerify: "",
  setEmailToVerify: (email: string) => set({ emailToVerify: email }),

  user: null,
  setUser: (user: User) => set({ user }),
}));
