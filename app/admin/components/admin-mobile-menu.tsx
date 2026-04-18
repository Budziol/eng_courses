import Link from "next/link";

type Props = {
  close: () => void;
};

const AdminMobileMenu = ({ close }: Props) => {
  return (
    <>
      <nav className="w-full flex flex-col items-center justify-center">
        <Link
          href="/admin/panel"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Panel
        </Link>
        <Link
          href="/admin/uzytkownicy"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Użytkownicy
        </Link>
        <Link
          href="/admin/spotkania"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Spotkania
        </Link>
        <Link
          href="/admin/platnosci"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Płatności
        </Link>
      </nav>
    </>
  );
};
export default AdminMobileMenu;
