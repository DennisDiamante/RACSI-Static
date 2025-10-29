
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = "force-dynamic";

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company_name, contact_number, message } = body

    // Validate required fields
    if (!name || !email || !company_name || !contact_number || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Save inquiry to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: name?.trim?.() || '',
        email: email?.trim?.() || '',
        company_name: company_name?.trim?.() || '',
        contact_number: contact_number?.trim?.() || '',
        message: message?.trim?.() || '',
        status: 'unanswered'
      }
    })

    return NextResponse.json(
      { 
        message: 'Inquiry submitted successfully',
        id: inquiry?.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
