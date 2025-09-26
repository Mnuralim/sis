"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ActivityForm } from "./form";
import { Tabel, type TabelColumn } from "../../_components/tabel";
import { deleteFacility } from "@/actions/facility";
import { Pagination } from "../../_components/pagination";
import { Modal } from "../../_components/modal";
import { Alert } from "../../_components/alert";
import Image from "next/image";
import type { Activity } from "@prisma/client";

interface Props {
  alertType?: "success" | "error";
  message?: string;
  activities: Activity[];
  pagination: PaginationProps;
}

export const ActivitiesList = ({
  alertType,
  activities,
  message,
  pagination,
}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const router = useRouter();

  const handleOpenModal = (activity?: Activity) => {
    setIsOpenModal(true);
    if (activity) {
      setSelectedActivity(activity);
    }
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedActivity(null);
  };

  const handleCloseAlert = () => {
    router.replace("/admin/activities", { scroll: false });
  };

  const tabel: TabelColumn<Activity>[] = [
    {
      header: "No",
      accessor: "id",
      render: (_, index) => (index as number) + 1,
    },
    {
      header: "Nama Kegiatan",
      accessor: (item) => item.name || "-",
    },
    {
      header: "Gambar",
      accessor: (item) => item.name || "-",
      render: (item) =>
        item.image ? (
          <Image
            width={640}
            height={640}
            src={item.image}
            alt={item.name || "Image"}
            className="object-contain rounded-md w-32 h-32"
          />
        ) : (
          "-"
        ),
    },
    {
      header: "Deskripsi",
      accessor: (item) => item.description || "-",
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
                  `Apakah Anda yakin ingin menghapus departemen "${item.name}"?`
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
      <Tabel columns={tabel} data={activities} />
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
        <ActivityForm
          modal={selectedActivity ? "edit" : "add"}
          onClose={handleCloseModal}
          selectedActivty={selectedActivity}
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
