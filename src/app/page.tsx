import { getProfile } from "@/actions/profile";
import { SchoolLandingPage } from "./_components/dashboard";
import { getAllAnnouncements } from "@/actions/announcement";
import { getAllFacilities } from "@/actions/facility";
import { getAllActivity } from "@/actions/activity";
import { getAllGallery } from "@/actions/gallery";

export default async function Home() {
  const [profile, announcements, facilities, activities, galleries] =
    await Promise.all([
      getProfile(),
      getAllAnnouncements({
        limit: "3",
        skip: "0",
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
      getAllFacilities({
        limit: "6",
        skip: "0",
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
      getAllActivity({
        limit: "6",
        skip: "0",
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
      getAllGallery({
        limit: "5",
        skip: "0",
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    ]);
  if (!profile) {
    return <div>Loading...</div>;
  }
  return (
    <SchoolLandingPage
      profile={profile}
      announcements={announcements.announcements}
      facilities={facilities.facilities}
      activities={activities.activities}
      galleries={galleries.galleries}
    />
  );
}
