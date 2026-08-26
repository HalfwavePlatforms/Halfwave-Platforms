const fs = require('fs');
const path = require('path');

console.log('\x1b[35m%s\x1b[0m', '🔍 Verifying Halfwave Platforms Monorepo Structure...\n');

const rootDir = path.resolve(__dirname, '..');

const requiredPaths = [
  '.gitignore',
  '.env.example',
  'pnpm-workspace.yaml',
  'package.json',
  'README.md',
  'apps/api/package.json',
  'apps/api/tsconfig.json',
  'apps/api/prisma/schema.prisma',
  'apps/api/src/main.ts',
  'apps/web/package.json',
  'apps/web/server.js',
  'apps/web/index.html',
  'apps/web/styles.css',
  'apps/web/script.js',
  'packages/config-typescript/base.json',
  'packages/config-eslint/index.mjs',
  'packages/types/src/index.ts',
  'infrastructure/docker/docker-compose.yml',
  'infrastructure/docker/Dockerfile.api',
  'infrastructure/docker/Dockerfile.web',
  'docs/ARCHITECTURE.md',
  'docs/SECURITY.md',
  '.github/workflows/ci.yml',
];

let errors = 0;

requiredPaths.forEach((relPath) => {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    console.log(`\x1b[32m✔\x1b[0m ${relPath}`);
  } else {
    console.error(`\x1b[31m✖ Missing:\x1b[0m ${relPath}`);
    errors++;
  }
});

// Verify .env is in .gitignore
const gitignoreContent = fs.readFileSync(path.join(rootDir, '.gitignore'), 'utf-8');
if (gitignoreContent.includes('.env')) {
  console.log('\x1b[32m✔\x1b[0m .gitignore properly guards .env secrets');
} else {
  console.error('\x1b[31m✖ .gitignore does not guard .env!\x1b[0m');
  errors++;
}

console.log('\n======================================================');
if (errors === 0) {
  console.log('\x1b[32m✨ All monorepo checks passed successfully!\x1b[0m');
} else {
  console.error(`\x1b[31m💥 ${errors} verification error(s) found.\x1b[0m`);
  process.exit(1);
}
console.log('======================================================\n');
