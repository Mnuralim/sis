"use client";
import React, { useState } from "react";
import {
  Home,
  FileSpreadsheet,
  Cpu,
  TestTube,
  LineChart,
  Menu,
  X,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  logoUrl?: string;
  schoolName?: string;
}

const Navbar = ({ logoUrl, schoolName }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "/",
    },
    {
      name: "Profil",
      icon: <FileSpreadsheet className="w-5 h-5" />,
      href: "/profile",
    },
    {
      name: "Fasilitas",
      icon: <Cpu className="w-5 h-5" />,
      href: "/facilities",
    },
    {
      name: "Kegiatan",
      icon: <TestTube className="w-5 h-5" />,
      href: "/activities",
    },
    {
      name: "Pengumuman",
      icon: <LineChart className="w-5 h-5" />,
      href: "/announcements",
    },
    {
      name: "Galeri",
      icon: <ImageIcon className="w-5 h-5" />,
      href: "/galleries",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-3">
              <Image
                src={logoUrl || "/logo1.png"}
                width={500}
                height={500}
                alt={"logo"}
                className="object-contain w-12 h-12 aspect-square rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">
                  {schoolName || "Nama Sekolah"}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
