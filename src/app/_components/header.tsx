import { getProfile } from "@/actions/profile";
import Navbar from "./navbar";

export async function Header() {
  const profile = await getProfile();
  return (
    <header className="sticky top-0 z-[99999999]">
      <Navbar logoUrl={profile?.logo} schoolName={profile?.schoolName} />
    </header>
  );
}
