import * as path from 'path';
import * as fs from 'fs-extra';
import { sscaff } from 'sscaff';
import * as yargs from 'yargs';

const pkgroot = path.join(__dirname, '..', '..', '..');

const pkg = fs.readJsonSync(path.join(pkgroot, 'package.json'));
const constructsVersion = pkg.dependencies.constructs;

const templatesDir = path.join(pkgroot, 'templates');
const availableTemplates = fs.readdirSync(templatesDir).filter((x: string) => !x.startsWith('.'));


class Command implements yargs.CommandModule {
  public readonly command = 'init TYPE';
  public readonly describe = 'Create a new cdkactions project from a template.';
  public readonly builder = (args: yargs.Argv) => args
    .positional('TYPE', { demandOption: true, desc: 'Project type' })
    .showHelpOnFail(true)
    .option('cdkactions-version', { type: 'string', desc: 'The cdkactions version to use when creating the new project', default: pkg.version })
    .choices('TYPE', availableTemplates);

  public async handler(argv: any) {
    if (fs.readdirSync('.').filter((f: string) => !f.startsWith('.')).length > 0) {
      console.error('Cannot initialize a project in a non-empty directory');
      process.exit(1);
    }

    console.error(`Initializing a project from the ${argv.TYPE} template`);
    const templatePath = path.join(templatesDir, argv.TYPE);

    const deps: any = await determineDeps(argv.cdkactionsVersion, argv.dist);

    await sscaff(templatePath, '.', {
      ...deps,
    });
  }
}

async function determineDeps(version: string, dist?: string): Promise<Deps> {
  if (dist) {
    const ret = {
      npm_cdkactions: path.resolve(dist, 'js', `cdkactions@${version}.jsii.tgz`),
      npm_cdkactions_cli: path.resolve(dist, 'js', `cdkactions-cli-v${version}.tgz`), // yarn pack adds a "v" before the version
      pypi_cdkactions: path.resolve(dist, 'python', `cdkactions-${version.replace(/-/g, '_')}-py3-none-any.whl`),
    };

    for (const file of Object.values(ret)) {
      if (!(await fs.pathExists(file))) {
        throw new Error(`unable to find ${file} under the "dist" directory (${dist})`);
      }
    }

    const versions = {
      cdkactions_version: version,
      constructs_version: constructsVersion,
    };

    return {
      ...ret,
      ...versions,
    };
  }

  if (version === '0.0.0') {
    throw new Error('cannot use version 0.0.0, use --cdkactions-version');
  }

  // determine if we want a specific pinned version or a version range we take
  // a pinned version if version includes a hyphen which means it is a
  // pre-release (e.g. "0.12.0-pre.e6834d3"). otherwise, we require a caret
  // version.
  const ver = version.includes('-') ? version : `^${version}`;

  return {
    npm_cdkactions: `cdkactions@${ver}`,
    npm_cdkactions_cli: `cdkactions-cli@${ver}`,
    pypi_cdkactions: `cdkactions~=${version}`, // no support for pre-release
    cdkactions_version: version,
    constructs_version: constructsVersion,
  };
}

interface Deps {
  npm_cdkactions: string;
  npm_cdkactions_cli: string;
  pypi_cdkactions: string;
  cdkactions_version: string;
  constructs_version: string;
}

module.exports = new Command();
