import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
}

export const Header = ({ title, subtitle, linkText, linkTo }: Props) => {
  return (
    <>
      <div className="w-20 h-20 aspect-square bg-zinc-900 rounded-2xl shadow-md"></div>
      <h2 className="text-center text-4xl font-medium text-zinc-80 mt-[2.5rem]">
        {title}
      </h2>
      <h3 className="text-center text-zinc-400 mt-1">
        {subtitle}
        <Link
          to={linkTo}
          className="text-zinc-800 hover:text-zinc-800/65 transition-colors"
        >
          {linkText}
        </Link>
      </h3>
    </>
  );
};
