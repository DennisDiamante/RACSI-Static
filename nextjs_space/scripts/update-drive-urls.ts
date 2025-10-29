import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

function convertGoogleDriveUrl(url: string): string {
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

  // If we found a file ID, convert to googleusercontent URL
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
}

async function main() {
  console.log('Updating Google Drive URLs...');

  // Find all project images with Google Drive URLs
  const images = await prisma.projectImage.findMany({
    where: {
      OR: [
        { cloud_storage_path: { contains: 'drive.google.com' } },
        { cloud_storage_path: { contains: 'drive.google.com/uc' } },
      ]
    }
  });

  console.log(`Found ${images.length} images with Google Drive URLs`);

  let updated = 0;
  for (const image of images) {
    const convertedUrl = convertGoogleDriveUrl(image.cloud_storage_path);
    
    if (convertedUrl !== image.cloud_storage_path) {
      await prisma.projectImage.update({
        where: { id: image.id },
        data: { cloud_storage_path: convertedUrl }
      });
      console.log(`Updated image ${image.id}: ${image.cloud_storage_path} -> ${convertedUrl}`);
      updated++;
    }
  }

  console.log(`Successfully updated ${updated} image URLs`);
}

main()
  .catch((e) => {
    console.error('Error updating URLs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
