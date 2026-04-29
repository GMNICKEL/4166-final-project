import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter: adapter });

async function main() {
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const userPassword = await bcrypt.hash("12345678", 10);
  const supportPassword = await bcrypt.hash("12345678", 10);

  const regularUser = await prisma.user.create({
    data: {
      email: "user1@email.com",
      password: userPassword,
      role: "USER",
    },
  });

  const supportUser = await prisma.user.create({
    data: {
      email: "support1@email.com",
      password: supportPassword,
      role: "SUPPORT",
    },
  });

  const category1 = await prisma.category.create({
    data: {
      name: "Login Issues",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Account Issues",
    },
  });

  const ticket1 = await prisma.ticket.create({
    data: {
      title: "Cannot log in",
      description: "My password is not working.",
      status: "PENDING",
      userId: regularUser.id,
      categoryId: category1.id,
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: "Need account help",
      description: "I cannot update my account details.",
      status: "COMPLETED",
      userId: regularUser.id,
      categoryId: category2.id,
    },
  });

  await prisma.comment.create({
    data: {
      message: "I am still having this issue.",
      ticketId: ticket1.id,
      userId: regularUser.id,
    },
  });

  await prisma.comment.create({
    data: {
      message: "We are looking into it.",
      ticketId: ticket1.id,
      userId: supportUser.id,
    },
  });

  await prisma.comment.create({
    data: {
      message: "This issue has been resolved.",
      ticketId: ticket2.id,
      userId: supportUser.id,
    },
  });

  console.log("Seed completed successfully.");
  console.log("Regular user: user1@email.com / 12345678");
  console.log("Support user: support1@email.com / 12345678");
}

main()
  .catch(function (error) {
    console.error(error);
    process.exit(1);
  })
  .finally(async function () {
    await prisma.$disconnect();
    await pool.end();
  });