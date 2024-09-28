import { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;

  emailToVerify: string;
  setEmailToVerify: (email: string) => void;

  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  emailToVerify: "",
  setEmailToVerify: (email: string) => set({ emailToVerify: email }),

  user: null,
  setUser: (user: User | null) => set({ user }),
}));
