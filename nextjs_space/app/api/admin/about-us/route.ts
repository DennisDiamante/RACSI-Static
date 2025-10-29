
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const aboutUs = await prisma.aboutUs.findFirst({
      orderBy: { id: 'asc' },
    });

    if (!aboutUs) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, content: aboutUs.content });
  } catch (error) {
    console.error('Error fetching About Us:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized - Please log in again' 
      }, { status: 401 });
    }

    const { content } = await req.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid content' },
        { status: 400 }
      );
    }

    const aboutUs = await prisma.aboutUs.upsert({
      where: { id: 1 },
      update: {
        content,
        updated_at: new Date(),
        updated_by: session.user?.email || 'admin',
      },
      create: {
        content,
        updated_by: session.user?.email || 'admin',
      },
    });

    // Revalidate the About Us page to clear the cache
    revalidatePath('/about');

    return NextResponse.json({ success: true, content: aboutUs.content });
  } catch (error: any) {
    console.error('Error updating About Us:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
