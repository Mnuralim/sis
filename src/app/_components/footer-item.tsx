"use client";
import type { Profile } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  profile: Profile;
}

export const FooterItem = ({ profile }: Props) => {
  const pathName = usePathname();
  if (pathName.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={profile.logo}
                alt="School Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="font-bold text-xl">{profile.schoolName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Menciptakan generasi unggul dengan pendidikan berkualitas dan
              berkarakter.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Menu Cepat</h3>
            <div className="space-y-2">
              <Link
                href="#beranda"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Beranda
              </Link>
              <Link
                href="#profil"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Profil
              </Link>
              <Link
                href="#fasilitas"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Fasilitas
              </Link>
              <Link
                href="#kegiatan"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Kegiatan
              </Link>
              <Link
                href="#galeri"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Galeri
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Kontak</h3>
            <div className="space-y-2 text-gray-400">
              <p>{profile.address}</p>
              <p>{profile.contact}</p>
              <p>info@sdnmwsk2.sch.id</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 {profile.schoolName}. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};
