
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Public API - Get only featured projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        featured: true, // Only fetch featured projects
      },
      include: {
        images: {
          orderBy: {
            displayOrder: 'asc',
          },
        },
      },
      orderBy: [
        { display_order: 'asc' },
        { created_at: 'desc' },
      ],
    });

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
