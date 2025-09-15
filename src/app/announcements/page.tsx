import { getAllAnnouncements } from "@/actions/announcement";
import { AnnouncementList } from "./_components/announcement-list";

export default async function AnnouncementPage() {
  const announcements = await getAllAnnouncements({
    limit: "100000000",
    skip: "0",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  return (
    <div>
      <AnnouncementList announcements={announcements.announcements} />
    </div>
  );
}
