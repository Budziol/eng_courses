import Logo from "@/components/Logo";
import UserAsideNav from "./UserAsideNav";
import LogoutButton from "@/components/LogoutButton";

const UserAside = () => {
  return (
    <aside className="bg-white w-64 shrink-0 border-r border-border hidden lg:flex flex-col p-6">
      <div className="mb-8">
        <Logo />
      </div>
      <UserAsideNav />
      <div className="mt-auto space-y-2">
        <LogoutButton />
      </div>
    </aside>
  );
};
export default UserAside;
