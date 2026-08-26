"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seeding for dynamic RBAC...');
    const permissionsData = [
        { name: 'users:read', description: 'Read user list and profiles' },
        { name: 'users:write', description: 'Create and edit user accounts' },
        { name: 'users:delete', description: 'Soft-delete and restore user accounts' },
        { name: 'roles:read', description: 'Read roles and permissions' },
        { name: 'roles:write', description: 'Create, modify, and assign permissions to roles' },
        { name: 'services:read', description: 'Read services listing' },
        { name: 'services:write', description: 'Create, update, and soft-delete services' },
        { name: 'portfolio:read', description: 'Read portfolio items' },
        { name: 'portfolio:write', description: 'Create, edit, and delete portfolio details' },
        { name: 'careers:read', description: 'View job postings and applications' },
        { name: 'careers:write', description: 'Post jobs, edit parameters, and review applications' },
        { name: 'newsletter:read', description: 'View newsletter subscriber list' },
        { name: 'newsletter:write', description: 'Manage newsletter subscriptions and triggers' },
        { name: 'contact:read', description: 'View contact form submissions' },
        { name: 'contact:write', description: 'Update status or assign contact submissions' },
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
    const rolesDefinition = [
        {
            name: 'super_admin',
            description: 'Super Administrator with unrestricted access to all endpoints.',
            permissions: permissionsData.map((p) => p.name),
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
        const matchingPerms = dbPermissions.filter((p) => roleDef.permissions.includes(p.name));
        await prisma.role.upsert({
            where: { name: roleDef.name },
            update: {
                description: roleDef.description,
                permissions: {
                    set: matchingPerms.map((p) => ({ id: p.id })),
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
//# sourceMappingURL=seed.js.map