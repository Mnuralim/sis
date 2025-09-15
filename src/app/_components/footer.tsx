import { getProfile } from "@/actions/profile";
import { FooterItem } from "./footer-item";

export async function Footer() {
  const profile = await getProfile();
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <FooterItem profile={profile} />
    </>
  );
}
