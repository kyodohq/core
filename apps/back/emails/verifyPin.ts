import { resend } from ".";

export const verifyPinEmail = async (email: string, pin: string) => {
  const response = await resend.emails.send({
    from: "Kyodo <support@kyodo.world>",
    to: email,
    subject: `${pin} - Verify your email`,
    html: `
    <h1>Hello!</h1>
    <p>Please verify your email by entering the code below.</p>
    <p>
      <strong>${pin}</strong>
    </p>
  `,
  });
  return response;
};
