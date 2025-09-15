interface SessionPayload {
  id: string;
  username: string;
  expiresAt: Date;
}

interface FormState {
  error: string | null;
}

interface PaginationParams {
  limit: string;
  skip: string;
  sortBy: string;
  sortOrder: string;
}

interface FacilityPaginationParams extends PaginationParams {
  search?: string;
}
interface ActivityPaginationParams extends PaginationParams {
  search?: string;
}

interface AnnouncementPaginationParams extends PaginationParams {
  search?: string;
}

interface GalleryPaginationParams extends PaginationParams {
  search?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];
  className?: string;
  preserveParams?: Record<string, string | number | boolean | undefined>;
  labels?: {
    itemsLabel?: string;
    showingText?: string;
    displayingText?: string;
    ofText?: string;
    prevText?: string;
    nextText?: string;
  };
}
