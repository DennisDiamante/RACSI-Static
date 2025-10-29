
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

  // Seed projects
  const projects = [
    {
      title: 'Automotive Manufacturing Plant Automation',
      category: 'System Integration',
      status: 'Completed',
      location: 'Laguna, Philippines',
      date: '2024',
      image: 'https://www.iqsdirectory.com/articles/factory-automation/factory-automation/factory-automation-system-for-automobiles.jpg',
      description: 'Complete automation system for automotive assembly line including PLC programming, HMI development, and SCADA integration.',
      features: JSON.stringify([
        'PLC-based control system',
        'Real-time monitoring dashboard',
        'Automated quality control',
        'Production data analytics',
        'Safety interlocks system'
      ]),
      featured: true,
      display_order: 1,
    },
    {
      title: 'Industrial Electrical Infrastructure Upgrade',
      category: 'Electrical Installation',
      status: 'Completed',
      location: 'Cavite, Philippines',
      date: '2024',
      image: 'https://belmarelectrical.com/wp-content/uploads/2020/11/Electrical-Engineering-for-Manufacturing-and-Industry-new.jpg',
      description: 'Comprehensive electrical system upgrade for manufacturing facility including main distribution panels and motor control centers.',
      features: JSON.stringify([
        'Main distribution panel installation',
        'Motor control center assembly',
        'Power factor correction',
        'Emergency backup systems',
        'Electrical safety compliance'
      ]),
      featured: true,
      display_order: 2,
    },
    {
      title: '24/7 Control Room Operations Center',
      category: 'Monitoring Systems',
      status: 'Ongoing',
      location: 'Metro Manila, Philippines',
      date: '2024',
      image: 'https://new.abb.com/images/default-source/abb-custom-archive/control-room-design-cover-croped-2-(2)e01852f4c1f463c09537ff0000433538.jpg?sfvrsn=deec310c_0',
      description: 'State-of-the-art control room setup with advanced monitoring systems for continuous industrial process supervision.',
      features: JSON.stringify([
        'Multi-screen monitoring setup',
        'Centralized alarm management',
        'Remote system access',
        'Historical data logging',
        'Redundant communication systems'
      ]),
      featured: true,
      display_order: 1,
    },
    {
      title: 'Electrical Substation Automation',
      category: 'Power Systems',
      status: 'Completed',
      location: 'Batangas, Philippines',
      date: '2023',
      image: 'https://studyelectrical.com/wp-content/uploads/2019/04/Substation-components-equipment-layout.jpg',
      description: 'Automation and control system implementation for electrical substation with protective relay coordination.',
      features: JSON.stringify([
        'Protective relay systems',
        'SCADA integration',
        'Remote monitoring capability',
        'Fault analysis tools',
        'Load management system'
      ]),
      featured: true,
      display_order: 3,
    },
    {
      title: 'Smart Factory Production Line',
      category: 'Industry 4.0',
      status: 'Ongoing',
      location: 'Bulacan, Philippines',
      date: '2024',
      image: 'https://assets.new.siemens.com/siemens/assets/api/uuid:fdfd8d31-2a25-4781-ad9f-94e915af5d62/operation:download/AdobeStock-468739675.jpeg',
      description: 'Implementation of smart manufacturing concepts with IoT integration and predictive maintenance systems.',
      features: JSON.stringify([
        'IoT sensor integration',
        'Predictive maintenance',
        'Machine learning analytics',
        'Energy optimization',
        'Quality tracking system'
      ]),
      featured: true,
      display_order: 2,
    },
    {
      title: 'Industrial Building Electrical System',
      category: 'Infrastructure',
      status: 'Completed',
      location: 'Pampanga, Philippines',
      date: '2023',
      image: 'https://msb-engineering.com/wp-content/uploads/2011/06/INDUSTRIAL-ELECTRICAL-SYSTEM-OPTIMIZATION-THROUGH-ANALYSIS-scaled.jpeg',
      description: 'Complete electrical system design and installation for new industrial facility with energy-efficient solutions.',
      features: JSON.stringify([
        'Energy-efficient lighting',
        'Power distribution optimization',
        'Motor drive systems',
        'Building automation integration',
        'Sustainability compliance'
      ]),
      featured: true,
      display_order: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { 
        id: projects.indexOf(project) + 1 
      },
      update: project,
      create: project,
    });
  }
  console.log('Seeded projects');

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
