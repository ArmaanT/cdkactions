const { TypeScriptLibraryProject } = require('projen');
const common = require('../projen-common');

const project = new TypeScriptLibraryProject({
  name: 'cdkactions-cli',
  description: 'CDK for GitHub Actions CLI',
  ...common.options,

  bin: {
    cdkactions: 'bin/cdkactions',
  },

  deps: [
    'cdkactions@^0.0.0',
    'constructs',
    'sscaff',
    'yaml',
    'yargs',
    'fs-extra',
  ],
  devDeps: [
    '@types/fs-extra',
  ],
});

common.fixup(project);

project.synth();
