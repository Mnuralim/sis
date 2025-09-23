"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
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
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

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
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          handleResetZoom();
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

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleZoomOut();
    } else {
      handleZoomIn();
    }
  };

  const handleDownload = async () => {
    if (!galleries[currentIndex]?.image) return;

    try {
      const response = await fetch(galleries[currentIndex].image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const urlParts = galleries[currentIndex].image.split(".");
      const extension = urlParts[urlParts.length - 1] || "jpg";

      link.download = `${
        galleries[currentIndex].title || "image"
      }.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (!isOpen || !galleries[currentIndex]) return null;

  const currentGallery = galleries[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < galleries.length - 1;

  return (
    <div className="fixed inset-0 z-[9999999999] flex items-center justify-center backdrop-brightness-50 backdrop-blur-sm bg-opacity-90">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={zoom > 1 ? undefined : onClose}
      />

      <div className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center p-4">
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={handleDownload}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
            title="Reset Zoom (0)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <div className="px-3 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full text-center">
            {Math.round(zoom * 100)}%
          </div>
        </div>

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

        <div
          className="relative max-w-full max-h-full overflow-hidden"
          onWheel={handleWheel}
        >
          <div
            ref={imageRef}
            className={`relative transition-transform duration-200 ${
              zoom > 1 ? "cursor-grab" : ""
            } ${isDragging ? "cursor-grabbing" : ""}`}
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${
                position.y / zoom
              }px)`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src={currentGallery.image || "/placeholder-image.png"}
              alt={currentGallery.title}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain select-none"
              priority
              draggable={false}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
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
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="px-4 py-2 bg-black bg-opacity-50 text-white text-xs rounded-full">
            Scroll atau +/- untuk zoom • Klik & drag untuk geser • ESC untuk
            keluar
          </div>
        </div>
      </div>
    </div>
  );
};
