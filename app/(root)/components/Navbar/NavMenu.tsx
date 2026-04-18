import Link from "next/link";
import { GhostLink, PrimaryLink } from "../../../../components/Links";

const NavMenu = ({ user }: { user: any }) => {
  return (
    <>
      <nav className="hidden md:flex flex-row items-center justify-center gap-8">
        <Link href="/#onas" className="">
          O nas
        </Link>
        <Link href="/#kursy" className="">
          Kursy
        </Link>
        <Link href="/#poziomy" className="">
          Poziomy
        </Link>
        <Link href="/#faq" className="">
          FAQ
        </Link>
      </nav>
      <div className="hidden md:flex flex-row items-center gap-2 w-[242px]">
        {user ? (
          <PrimaryLink
            href="/panel"
            linkClassName="ml-auto"
            className="rounded-md! px-4! py-2!"
          >
            Panel
          </PrimaryLink>
        ) : (
          <>
            <GhostLink href="/logowanie" className="rounded-md! px-4! py-2!">
              Logowanie
            </GhostLink>
            <PrimaryLink
              href="/rejestracja"
              className="rounded-md! px-4! py-2!"
            >
              Rejestracja
            </PrimaryLink>
          </>
        )}
      </div>
    </>
  );
};
export default NavMenu;
