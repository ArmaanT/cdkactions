const { JsiiProject, Semver } = require("projen");

const common = require("../projen-common");

const constructs_version = "3.2.3";

const project = new JsiiProject({
  name: "cdkactions",
  description: "Cloud Development Kit for GitHub Actions",
  ...common.options,

  jsiiVersion: Semver.caret(common.versions.jsii),
  peerDependencies: {
    constructs: Semver.caret(constructs_version),
  },
  devDependencies: {
    constructs: Semver.caret(constructs_version),
    "@types/js-yaml": Semver.caret("3.12.5"),
  },
  dependencies: {
    "js-yaml": Semver.caret("3.14.0"),
    "dedent-js": Semver.caret("1.0.1"),
  },
  bundledDependencies: [
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
