
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
  } finally {
    await prisma.$disconnect()
  }
}
