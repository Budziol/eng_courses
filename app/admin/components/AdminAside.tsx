import Logo from "@/components/Logo";
import AdminAsideNav from "./AdminAsideNav";
import LogoutButton from "@/components/LogoutButton";

const AdminAside = () => {
  return (
    <aside className="sticky top-0 left-0 w-full h-screen bg-white border-r border-border flex flex-col p-6">
      <div className="mb-8">
        <Logo />
      </div>
      <AdminAsideNav />
      <div className="mt-auto space-y-2">
        <LogoutButton />
      </div>
    </aside>
  );
};
export default AdminAside;
