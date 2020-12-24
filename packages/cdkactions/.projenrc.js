const { JsiiProject } = require("projen");

const common = require("../projen-common");

const project = new JsiiProject({
  name: "cdkactions",
  description: "Cloud Development Kit for GitHub Actions",
  ...common.options,

  peerDependencyOptions: {
    pinnedDevDependency: false,
  },

  peerDeps: ['constructs'],
  devDeps: ['constructs', '@types/js-yaml'],
  deps: ['js-yaml', 'dedent-js'],
  bundledDeps: [
    "js-yaml",
    "dedent-js",
  ],

  python: {
    distName: "cdkactions",
    module: "cdkactions",
  },
});

common.fixup(project);

project.synth();
