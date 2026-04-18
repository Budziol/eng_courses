import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="text-main font-bold text-xl hover:text-main-hover transition-colors duration-300">
        SPEAKT
      </div>
    </Link>
  );
};
export default Logo;
