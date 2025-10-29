
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create default test admin user (for testing - not to be revealed to users)
  const testPassword = await bcrypt.hash('SecureTest2024!RadiansAuto', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {
      password: testPassword,
    },
    create: {
      email: 'john@doe.com',
      name: 'Test Admin',
      password: testPassword,
      role: 'admin',
    },
  });
  console.log('Created test admin user:', testUser.email);

  // Create requested admin user with secure password
  const adminPassword = await bcrypt.hash('RadiansAdmin2024!Secure#Phase1', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@radians-automation.com' },
    update: {
      password: adminPassword,
    },
    create: {
      email: 'admin@radians-automation.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('Created admin user:', adminUser.email);

  // Seed About Us content
  const aboutUsContent = `Radians Automation and Control Solutions, Inc. is a leading provider of industrial automation and electrical control solutions in the Philippines. With years of experience in the industry, we specialize in delivering innovative and reliable automation systems that help businesses optimize their operations and increase productivity.

Our team of highly skilled engineers and technicians is dedicated to providing exceptional service and support to our clients. We work closely with each customer to understand their unique needs and develop customized solutions that meet their specific requirements.

At Radians Automation, we are committed to excellence in everything we do. From initial consultation and system design to installation, commissioning, and ongoing maintenance, we ensure that every project is completed to the highest standards of quality and professionalism.`;

  const aboutUs = await prisma.aboutUs.upsert({
    where: { id: 1 },
    update: {
      content: aboutUsContent,
    },
    create: {
      content: aboutUsContent,
    },
  });
  console.log('Seeded About Us content');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
