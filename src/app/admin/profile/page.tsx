import { getProfile } from "@/actions/profile";
import { SchoolProfileManager } from "./_components/profile-manager";

interface Props {
  searchParams: Promise<{
    message?: string;
    alertType?: "success" | "error";
  }>;
}

export default async function ProfilePage({ searchParams }: Props) {
  const { alertType, message } = await searchParams;
  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <SchoolProfileManager
        profile={profile}
        alertType={alertType}
        message={message}
      />
    </div>
  );
}
