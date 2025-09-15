import { getAllActivity } from "@/actions/activity";
import { SchoolActivities } from "./_components/activities";

export default async function ActivitiesPage() {
  const activities = await getAllActivity({
    limit: "100000000",
    skip: "0",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  return (
    <div>
      <SchoolActivities activities={activities.activities} />
    </div>
  );
}
