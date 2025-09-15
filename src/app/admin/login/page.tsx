import { getProfile } from "@/actions/profile";
import { LoginForm } from "./_components/login-form";

export default async function LoginPage() {
  const [profile] = await Promise.all([getProfile()]);
  return (
    <div className="min-h-screen fixed w-full top-0 left-0 overflow-hidden flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md relative z-10">
        <LoginForm logoUrl={profile?.logo} />
      </div>
    </div>
  );
}
