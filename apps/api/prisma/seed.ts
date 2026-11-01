import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── 1. Permissions ──────────────────────────────────────────────────
  const permissionNames = [
    'users:read', 'users:write', 'users:delete',
    'roles:read', 'roles:write',
    'permissions:read', 'permissions:write',
    'contact:read', 'contact:write',
    'services:read', 'services:write',
    'portfolio:read', 'portfolio:write',
    'team:read', 'team:write',
    'jobs:read', 'jobs:write',
    'testimonials:read', 'testimonials:write',
    'settings:read', 'settings:write',
    'audit:read',
  ];

  const permissions = await Promise.all(
    permissionNames.map((name) =>
      prisma.permission.upsert({
        where: { name },
        update: {},
        create: { name, description: `Permission to ${name.replace(':', ' ')}` },
      }),
    ),
  );
  console.log(`✔ ${permissions.length} permissions seeded`);

  // ── 2. Roles ────────────────────────────────────────────────────────
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'super_admin' },
    update: {},
    create: {
      name: 'super_admin',
      description: 'Full system access — bypasses all permission checks',
      permissions: { connect: permissions.map((p) => ({ id: p.id })) },
    },
  });

  const adminPerms = permissions.filter((p) =>
    ['users:read', 'users:write', 'roles:read', 'contact:read', 'contact:write',
      'services:read', 'services:write', 'portfolio:read', 'portfolio:write',
      'team:read', 'team:write', 'jobs:read', 'jobs:write',
      'testimonials:read', 'testimonials:write', 'settings:read', 'audit:read'].includes(p.name),
  );
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Standard admin — can manage most content',
      permissions: { connect: adminPerms.map((p) => ({ id: p.id })) },
    },
  });

  const managerPerms = permissions.filter((p) =>
    ['contact:read', 'contact:write', 'services:read', 'portfolio:read',
      'team:read', 'jobs:read', 'testimonials:read'].includes(p.name),
  );
  const managerRole = await prisma.role.upsert({
    where: { name: 'manager' },
    update: {},
    create: {
      name: 'manager',
      description: 'Can view and manage contact enquiries',
      permissions: { connect: managerPerms.map((p) => ({ id: p.id })) },
    },
  });

  const viewerPerms = permissions.filter((p) =>
    ['contact:read', 'services:read', 'portfolio:read', 'team:read', 'jobs:read'].includes(p.name),
  );
  const viewerRole = await prisma.role.upsert({
    where: { name: 'viewer' },
    update: {},
    create: {
      name: 'viewer',
      description: 'Read-only access to contacts and content',
      permissions: { connect: viewerPerms.map((p) => ({ id: p.id })) },
    },
  });

  console.log(`✔ Roles seeded: super_admin, admin, manager, viewer`);

  // ── 3. Super Admin User ─────────────────────────────────────────────
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin@1234', salt);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@halfwaveplatforms.com' },
    update: {},
    create: {
      email: 'admin@halfwaveplatforms.com',
      passwordHash,
      firstName: 'Halfwave',
      lastName: 'Admin',
      roleId: superAdminRole.id,
      isEmailVerified: true,
    },
  });
  console.log(`✔ Super admin user: ${superAdmin.email} | password: Admin@1234`);

  // ── 4. Services ─────────────────────────────────────────────────────
  const services = [
    { slug: 'web-development', title: 'Web Development', summary: 'Custom business websites and web applications', description: 'Custom Business Websites, Corporate Websites, Portfolio Websites, Landing Pages, E-Commerce Websites, Admin Dashboards, CMS Development, Progressive Web Apps (PWA).', icon: 'monitor', displayOrder: 1 },
    { slug: 'mobile-app-development', title: 'Mobile App Development', summary: 'Cross-platform and native mobile apps', description: 'Android Applications, iOS Applications, Flutter Apps, React Native Apps, Enterprise Applications, Business Management Apps, E-Commerce Apps.', icon: 'smartphone', displayOrder: 2 },
    { slug: 'ui-ux-design', title: 'UI/UX Design', summary: 'Beautiful and functional digital product design', description: 'Product Design, Wireframing, Prototyping, Design Systems, User Research, Usability Testing, Figma Design, Brand Identity.', icon: 'pen-tool', displayOrder: 3 },
    { slug: 'ai-ml-solutions', title: 'AI & ML Solutions', summary: 'Intelligent automation and predictive analytics', description: 'Machine Learning Models, NLP Solutions, Computer Vision, AI Chatbots, Recommendation Engines, Predictive Analytics, LLM Integration.', icon: 'cpu', displayOrder: 4 },
    { slug: 'cloud-devops', title: 'Cloud & DevOps', summary: 'Scalable cloud infrastructure and CI/CD pipelines', description: 'AWS, GCP, Azure Deployment, Docker, Kubernetes, CI/CD Pipelines, Infrastructure as Code, Site Reliability Engineering.', icon: 'cloud', displayOrder: 5 },
    { slug: 'data-analytics', title: 'Data Analytics', summary: 'Data pipelines, BI dashboards and reporting', description: 'Business Intelligence, Data Warehousing, ETL Pipelines, Dashboard Development, Real-time Analytics, Data Strategy Consulting.', icon: 'bar-chart', displayOrder: 6 },
    { slug: 'video-editing', title: 'Video Editing', summary: 'Professional video production and post-production', description: 'Promotional Videos, Corporate Videos, Product Videos, Social Media Reels, YouTube Editing, Motion Graphics, Short-form Content.', icon: 'video', displayOrder: 7 },
    { slug: 'digital-marketing', title: 'Digital Marketing', summary: 'SEO, performance marketing and growth strategies', description: 'Search Engine Optimisation, Google Ads, Social Media Marketing, Content Strategy, Email Marketing, Conversion Rate Optimisation.', icon: 'trending-up', displayOrder: 8 },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: { ...service, createdById: superAdmin.id },
    });
  }
  console.log(`✔ ${services.length} services seeded`);

  console.log('✅ Database seeded successfully!');
  console.log('');
  console.log('Admin credentials:');
  console.log('  Email:    admin@halfwaveplatforms.com');
  console.log('  Password: Admin@1234');
  console.log('  ⚠️  CHANGE THIS PASSWORD in production!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
