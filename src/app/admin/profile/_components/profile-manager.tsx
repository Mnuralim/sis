"use client";

import { useActionState, useState } from "react";
import { School, FileText, History, Target, Plus, Save } from "lucide-react";
import { updateProfile } from "@/actions/profile";
import Image from "next/image";
import type { Profile } from "@prisma/client";
import { ErrorMessage } from "../../_components/error-message";
import { Alert } from "../../_components/alert";
import { useRouter } from "next/navigation";

interface Props {
  profile: Profile | null;
  message?: string;
  alertType?: "success" | "error";
}

interface FormState {
  error: string | null;
}

export const SchoolProfileManager = ({
  profile,
  alertType,
  message,
}: Props) => {
  const [showForm, setShowForm] = useState(!!profile);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const router = useRouter();

  const [state, action, pending] = useActionState(updateProfile, {
    error: null,
  } as FormState);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseAlert = () => {
    router.replace("/admin/profile", { scroll: false });
  };

  // Jika profile belum ada dan form belum ditampilkan, tampilkan tombol untuk menambah
  if (!profile && !showForm) {
    return (
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <School className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Profil Sekolah
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Kelola informasi profil sekolah
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <School className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Profil Sekolah Belum Ada
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Anda belum memiliki profil sekolah. Klik tombol di bawah untuk
            membuat profil sekolah baru.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Tambah Profil Sekolah
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {profile ? "Edit Profil Sekolah" : "Tambah Profil Sekolah"}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {profile
                ? "Update informasi profil sekolah"
                : "Buat profil sekolah baru"}
            </p>
          </div>
        </div>
      </div>
      <ErrorMessage message={state?.error} />
      <form action={action} className="space-y-6">
        {/* Logo Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <School className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-slate-900">
                Logo Sekolah
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Upload logo sekolah (PNG, JPG, JPEG)
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {(selectedLogo || profile?.logo) && (
              <div className="w-32 h-32 rounded-lg border border-slate-200 overflow-hidden bg-white">
                <Image
                  src={selectedLogo || profile?.logo || ""}
                  alt="Logo Preview"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                onChange={handleLogoChange}
                className="sr-only"
                {...(!profile && { required: true })}
              />
              <label
                htmlFor="logo"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-150"
              >
                <School className="w-4 h-4" />
                {profile ? "Ganti Logo" : "Upload Logo"}
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-slate-900">
                Informasi Dasar
              </h2>
              <p className="text-sm text-slate-600 mt-1">Data dasar sekolah</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="schoolName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Nama Sekolah
              </label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                defaultValue={profile?.schoolName || ""}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-150"
                placeholder="Masukkan nama sekolah"
                required
              />
            </div>

            <div>
              <label
                htmlFor="accreditation"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Akreditasi
              </label>
              <select
                id="accreditation"
                name="accreditation"
                defaultValue={profile?.accreditation || ""}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-150"
                required
              >
                <option value="">Pilih Akreditasi</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="Belum Terakreditasi">Belum Terakreditasi</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Alamat
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                defaultValue={profile?.address || ""}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-150 resize-none"
                placeholder="Masukkan alamat lengkap sekolah"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Kontak
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                defaultValue={profile?.contact || ""}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-150"
                placeholder="Nomor telepon / email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Deskripsi Singkat
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={profile?.description || ""}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-150 resize-none"
                placeholder="Deskripsi singkat tentang sekolah"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <History className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-slate-900">Sejarah</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Sejarah singkat sekolah
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="history"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Sejarah Sekolah
              </label>
              <textarea
                id="history"
                name="history"
                rows={6}
                defaultValue={profile?.history || ""}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-150 resize-none"
                placeholder="Ceritakan sejarah singkat sekolah..."
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-slate-900">
                  Visi & Misi
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Visi dan misi sekolah
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="vision"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Visi
                </label>
                <textarea
                  id="vision"
                  name="vision"
                  rows={3}
                  defaultValue={profile?.vision || ""}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-150 resize-none"
                  placeholder="Masukkan visi sekolah..."
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mission"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Misi
                </label>
                <textarea
                  id="mission"
                  name="mission"
                  rows={3}
                  defaultValue={profile?.mission || ""}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors duration-150 resize-none"
                  placeholder="Masukkan misi sekolah..."
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-200">
          <div className="flex gap-3">
            {!profile && (
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                Batal
              </button>
            )}
            <button
              disabled={pending}
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {pending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      <Alert
        isVisible={
          (alertType === "success" || alertType === "error") && !!message
        }
        message={(message as string) || ""}
        onClose={handleCloseAlert}
        type={
          alertType === "success"
            ? "success"
            : alertType === "error"
            ? "error"
            : "success"
        }
        autoClose
      />
      ;
    </div>
  );
};
