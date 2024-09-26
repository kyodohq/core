import { Link } from "react-router-dom";

export const Legals = () => {
  return (
    <p className="text-center text-zinc-400 mt-12 max-w-[27rem]">
      You acknowledge that you have read and agree to our{" "}
      <Link
        to="/"
        className="text-zinc-800 hover:text-zinc-800/65 transition-colors"
      >
        Terms of Service
      </Link>
      , and to our{" "}
      <Link
        to="/"
        className="text-zinc-800 hover:text-zinc-800/65 transition-colors"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
};
