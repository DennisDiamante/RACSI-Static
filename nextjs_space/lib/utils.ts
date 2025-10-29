import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Convert Google Drive share URL to direct image URL
 * Supports formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view?usp=drive_link
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * 
 * Converts to lh3.googleusercontent.com format which is more reliable for embedding
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url;

  // Check if it's already a converted URL
  if (url.includes('lh3.googleusercontent.com') || url.includes('googleusercontent.com')) {
    return url;
  }

  // Extract file ID from various Google Drive URL formats
  let fileId = null;

  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch && !fileId) {
    fileId = openMatch[1];
  }

  // Format: https://drive.google.com/uc?id=FILE_ID or uc?export=view&id=FILE_ID
  const ucMatch = url.match(/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (ucMatch && !fileId) {
    fileId = ucMatch[1];
  }

  // If we found a file ID, convert to googleusercontent URL (more reliable for embedding)
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Return original URL if it's not a Google Drive URL
  return url;
}