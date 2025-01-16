import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Seed Users
  const passwordHash = await bcrypt.hash('password123', 10);
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
      phone: '+1234567890',
      role: 'ADMIN',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@example.com',
      password: passwordHash,
      phone: '+1987654321',
    },
  });

  // Seed Categories
  const category1 = await prisma.category.create({
    data: { name: 'Technology' },
  });

  const category2 = await prisma.category.create({
    data: { name: 'Music' },
  });

  // Seed Events
  const event1 = await prisma.event.create({
    data: {
      title: 'Tech Conference 2025',
      organizer: 'TechWorld Inc.',
      description: 'A conference showcasing the latest in technology and innovation.',
      venue: 'Convention Center',
      location: 'New York',
      date: new Date('2025-05-20'),
      imageUrl: 'https://example.com/tech-event.jpg',
      status: 'PUBLISHED',
      totalTicket: 500,
      categoryId: category1.id,
      userId: adminUser.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Live Music Concert',
      organizer: 'MusicVibes',
      description: 'An evening of live music and entertainment.',
      venue: 'Open Air Arena',
      location: 'Los Angeles',
      date: new Date('2025-06-15'),
      imageUrl: 'https://example.com/music-event.jpg',
      status: 'UPCOMING',
      totalTicket: 1000,
      categoryId: category2.id,
      userId: regularUser.id,
    },
  });

  // Seed Ticket Types
  const ticketType1 = await prisma.ticketType.create({
    data: { name: 'Standard' },
  });

  const ticketType2 = await prisma.ticketType.create({
    data: { name: 'VIP' },
  });

  // Seed Ticket Tiers
  const ticketTier1 = await prisma.ticketTier.create({
    data: {
      ticketTypeId: ticketType1.id,
      price: 50.0,
      quantity: 300,
      eventId: event1.id,
    },
  });

  const ticketTier2 = await prisma.ticketTier.create({
    data: {
      ticketTypeId: ticketType2.id,
      price: 100.0,
      quantity: 50,
      eventId: event1.id,
    },
  });

  // Seed Home Banners
  await prisma.homeBanner.createMany({
    data: [
      {
        name: 'Tech Event Banner',
        link: 'https://example.com/tech',
        imageUrl: 'https://example.com/banner-tech.jpg',
        caption: 'Join the biggest tech event of the year!',
        order: '1',
      },
      {
        name: 'Music Event Banner',
        link: 'https://example.com/music',
        imageUrl: 'https://example.com/banner-music.jpg',
        caption: 'Experience live music like never before!',
        order: '2',
      },
    ],
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
