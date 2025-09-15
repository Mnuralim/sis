import { getAnnouncementById } from "@/actions/announcement";
import { AnnouncementDetail } from "./_components/announcement-detail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AnnouncementDetailPage({ params }: Props) {
  const { id } = await params;
  const announcement = await getAnnouncementById(id);

  if (!announcement) {
    return <div>Announcement not found</div>;
  }
  return (
    <div>
      <AnnouncementDetail announcementDetail={announcement} />
    </div>
  );
}
