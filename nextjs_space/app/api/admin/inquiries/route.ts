
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering - don't try to pre-render during build
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json({ 
      success: true,
      inquiries,
      count: inquiries.length
    })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch inquiries',
        inquiries: []
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const inquiry = await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data: { status }
    })

    return NextResponse.json({ success: true, inquiry })
  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}
