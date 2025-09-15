"use client";

import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import type { FullAnnouncement } from "../../_components/announcement-list";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
};

interface Props {
  announcementDetail: FullAnnouncement;
}

export const AnnouncementDetail = ({ announcementDetail }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((paragraph, index) => {
      if (paragraph.trim() === "") return <br key={index} />;

      const boldText = paragraph.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );

      return (
        <p
          key={index}
          className="mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: boldText }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali ke Pengumuman</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {announcementDetail.image && (
            <div className="aspect-[16/9] relative overflow-hidden">
              <Image
                width={640 * 4}
                height={360 * 4}
                src={announcementDetail.image}
                alt={announcementDetail.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(announcementDetail.createdAt.toString())}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>
                  {formatTime(announcementDetail.createdAt.toString())}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{announcementDetail.createdByAdmin.name}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {announcementDetail.title}
            </h1>

            <div className="prose max-w-none text-gray-700 text-base leading-relaxed">
              {renderContent(announcementDetail.content)}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {announcementDetail.createdByAdmin.name}
                    </p>
                  </div>
                </div>

                <div className="text-right text-sm text-gray-500">
                  <p>
                    Dipublikasikan:{" "}
                    {formatDate(announcementDetail.createdAt.toString())}
                  </p>
                  {announcementDetail.updatedAt.toString() !==
                    announcementDetail.createdAt.toString() && (
                    <p>
                      Diperbarui:{" "}
                      {formatDate(announcementDetail.updatedAt.toString())}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
