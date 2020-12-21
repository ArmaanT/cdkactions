const { execSync } = require('child_process');
const { readFileSync } = require('fs');

const constructs_version = require('../../package.json').dependencies.constructs;

exports.post = ctx => {
  const npm_cdkactions = ctx.npm_cdkactions;
  const npm_cdkactions_cli = ctx.npm_cdkactions_cli;

  if (!npm_cdkactions) { throw new Error(`missing context "npm_cdkactions"`); }
  if (!npm_cdkactions_cli) { throw new Error(`missing context "npm_cdkactions_cli"`); }

  installDeps([npm_cdkactions, `constructs@${constructs_version}`]);
  installDeps([
    npm_cdkactions_cli,
    '@types/node',
    'typescript'
  ], true);

  execSync('yarn build', { stdio: 'inherit' });
};

function installDeps(deps, isDev) {
  const devDep = isDev ? '-D' : '';
  execSync(`yarn add ${devDep} ${deps.join(' ')}`, { stdio: 'inherit' });
}
