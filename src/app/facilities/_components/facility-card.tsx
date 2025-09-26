import type { Facility } from "@prisma/client";
import { Calendar } from "lucide-react";
import Image from "next/image";

interface Props {
  facility: Facility;
  isListView?: boolean;
}

export const FacilityCard = ({ facility, isListView = false }: Props) => (
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
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        <Image
          alt={facility.name}
          src={facility.image || "/plh.png"}
          width={640}
          height={480}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>

    <div className={`p-6 ${isListView ? "flex-1" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {facility.name}
        </h3>
        <div className="flex-shrink-0 ml-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            Tersedia
          </span>
        </div>
      </div>

      <p
        className={`text-gray-600 leading-relaxed mb-4 ${
          isListView ? "" : "text-sm"
        }`}
      >
        {facility.description}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>
            Diperbarui:{" "}
            {facility.updatedAt
              ? new Date(facility.updatedAt).toLocaleDateString("id-ID")
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  </div>
);
