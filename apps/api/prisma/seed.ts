import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for dynamic RBAC...');

  // 1. Define standard fine-grained permissions
  const permissionsData = [
    // Users Management permissions
    { name: 'users:read', description: 'Read user list and profiles' },
    { name: 'users:write', description: 'Create and edit user accounts' },
    { name: 'users:delete', description: 'Soft-delete and restore user accounts' },

    // Role & Permission Management permissions
    { name: 'roles:read', description: 'Read roles and permissions' },
    { name: 'roles:write', description: 'Create, modify, and assign permissions to roles' },

    // Core CMS Content permissions
    { name: 'services:read', description: 'Read services listing' },
    { name: 'services:write', description: 'Create, update, and soft-delete services' },
    
    { name: 'portfolio:read', description: 'Read portfolio items' },
    { name: 'portfolio:write', description: 'Create, edit, and delete portfolio details' },

    { name: 'careers:read', description: 'View job postings and applications' },
    { name: 'careers:write', description: 'Post jobs, edit parameters, and review applications' },

    // Communications permissions
    { name: 'newsletter:read', description: 'View newsletter subscriber list' },
    { name: 'newsletter:write', description: 'Manage newsletter subscriptions and triggers' },
    { name: 'contact:read', description: 'View contact form submissions' },
    { name: 'contact:write', description: 'Update status or assign contact submissions' },

    // Global site settings permissions
    { name: 'settings:write', description: 'Modify global site settings configurations' },
  ];

  console.log(`- Upserting ${permissionsData.length} permission tags...`);
  const dbPermissions = [];
  for (const perm of permissionsData) {
    const dbPerm = await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: { name: perm.name, description: perm.description },
    });
    dbPermissions.push(dbPerm);
  }

  // 2. Define default roles and their permission links
  const rolesDefinition = [
    {
      name: 'super_admin',
      description: 'Super Administrator with unrestricted access to all endpoints.',
      permissions: permissionsData.map((p) => p.name), // All permissions
    },
    {
      name: 'admin',
      description: 'System Administrator with control over user operations and content CMS.',
      permissions: [
        'users:read',
        'users:write',
        'roles:read',
        'services:read',
        'services:write',
        'portfolio:read',
        'portfolio:write',
        'careers:read',
        'careers:write',
        'newsletter:read',
        'newsletter:write',
        'contact:read',
        'contact:write',
      ],
    },
    {
      name: 'editor',
      description: 'Content Editor who manages services, portfolios, and client contact lists.',
      permissions: [
        'services:read',
        'services:write',
        'portfolio:read',
        'portfolio:write',
        'careers:read',
        'newsletter:read',
        'contact:read',
      ],
    },
  ];

  console.log(`- Configuring ${rolesDefinition.length} core roles...`);
  for (const roleDef of rolesDefinition) {
    // Find matching permissions to connect
    const matchingPerms = dbPermissions.filter((p) => roleDef.permissions.includes(p.name));

    await prisma.role.upsert({
      where: { name: roleDef.name },
      update: {
        description: roleDef.description,
        permissions: {
          set: matchingPerms.map((p) => ({ id: p.id })), // Sync and replace connections
        },
      },
      create: {
        name: roleDef.name,
        description: roleDef.description,
        permissions: {
          connect: matchingPerms.map((p) => ({ id: p.id })),
        },
      },
    });
  }

  // 3. Create default Super Admin User
  const superAdminRole = await prisma.role.findUnique({
    where: { name: 'super_admin' },
  });

  if (!superAdminRole) {
    throw new Error('Failure: Super Admin role was not successfully generated.');
  }

  const defaultAdminEmail = 'superadmin@halfwaveplatforms.com';
  const defaultAdminPass = 'AdminPassword123!';
  const hashedPassword = await bcrypt.hash(defaultAdminPass, 10);

  console.log(`- Seeding default Super Admin user (${defaultAdminEmail})...`);
  await prisma.user.upsert({
    where: { email: defaultAdminEmail },
    update: {
      roleId: superAdminRole.id,
      status: 'active',
    },
    create: {
      email: defaultAdminEmail,
      firstName: 'Super',
      lastName: 'Admin',
      passwordHash: hashedPassword,
      roleId: superAdminRole.id,
      status: 'active',
      isEmailVerified: true,
    },
  });

  console.log('✅ Database seeding process complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
