import { getAllGallery } from "@/actions/gallery";
import { GalleryList } from "./_components/galleries";

export default async function GalleriesPage() {
  const galleries = await getAllGallery({
    limit: "100000000",
    skip: "0",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  return (
    <div>
      <GalleryList galleries={galleries.galleries} />
    </div>
  );
}
