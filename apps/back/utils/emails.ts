import { resend } from "resend";

export const resend = new resend(process.env.resend_api_key);
