"use client";

import type { Prisma } from "@prisma/client";
import { Calendar, Clock, User, ChevronRight, Bell } from "lucide-react";
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

const truncateContent = (content: string, maxLength = 120) => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + "...";
};

export type FullAnnouncement = Prisma.AnnouncementGetPayload<{
  include: {
    createdByAdmin: {
      select: {
        name: true;
        username: true;
      };
    };
    updatedByAdmin: {
      select: {
        name: true;
        username: true;
      };
    };
  };
}>;

interface Props {
  announcements: FullAnnouncement[];
}

export const AnnouncementList = ({ announcements }: Props) => {
  const router = useRouter();
  const [latestAnnouncement] = announcements;
  const otherAnnouncements = announcements.slice(1);

  const handleAnnouncementClick = (id: string) => {
    router.push(`/announcements/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3 mb-2">
            <Bell className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Pengumuman</h1>
          </div>
          <p className="text-gray-600">
            Dapatkan informasi terkini seputar kegiatan dan kebijakan sekolah
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {latestAnnouncement && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-gray-900">
                Pengumuman Terbaru
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {latestAnnouncement.image && (
                <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
                  <Image
                    width={640 * 4}
                    height={360 * 4}
                    src={latestAnnouncement.image || "/plh.png"}
                    alt={latestAnnouncement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(latestAnnouncement.createdAt.toString())}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatTime(latestAnnouncement.createdAt.toString())}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{latestAnnouncement.createdByAdmin.name}</span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {latestAnnouncement.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {truncateContent(latestAnnouncement.content, 200)}
                </p>

                <button
                  onClick={() => handleAnnouncementClick(latestAnnouncement.id)}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {otherAnnouncements.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pengumuman Lainnya
            </h2>

            <div className="space-y-4">
              {otherAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all hover:border-gray-300 cursor-pointer"
                  onClick={() => handleAnnouncementClick(announcement.id)}
                >
                  <div className="flex">
                    {announcement.image && (
                      <div className="w-32 md:w-48 flex-shrink-0">
                        <Image
                          width={192 * 4}
                          height={192 * 4}
                          src={announcement.image}
                          alt={announcement.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {formatDate(announcement.createdAt.toString())}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{announcement.createdByAdmin.name}</span>
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {announcement.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {truncateContent(announcement.content)}
                      </p>

                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <span>Baca selengkapnya</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {announcements.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada pengumuman
            </h3>
            <p className="text-gray-500">
              Pengumuman terbaru akan ditampilkan di sini
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
