exports.options = {
    minNodeVersion: '10.17.0',
    repository: "https://github.com/ArmaanT/cdkactions.git",
    authorName: "Armaan Tobaccowalla",
    authorAddress: "armaan@tobaccowalla.com",
    buildWorkflow: false,
    compat: false,
    dependabot: false,
    mergify: false,
    pullRequestTemplate: false,
    rebuildBot: false,
    releaseWorkflow: false,
    keywords: ["cdk", "github", "actions", "constructs"],
}

exports.fixup = project => {
    // override the default "build" from projen because currently in this
    // repo it means "compile"
    project.setScript('build', 'yarn compile');

    project.buildTask.reset();
    project.buildTask.spawn(project.compileTask);
    // add "compile" after test because the test command deletes lib/ and we run tests *after* build in this repo.
    project.addTestCommand('yarn compile');

    delete project.manifest.scripts.bump;
    delete project.manifest.scripts.release;
};
