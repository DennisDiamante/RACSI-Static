
"use client";

import { useState, useEffect } from "react";
import { X, Upload, Loader2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { convertGoogleDriveUrl } from "@/lib/utils";

interface ProjectImage {
  id: string;
  cloud_storage_path: string;
  displayOrder: number;
  url?: string;
}

interface ProjectImageUploadProps {
  projectId: number;
  initialImages?: ProjectImage[];
  onImagesChange?: (images: ProjectImage[]) => void;
}

export function ProjectImageUpload({
  projectId,
  initialImages = [],
  onImagesChange,
}: ProjectImageUploadProps) {
  const [images, setImages] = useState<ProjectImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [imageUrl, setImageUrl] = useState("");
  const [addingUrl, setAddingUrl] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 5) {
      toast.error("Maximum 5 images allowed per project");
      return;
    }

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectId", projectId.toString());

        const response = await fetch("/api/admin/projects/images", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to upload image");
        }

        const result = await response.json();
        setImages((prev) => {
          const updated = [...prev, result.image];
          onImagesChange?.(updated);
          return updated;
        });
        toast.success(`${file.name} uploaded successfully`);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload images"
      );
    } finally {
      setUploading(false);
      e.target.value = ""; // Reset file input
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      const response = await fetch(
        `/api/admin/projects/images?id=${imageId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      setImages((prev) => {
        const updated = prev.filter((img) => img.id !== imageId);
        onImagesChange?.(updated);
        return updated;
      });
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    }
  };

  const handleAddImageUrl = async () => {
    if (!imageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }

    if (images.length >= 5) {
      toast.error("Maximum 5 images allowed per project");
      return;
    }

    setAddingUrl(true);

    try {
      // Convert Google Drive URL if needed
      const convertedUrl = convertGoogleDriveUrl(imageUrl);

      const response = await fetch("/api/admin/projects/images/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          projectId: projectId.toString(),
          imageUrl: convertedUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add image URL");
      }

      const result = await response.json();
      setImages((prev) => {
        const updated = [...prev, result.image];
        onImagesChange?.(updated);
        return updated;
      });
      setImageUrl("");
      setShowUrlInput(false);
      toast.success("Image URL added successfully");
    } catch (error) {
      console.error("Error adding image URL:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add image URL"
      );
    } finally {
      setAddingUrl(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium mb-1">
            Project Images
          </label>
          <p className="text-sm text-muted-foreground">
            Upload up to 5 images ({images.length}/5)
          </p>
        </div>
        {images.length < 5 && (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowUrlInput(!showUrlInput)}
              disabled={uploading || addingUrl}
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              Add URL
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("image-upload")?.click()}
              disabled={uploading || addingUrl}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* URL Input */}
      {showUrlInput && (
        <div className="flex gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <Input
            type="url"
            placeholder="Paste image URL (supports Google Drive links)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddImageUrl();
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddImageUrl}
            disabled={addingUrl || !imageUrl.trim()}
          >
            {addingUrl ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowUrlInput(false);
              setImageUrl("");
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {imageUrls[image.id] ? (
                  <Image
                    src={imageUrls[image.id]}
                    alt="Project image"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDeleteImage(image.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
