import Link from "next/link";

type Props = {
  close: () => void;
};

const MobileMenu = ({ close }: Props) => {
  return (
    <>
      <nav className="w-full flex flex-col items-center justify-center">
        <Link
          href="/panel"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Panel
        </Link>
        <Link
          href="/spotkania"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Spotkania
        </Link>
        <Link
          href="/platnosci"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Płatności
        </Link>
        <Link
          href="/ustawienia"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Ustawienia
        </Link>
      </nav>
    </>
  );
};
export default MobileMenu;
