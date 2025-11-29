import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Simple authentication - check for a secret key in the URL
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    if (secret !== 'RadiansSeeding2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting seed...');

    // Create users
    const hashedPassword1 = await bcrypt.hash('RadDeveloper2024!Dennis#Secure', 10);
    const hashedPassword2 = await bcrypt.hash('RadSuperAdmin2024!Info#Secure', 10);
    const hashedPassword3 = await bcrypt.hash('SecureTest2024!RadiansAuto', 10);
    const hashedPassword4 = await bcrypt.hash('RadOperations2024!Operations#Secure', 10);
    const hashedPassword5 = await bcrypt.hash('RadEditor2024!Content#Secure', 10);

    await prisma.user.upsert({
      where: { email: 'denniscortezdiamante@gmail.com' },
      update: {},
      create: {
        email: 'denniscortezdiamante@gmail.com',
        name: 'Dennis Cortez Diamante',
        password: hashedPassword1,
        role: 'DEVELOPER',
      },
    });

    await prisma.user.upsert({
      where: { email: 'info@radians-automation.com' },
      update: {},
      create: {
        email: 'info@radians-automation.com',
        name: 'Radians Super Admin',
        password: hashedPassword2,
        role: 'SUPER_ADMIN',
      },
    });

    await prisma.user.upsert({
      where: { email: 'john@doe.com' },
      update: {},
      create: {
        email: 'john@doe.com',
        name: 'John Doe',
        password: hashedPassword3,
        role: 'ADMIN',
      },
    });

    await prisma.user.upsert({
      where: { email: 'operations@radians-automation.com' },
      update: {},
      create: {
        email: 'operations@radians-automation.com',
        name: 'Operations Team',
        password: hashedPassword4,
        role: 'EDITOR',
      },
    });

    await prisma.user.upsert({
      where: { email: 'content@radians-automation.com' },
      update: {},
      create: {
        email: 'content@radians-automation.com',
        name: 'Content Editor',
        password: hashedPassword5,
        role: 'VIEWER',
      },
    });

    // Create default About Us content
    await prisma.aboutUs.upsert({
      where: { id: 1 },
      update: {},
      create: {
        content: JSON.stringify({
          title: 'About Radians Automation and Control Solutions, Inc.',
          description: 'Radians Automation and Control Solutions, Inc. is a leading provider of industrial automation solutions in the Philippines.',
          mission: 'To provide innovative automation solutions that drive industrial excellence and operational efficiency.',
          vision: 'To be the premier automation solutions provider in the Philippines, recognized for our technical expertise and commitment to client success.',
          values: ['Innovation', 'Excellence', 'Integrity', 'Customer Focus', 'Continuous Improvement'],
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      credentials: {
        developer: 'denniscortezdiamante@gmail.com / RadDeveloper2024!Dennis#Secure',
        superAdmin: 'info@radians-automation.com / RadSuperAdmin2024!Info#Secure',
        admin: 'john@doe.com / SecureTest2024!RadiansAuto',
      },
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
