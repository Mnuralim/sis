import { getAllFacilities } from "@/actions/facility";
import { FacilitiesList } from "./_components/list";

interface Props {
  searchParams: Promise<{
    success?: string;
    error?: string;
    message?: string;
    limit?: string;
    skip?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function FacilitiesPage({ searchParams }: Props) {
  const { success, message, error, limit, skip } = await searchParams;
  const facilitiesResult = await getAllFacilities({
    skip: skip || "0",
    limit: limit || "10",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-lg">
      <div className="px-6 py-6 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Facilities Management
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Kelola data fasilitas disini
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <FacilitiesList
          facilities={facilitiesResult.facilities}
          pagination={{
            currentPage: facilitiesResult.currentPage,
            itemsPerPage: facilitiesResult.itemsPerPage,
            totalItems: facilitiesResult.totalCount,
            totalPages: facilitiesResult.totalPages,
            preserveParams: {
              limit,
              skip,
            },
          }}
          alertType={success ? "success" : error ? "error" : undefined}
          message={message}
        />
      </div>
    </div>
  );
}
