import {
  Home,
  FileSpreadsheet,
  Cpu,
  TestTube,
  LineChart,
  Settings,
  ArrowRight,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

export function AdminDashboard() {
  const quickAccessItems = [
    {
      name: "Profil",
      icon: <FileSpreadsheet className="w-6 h-6" />,
      href: "/admin/profile",
      description: "Kelola informasi profil sekolah",
      color: "bg-blue-50 text-blue-600",
      hoverColor: "hover:bg-blue-100",
    },
    {
      name: "Fasilitas",
      icon: <Cpu className="w-6 h-6" />,
      href: "/admin/facilities",
      description: "Manajemen fasilitas dan peralatan sekolah",
      color: "bg-green-50 text-green-600",
      hoverColor: "hover:bg-green-100",
    },
    {
      name: "Kegiatan",
      icon: <TestTube className="w-6 h-6" />,
      href: "/admin/activities",
      description: "Atur dan pantau kegiatan sekolah",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100",
    },
    {
      name: "Pengumuman",
      icon: <LineChart className="w-6 h-6" />,
      href: "/admin/announcements",
      description: "Buat dan kelola pengumuman penting",
      color: "bg-orange-50 text-orange-600",
      hoverColor: "hover:bg-orange-100",
    },
    {
      name: "Galeri",
      icon: <ImageIcon className="w-6 h-6" />,
      href: "/admin/galleries",
      description: "Kelola galeri sekolah",
      color: "bg-red-50 text-red-600",
      hoverColor: "hover:bg-red-100",
    },
    {
      name: "Akun Saya",
      icon: <Settings className="w-6 h-6" />,
      href: "/admin/settings",
      description: "Pengaturan akun dan keamanan",
      color: "bg-slate-50 text-slate-600",
      hoverColor: "hover:bg-slate-100",
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
          <Home className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">
            Akses cepat ke semua fitur sistem
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickAccessItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`bg-white rounded-lg border border-slate-200 p-6 shadow-sm transition-all duration-150 ${item.hoverColor} hover:shadow-md hover:border-slate-300 group`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center transition-colors duration-150`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-150" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
