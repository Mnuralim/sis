import React from "react";
import { MapPin, Phone, Award, Clock, Target, Eye } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { getProfile } from "@/actions/profile";
import Image from "next/image";

export default async function SchoolProfilePage() {
  const schoolProfile = await getProfile();
  if (!schoolProfile) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center">
                <Image
                  width={640}
                  height={640}
                  src={schoolProfile.logo}
                  alt="School Logo"
                  className="w-20 h-20 object-contain rounded-full border-4 border-white shadow-md"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {schoolProfile.schoolName}
              </h1>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{schoolProfile.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Akreditasi: {schoolProfile.accreditation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tentang Sekolah
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              {schoolProfile.description}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <InfoCard
            icon={Phone}
            title="Informasi Kontak"
            content={schoolProfile.contact}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <InfoCard icon={Eye} title="Visi" content={schoolProfile.vision} />
          <InfoCard
            icon={Target}
            title="Misi"
            content={schoolProfile.mission}
          />
        </div>

        <div className="mb-12">
          <InfoCard
            icon={Clock}
            title="Sejarah Sekolah"
            content={schoolProfile.history}
          />
        </div>
      </div>
    </div>
  );
}
