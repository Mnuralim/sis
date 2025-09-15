"use client";

import React, { useState } from "react";
import { Search, Grid, List } from "lucide-react";
import type { Gallery } from "@prisma/client";
import { GalleryCard } from "./gallery-card";
import { ImageModal } from "./image-modal";

interface Props {
  galleries: Gallery[];
}

export const GalleryList = ({ galleries }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredGalleries = galleries.filter(
    (gallery) =>
      gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gallery.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : filteredGalleries.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < filteredGalleries.length - 1 ? prev + 1 : 0
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Galeri Sekolah
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jelajahi koleksi foto dan dokumentasi kegiatan sekolah yang
              menggambarkan dinamika kehidupan akademik dan ekstrakurikuler
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cari galeri..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Tampilan:</span>
              <div className="flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-gray-600">
            Menampilkan{" "}
            <span className="font-semibold">{filteredGalleries.length}</span>{" "}
            galeri
            {searchTerm && (
              <span>
                {" "}
                untuk pencarian &quot;
                <span className="font-semibold">{searchTerm}</span>&quot;
              </span>
            )}
          </p>
        </div>

        {filteredGalleries.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredGalleries.map((gallery) => (
              <GalleryCard
                key={gallery.id}
                gallery={gallery}
                isListView={viewMode === "list"}
                onImageClick={() =>
                  handleImageClick(
                    filteredGalleries.findIndex((g) => g.id === gallery.id)
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Galeri tidak ditemukan
            </h3>
            <p className="text-gray-500">
              Coba gunakan kata kunci pencarian yang berbeda
            </p>
          </div>
        )}

        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {galleries.length}+
              </div>
              <div className="text-gray-600">Total Galeri</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {new Date().getFullYear()}
              </div>
              <div className="text-gray-600">Tahun Aktif</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                Setiap Hari
              </div>
              <div className="text-gray-600">Update Terbaru</div>
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        galleries={filteredGalleries}
        currentIndex={currentImageIndex}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      />
    </div>
  );
};
