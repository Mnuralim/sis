import { getSession } from "@/actions/session";
import { SidebarItem } from "./sidebar-item";
import { getAdmin } from "@/actions/admin";
import { getProfile } from "@/actions/profile";

export async function Sidebar() {
  const session = await getSession();
  const [user, profile] = await Promise.all([
    getAdmin(session?.id || ""),
    getProfile(),
  ]);
  return (
    <>
      <SidebarItem username={user?.name} logoUrl={profile?.logo} />
    </>
  );
}
