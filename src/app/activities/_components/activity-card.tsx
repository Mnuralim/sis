import type { Activity } from "@prisma/client";
import { Calendar, Users } from "lucide-react";
import Image from "next/image";

interface Props {
  activity: Activity;
  isListView?: boolean;
}

export const ActivityCard = ({ activity, isListView = false }: Props) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
      isListView ? "flex" : ""
    }`}
  >
    <div
      className={`relative overflow-hidden ${
        isListView ? "w-64 flex-shrink-0" : "h-48"
      }`}
    >
      <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
        <Image
          alt={activity.name}
          src={activity.image || "/placeholder-activity.png"}
          width={640}
          height={480}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>

    <div className={`p-6 ${isListView ? "flex-1" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
          {activity.name}
        </h3>
        <div className="flex-shrink-0 ml-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
            <Users className="w-3 h-3 mr-1" />
            Aktif
          </span>
        </div>
      </div>

      <p
        className={`text-gray-600 leading-relaxed mb-4 ${
          isListView ? "" : "text-sm"
        }`}
      >
        {activity.description || "Deskripsi kegiatan akan segera tersedia."}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>
            Diperbarui:{" "}
            {activity.updatedAt
              ? new Date(activity.updatedAt).toLocaleDateString("id-ID")
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  </div>
);
