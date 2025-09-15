import type { Gallery } from "@prisma/client";
import { Calendar } from "lucide-react";
import Image from "next/image";

interface Props {
  gallery: Gallery;
  isListView?: boolean;
  onImageClick?: () => void;
}

export const GalleryCard = ({
  gallery,
  isListView = false,
  onImageClick,
}: Props) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
      isListView ? "flex" : ""
    }`}
  >
    <div
      className={`relative overflow-hidden cursor-pointer ${
        isListView ? "w-64 flex-shrink-0" : "h-48"
      }`}
      onClick={onImageClick}
    >
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <Image
          alt={gallery.title}
          src={gallery.image || "/placeholder-image.png"}
          width={640}
          height={480}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div className={`p-6 ${isListView ? "flex-1" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {gallery.title}
        </h3>
        <div className="flex-shrink-0 ml-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Gallery
          </span>
        </div>
      </div>

      {gallery.description && (
        <p
          className={`text-gray-600 leading-relaxed mb-4 ${
            isListView ? "" : "text-sm"
          }`}
        >
          {gallery.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>
            Diperbarui:{" "}
            {gallery.updatedAt
              ? new Date(gallery.updatedAt).toLocaleDateString("id-ID")
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  </div>
);
