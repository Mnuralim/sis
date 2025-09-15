import { getSession } from "@/actions/session";
import { Navbar } from "./navbar";
import { getAdmin } from "@/actions/admin";

export async function Header() {
  const session = await getSession();
  const user = await getAdmin(session?.id || "");

  return (
    <header className="bg-slate-50 sticky top-0 flex h-16 w-full items-center justify-between border-b border-gray-200 z-[98] px-4 md:px-6 ">
      <Navbar username={user?.name} />
    </header>
  );
}
