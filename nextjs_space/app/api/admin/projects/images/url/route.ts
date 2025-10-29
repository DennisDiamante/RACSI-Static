

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, imageUrl } = body;

    if (!imageUrl || !projectId) {
      return NextResponse.json(
        { error: "Missing imageUrl or projectId" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if project already has 5 images
    if (project.images.length >= 5) {
      return NextResponse.json(
        { error: "Maximum 5 images per project allowed" },
        { status: 400 }
      );
    }

    // Save to database with URL as cloud_storage_path
    const projectImage = await prisma.projectImage.create({
      data: {
        projectId: parseInt(projectId),
        cloud_storage_path: imageUrl,
        displayOrder: project.images.length,
      },
    });

    return NextResponse.json({ success: true, image: projectImage });
  } catch (error) {
    console.error("Error adding image URL:", error);
    return NextResponse.json(
      { error: "Failed to add image URL" },
      { status: 500 }
    );
  }
}

