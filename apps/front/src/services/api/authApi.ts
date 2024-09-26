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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.error || "Something went wrong with email verification",
    );
  }

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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      data.error || "Something went wrong with code verification",
    );
  }

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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong with account creation");
  }

  return data;
};

export const verifyUsername = async (username: string) => {
  const res = await fetch(`${BASE_URL}/auth/verify-username`, {
    method: "POST",
    body: username,
  });

  const data = await res.text();
  if (!res.ok) {
    throw new Error(data || "No status");
  }

  return data;
};
