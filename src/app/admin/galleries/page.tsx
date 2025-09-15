import { GalleryList } from "./_components/list";
import { getAllGallery } from "@/actions/gallery";

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

export default async function GalleryPage({ searchParams }: Props) {
  const { success, message, error, limit, skip } = await searchParams;
  const galleryResult = await getAllGallery({
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
              Gallery Management
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Kelola data galeri disini
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <GalleryList
          galleries={galleryResult.galleries}
          pagination={{
            currentPage: galleryResult.currentPage,
            itemsPerPage: galleryResult.itemsPerPage,
            totalItems: galleryResult.totalCount,
            totalPages: galleryResult.totalPages,
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
