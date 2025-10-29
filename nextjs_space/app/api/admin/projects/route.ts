
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// GET all projects (with optional filtering)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (status) where.status = status;
    if (featured) where.featured = featured === 'true';

    const projects = await prisma.project.findMany({
      where,
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

// POST - Create new project
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      category,
      status,
      location,
      date,
      image,
      features,
      featured,
      display_order,
    } = body;

    if (!title || !description || !category || !status || !location || !date || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert features array to JSON string if it's an array
    const featuresString = Array.isArray(features) ? JSON.stringify(features) : features;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        category,
        status,
        location,
        date,
        image,
        features: featuresString,
        featured: featured || false,
        display_order: display_order || 0,
      },
    });

    // Revalidate projects page
    revalidatePath('/projects');

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
