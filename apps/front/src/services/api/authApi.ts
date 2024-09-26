import { createUserDTO } from "@/types/user";
import { fetch } from "@tauri-apps/plugin-http";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const verifyEmail = async (page: "signup" | "signin", email: string) => {
  const body = {
    email: email,
  };

  const res = await fetch(`${BASE_URL}/auth/${page}/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const message = await res.json();
    throw new Error(
      message.error || "Something went wrong with email verification",
    );
  }

  const data = await res.json();
  return data;
};

export const verifyCode = async (
  page: "signup" | "signin",
  email: string,
  code: string,
) => {
  const body = {
    email: email,
    pin: code,
  };

  const res = await fetch(`${BASE_URL}/auth/${page}/verify-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const message = await res.json();
    throw new Error(
      message.error || "Something went wrong with code verification",
    );
  }

  const data = await res.json();
  return data;
};

export const signUpCreateAccount = async (infos: createUserDTO) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  });

  if (!res.ok) {
    const message = await res.json();
    throw new Error(
      message.error || "Something went wrong with account creation",
    );
  }

  const data = await res.json();
  return data;
};
