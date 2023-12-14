import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("FarmandJakobsen1", 12);
  const user = await prisma.tabletUser.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "patrick.jakobsen@icloud.com",
      name: "Patrick Jakobsen",
      password,
      admin: true,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
