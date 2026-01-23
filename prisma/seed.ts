import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';
import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});
const SALT_ROUNDS = 10;

async function main() {
  console.log("🌱 Seeding database...");

  const company = await prisma.company.create({
    data: {
      name: "Example Company",
      description: "A sample company for demonstration purposes",
    },
  });

  const branch = await prisma.branch.create({
    data: {
      name: "Main Branch",
      address: "123 Main Street",
      phone: "999999999",
      companyId: company.id,
    },
  });

  const permissionsData = [
    { key: "manage_users", description: "Manage users" },
    { key: "manage_roles", description: "Manage roles" },
    { key: "manage_clients", description: "Manage clients" },
    { key: "view_clients", description: "View clients" },
    { key: "manage_company", description: "Manage company" },
  ];

  await prisma.permission.createMany({
    data: permissionsData,
    skipDuplicates: true,
  });

  const permissions = await prisma.permission.findMany();

  const adminRole = await prisma.role.create({
    data: {
      name: "Admin",
      description: "System administrator with full permissions",
      companyId: company.id,
    },
  });

  await prisma.rolePermission.createMany({
    data: permissions.map((permission) => ({
      roleId: adminRole.id,
      permissionId: permission.id,
    })),
  });

  const hashedPassword = await bcrypt.hash("admin123", SALT_ROUNDS);

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: hashedPassword,
      branchId: branch.id,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  console.log("✅ Seeds completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
