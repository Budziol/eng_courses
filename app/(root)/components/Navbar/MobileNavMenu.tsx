import Link from "next/link";
import { GhostLink, PrimaryLink } from "../../../../components/Links";
import { User } from "@prisma/client";

const MobileNavMenu = ({ user, close }: { user: User; close: () => void }) => {
  return (
    <>
      <nav className="w-full flex flex-col items-center justify-center">
        <Link
          href="/#onas"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          O nas
        </Link>
        <Link
          href="/#kursy"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Kursy
        </Link>
        <Link
          href="/#poziomy"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          Poziomy
        </Link>
        <Link
          href="/#faq"
          onClick={close}
          className="w-full px-4 rounded-lg py-4 text-base! hover:bg-secondary hover:text-main"
        >
          FAQ
        </Link>
      </nav>
      <div className="w-full mt-auto flex flex-col items-center gap-8 pt-8 border-t border-border">
        {user ? (
          <PrimaryLink
            href="/panel"
            onClick={close}
            className="rounded-md! px-4! py-2!"
            linkClassName="w-full"
          >
            Panel
          </PrimaryLink>
        ) : (
          <>
            <GhostLink
              href="/logowanie"
              onClick={close}
              className="rounded-md! px-4! py-2!"
              linkClassName="w-full"
            >
              Logowanie
            </GhostLink>
            <PrimaryLink
              href="/rejestracja"
              onClick={close}
              className="rounded-md! px-4! py-2!"
              linkClassName="w-full"
            >
              Rejestracja
            </PrimaryLink>
          </>
        )}
      </div>
    </>
  );
};
export default MobileNavMenu;
