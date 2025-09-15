"use client";
import {
  MapPin,
  Phone,
  Mail,
  Award,
  BookOpen,
  Star,
  ArrowRight,
} from "lucide-react";
import { Carousel } from "./carousel";
import type {
  Activity,
  Announcement,
  Facility,
  Gallery,
  Profile,
} from "@prisma/client";
import Image from "next/image";

interface Props {
  profile: Profile;
  announcements: Announcement[];
  facilities: Facility[];
  activities: Activity[];
  galleries: Gallery[];
}

export const SchoolLandingPage = ({
  profile,
  announcements,
  facilities,
  activities,
  galleries,
}: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section
        id="beranda"
        className="pt-16 min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-purple-700 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-[calc(100vh-180px)]">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Masa Depan
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  {" "}
                  Cerah
                </span>
                <br />
                Dimulai dari Sini
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                {profile.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Hubungi Kami
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center text-8xl">
                🎓
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm">
                Akreditasi {profile.accreditation}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full animate-bounce"></div>
      </section>

      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                1000+
              </div>
              <div className="text-gray-600 mt-2">Siswa Aktif</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 group-hover:scale-110 transition-transform">
                50+
              </div>
              <div className="text-gray-600 mt-2">Guru Berpengalaman</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-green-600 group-hover:scale-110 transition-transform">
                15+
              </div>
              <div className="text-gray-600 mt-2">Kegiatan Sekolah</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 group-hover:scale-110 transition-transform">
                40
              </div>
              <div className="text-gray-600 mt-2">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="profil"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tentang Sekolah Kami
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Award className="mr-3 text-yellow-500" size={28} />
                  Sejarah
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {profile.history}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="mr-3 text-blue-500" size={28} />
                  Visi
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {profile.vision}
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BookOpen className="mr-3 text-green-500" size={28} />
                Misi
              </h3>
              <p className="text-gray-600 leading-relaxed">{profile.mission}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Pengumuman Terbaru
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">
                    <Image
                      src={announcement.image!}
                      alt={announcement.title}
                      width={500}
                      height={500}
                      className="rounded-xl object-cover h-48 w-full mb-4 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {announcement.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(announcement.createdAt).toLocaleDateString(
                        "id-ID"
                      )}
                    </span>
                    <ArrowRight
                      className="text-blue-500 group-hover:translate-x-1 transition-transform"
                      size={20}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="fasilitas"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Fasilitas Unggulan
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    <Image
                      src={facility.image!}
                      alt={facility.name}
                      width={500}
                      height={500}
                      className="rounded-xl object-cover h-48 w-full mb-4 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kegiatan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Kegiatan Sekolah
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    <Image
                      src={activity.image!}
                      alt={activity.name}
                      width={500}
                      height={500}
                      className="rounded-xl object-cover h-48 w-full mb-4 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {activity.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="galeri"
        className="py-20 bg-gradient-to-br from-purple-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Galeri Kegiatan
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          <Carousel items={galleries} />
        </div>
      </section>

      <section
        id="kontak"
        className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hubungi Kami</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <MapPin className="text-yellow-300" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Alamat</h3>
                  <p className="text-blue-100">{profile.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Phone className="text-yellow-300" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Telepon</h3>
                  <p className="text-blue-100">{profile.contact}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Mail className="text-yellow-300" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-blue-100">info@sdnmwsk2.sch.id</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Pesan Anda"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
