"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Gallery } from "@prisma/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  galleries: Gallery[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const ImageModal = ({
  isOpen,
  onClose,
  galleries,
  currentIndex,
  onPrevious,
  onNext,
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !galleries[currentIndex]) return null;

  const currentGallery = galleries[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < galleries.length - 1;

  return (
    <div className="fixed inset-0 z-[9999999999] flex items-center justify-center backdrop-brightness-50 backdrop-blur-sm  bg-opacity-90">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        <div className="relative max-w-full max-h-full">
          <div className="relative">
            <Image
              src={currentGallery.image || "/placeholder-image.png"}
              alt={currentGallery.title}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain"
              priority
            />
          </div>

          {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-2">
                {currentGallery.title}
              </h3>
              {currentGallery.description && (
                <p className="text-gray-300 text-sm">
                  {currentGallery.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-400 text-xs">
                  {currentIndex + 1} dari {galleries.length}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(currentGallery.updatedAt).toLocaleDateString(
                    "id-ID"
                  )}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
