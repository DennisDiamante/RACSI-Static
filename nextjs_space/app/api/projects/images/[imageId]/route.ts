
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { downloadFile } from "@/lib/s3";

export async function GET(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  try {
    const { imageId } = params;

    // Get image from database
    const image = await prisma.projectImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // If cloud_storage_path is already a full URL (external image), return it directly
    if (image.cloud_storage_path.startsWith('http://') || image.cloud_storage_path.startsWith('https://')) {
      return NextResponse.json({ url: image.cloud_storage_path });
    }

    // Otherwise, get signed URL from S3
    const signedUrl = await downloadFile(image.cloud_storage_path);

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
