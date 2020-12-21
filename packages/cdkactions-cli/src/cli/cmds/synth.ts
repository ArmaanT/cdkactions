import * as fs from 'fs-extra';
import * as yargs from 'yargs';
import { readConfigSync } from '../../config';
import { shell } from '../../utils';

const config = readConfigSync();

class Command implements yargs.CommandModule {
  public readonly command = 'synth';
  public readonly describe = 'Synthesizes GH Action manifests for all stacks in your app.';
  public readonly aliases = ['synthesize'];

  public readonly builder = (args: yargs.Argv) => args
    .option('app', { default: config.app, required: true, desc: 'Command to use in order to execute cdkactions app', alias: 'a' })

  public async handler(argv: any) {
    const command = argv.app;
    const outdir = config.output;
    const regex = /cdkactions_.*\.yaml/;

    (await fs.readdir(outdir)).filter(file => regex.test(file)).forEach(file => fs.removeSync(`${outdir}/${file}`));

    await shell(command, [], {
      shell: true,
      env: process.env,
    });

    if (!await fs.pathExists(outdir)) {
      console.error(`ERROR: synthesis failed, app expected to create "${outdir}"`);
      process.exit(1);
    }

    let found = false;
    for (const file of await fs.readdir(outdir)) {
      if (regex.test(file)) {
        console.log(`${outdir}/${file}`);
        found = true;
      }
    }

    if (!found) {
      console.error('No manifests synthesized');
    }
  }
}

module.exports = new Command();
