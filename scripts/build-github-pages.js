const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const apiDir = path.join(root, 'src/app/api');
const disabledApiDir = path.join(root, '.github-pages-disabled-api');

function run(command, args, env = {}) {
  execFileSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      ...env,
    },
  });
}

function restoreApiRoutes() {
  if (fs.existsSync(disabledApiDir) && !fs.existsSync(apiDir)) {
    fs.renameSync(disabledApiDir, apiDir);
  }
}

try {
  restoreApiRoutes();

  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, disabledApiDir);
  }

  run('npm', ['run', 'generate-sitemap'], {
    NEXT_TELEMETRY_DISABLED: '1',
    GITHUB_PAGES: 'true',
  });

  run('npx', ['next', 'build', '--no-lint'], {
    NEXT_TELEMETRY_DISABLED: '1',
    GITHUB_PAGES: 'true',
  });
} finally {
  restoreApiRoutes();
}
