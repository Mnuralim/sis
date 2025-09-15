import { getAllFacilities } from "@/actions/facility";
import { SchoolFacilities } from "./_components/facilities";

export default async function FacilitiesPage() {
  const facilities = await getAllFacilities({
    limit: "100000000",
    skip: "0",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  return (
    <div>
      <SchoolFacilities facilities={facilities.facilities} />
    </div>
  );
}
