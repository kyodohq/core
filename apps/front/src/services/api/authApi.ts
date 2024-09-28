import { useTauriStore } from "@/hooks/useTauriStore";
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

export const verifyIdentity = async (sessionId: string | null) => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionId}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "No status");
  }

  return data;
};

export const logout = async (sessionId: string | null) => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionId}`,
      "Content-Type": "application/json",
    },
  });

  const message = await res.text();
  if (!res.ok) {
    throw new Error(message || "No status");
  }

  return message;
};
