const { JsiiProject } = require('projen');

const common = require('../projen-common');

const project = new JsiiProject({
  name: 'cdkactions',
  description: 'Cloud Development Kit for GitHub Actions',
  ...common.options,

  peerDependencyOptions: {
    pinnedDevDependency: false,
  },

  peerDeps: ['constructs'],
  devDeps: ['constructs', '@types/js-yaml'],
  deps: ['js-yaml', 'ts-dedent'],
  bundledDeps: [
    'js-yaml',
    'ts-dedent',
  ],

  python: {
    distName: 'cdkactions',
    module: 'cdkactions',
  },
});

common.fixup(project);

project.synth();
