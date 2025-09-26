"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnnouncementForm } from "./form";
import { Tabel, type TabelColumn } from "../../_components/tabel";
import { deleteFacility } from "@/actions/facility";
import { Pagination } from "../../_components/pagination";
import { Modal } from "../../_components/modal";
import { Alert } from "../../_components/alert";
import Image from "next/image";
import type { Announcement } from "@prisma/client";

interface Props {
  alertType?: "success" | "error";
  message?: string;
  announcements: Announcement[];
  pagination: PaginationProps;
}

export const AnnouncementList = ({
  alertType,
  announcements,
  message,
  pagination,
}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const router = useRouter();

  const handleOpenModal = (announcement?: Announcement) => {
    setIsOpenModal(true);
    if (announcement) {
      setSelectedAnnouncement(announcement);
    }
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedAnnouncement(null);
  };

  const handleCloseAlert = () => {
    router.replace("/admin/announcements", { scroll: false });
  };

  const tabel: TabelColumn<Announcement>[] = [
    {
      header: "No",
      accessor: "id",
      render: (_, index) => (index as number) + 1,
    },
    {
      header: "Judul Pengumuman",
      accessor: (item) => item.title || "-",
    },
    {
      header: "Deskripsi",
      accessor: (item) => item.content || "-",
    },
    {
      header: "Gambar",
      accessor: (item) => item.image || "-",
      render: (item) =>
        item.image ? (
          <Image
            width={640}
            height={640}
            src={item.image || "/plh.png"}
            alt={item.title || "Image"}
            className="object-contain rounded-md w-32 h-32"
          />
        ) : (
          "-"
        ),
    },

    {
      header: "Aksi",
      accessor: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal(item)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200"
            title="Edit Data"
          >
            <Edit className="w-4 h-4" />
          </button>
          <form action={() => deleteFacility(item.id)}>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                confirm(
                  `Apakah Anda yakin ingin menghapus departemen "${item.title}"?`
                );
                e.currentTarget.form?.requestSubmit();
              }}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors duration-150 shadow-sm border border-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Data
        </button>
      </div>
      <Tabel columns={tabel} data={announcements} />
      <div className="mt-8">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          preserveParams={pagination.preserveParams}
        />
      </div>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <AnnouncementForm
          modal={selectedAnnouncement ? "edit" : "add"}
          onClose={handleCloseModal}
          selectedAnnouncement={selectedAnnouncement}
        />
      </Modal>
      <Alert
        isVisible={message !== undefined}
        message={message || ""}
        onClose={handleCloseAlert}
        type={alertType || "success"}
        autoClose
      />
    </div>
  );
};
