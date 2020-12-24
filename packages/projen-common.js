exports.options = {
    minNodeVersion: '10.17.0',
    repository: "https://github.com/ArmaanT/cdkactions.git",
    authorName: "Armaan Tobaccowalla",
    authorAddress: "armaan@tobaccowalla.com",
    buildWorkflow: false,
    pullRequestTemplate: false,
    releaseWorkflow: false,
    dependabot: false,
    mergify: false,
    compat: false,
    dependabot: false,
    keywords: ["cdk", "github", "actions", "constructs"],
}

exports.fixup = project => {
    // override the default "build" from projen because currently in this
    // repo it means "compile"
    project.addScripts({ build: 'yarn compile' });

    // add "compile" after test because the test command deletes lib/ and we run tests *after* build in this repo.
    project.addTestCommand('yarn compile');

    // jsii-release is declared at the root level, we don't need it here.
    delete project.devDependencies['jsii-release']

    delete project.manifest.scripts.bump;
    delete project.manifest.scripts.release;
};
