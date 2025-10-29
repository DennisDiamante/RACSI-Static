
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectImage {
  id: string;
  cloud_storage_path: string;
  displayOrder: number;
}

interface ProjectImageGalleryProps {
  images: ProjectImage[];
}

export function ProjectImageGallery({ images }: ProjectImageGalleryProps) {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch signed URLs for all images
    const fetchImageUrls = async () => {
      const urls: Record<string, string> = {};
      for (const image of images) {
        try {
          const response = await fetch(`/api/projects/images/${image.id}`);
          const data = await response.json();
          if (data.url) {
            urls[image.id] = data.url;
          }
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
      setImageUrls(urls);
    };

    if (images.length > 0) {
      fetchImageUrls();
    }
  }, [images]);

  if (images.length === 0) return null;

  const handleImageClick = (index: number) => {
    const imageUrl = imageUrls[images[index].id];
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(imageUrls[images[newIndex].id]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(imageUrls[images[newIndex].id]);
  };

  return (
    <>
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Project Gallery ({images.length} {images.length === 1 ? 'image' : 'images'}):
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square bg-gray-200 rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-yellow-500 transition-all"
              onClick={() => handleImageClick(index)}
            >
              {imageUrls[image.id] ? (
                <Image
                  src={imageUrls[image.id]}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-4 w-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={selectedImage}
                alt="Full size project image"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center text-white mt-4">
              Image {currentIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
