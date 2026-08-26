const { spawn } = require('child_process');
const path = require('path');

console.log('\x1b[36m%s\x1b[0m', '======================================================');
console.log('\x1b[36m%s\x1b[0m', '⚡ Halfwave Platforms Monorepo Orchestrator');
console.log('\x1b[36m%s\x1b[0m', '======================================================');

const rootDir = path.resolve(__dirname, '..');

function startProcess(name, command, args, cwd, color) {
  const proc = spawn(command, args, {
    cwd,
    shell: true,
    env: { ...process.env },
  });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(`${color}[${name}]\x1b[0m ${line}`);
      }
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.error(`${color}[${name} ERR]\x1b[0m ${line}`);
      }
    });
  });

  proc.on('close', (code) => {
    console.log(`${color}[${name}]\x1b[0m exited with code ${code}`);
  });

  return proc;
}

// 1. Start Web Server
startProcess('WEB', 'npm', ['run', 'start:web'], rootDir, '\x1b[32m');

// 2. Start Backend API
startProcess('API', 'npm', ['run', 'start:api'], rootDir, '\x1b[34m');
