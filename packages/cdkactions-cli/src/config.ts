import * as fs from 'fs-extra';
import * as yaml from 'yaml';

const CONFIG_FILE = 'cdkactions.yaml';

export interface Config {
  readonly app?: string;
  readonly output: string;
}

const DEFAULTS: Config = {
  output: '../workflows',
};

export function readConfigSync(): Config {
  let config: Config = DEFAULTS;
  if (fs.existsSync(CONFIG_FILE)) {
    config = {
      ...config,
      ...yaml.parse(fs.readFileSync(CONFIG_FILE, 'utf-8')),
    };
  }

  return config;
}
