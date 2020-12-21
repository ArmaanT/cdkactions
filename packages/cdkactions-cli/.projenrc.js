const { TypeScriptLibraryProject, Semver } = require('projen');
const common = require('../projen-common');

const project = new TypeScriptLibraryProject({
    name: 'cdkactions-cli',
    description: 'CDK for GitHub Actions CLI',
    ...common.options,

    bin: {
        cdkactions: 'bin/cdkactions'
    },
    jsiiVersion: Semver.caret(common.versions.jsii),
    dependencies: {
        "cdkactions": Semver.pinned('0.0.0'),
        "constructs": Semver.caret(common.versions.constructs),
        "sscaff": Semver.caret('1.2.0'),
        "yaml": Semver.caret('1.10.0'),
        "yargs": Semver.caret('16.1.0'),
        "fs-extra": Semver.caret('9.0.1'),
    },
    devDependencies: {
        "@types/fs-extra": Semver.caret('8.1.0'),
    },
});

common.fixup(project);

project.synth();
