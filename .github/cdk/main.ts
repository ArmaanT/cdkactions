import { Construct } from "constructs";
import { App, Stack, Workflow, Job, CheckoutJob } from "cdkactions";

export class JSIIReleaseStack extends Stack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // Build workflow
    const build = new Workflow(this, "build", {
      name: 'Build',
      on: ["pullRequest", "push"]
    });

    new CheckoutJob(build, 'build', {
      runsOn: 'ubuntu-latest',
      container: {
        image: 'jsii/superchain'
      },
      steps: [
        {
          name: 'Install dependencies',
          run: 'yarn install --frozen-lockfile'
        },
        {
          name: 'Set version',
          run: 'tools/align-version.sh'
        },
        {
          name: 'Compile',
          run: 'yarn build'
        },
        {
          name: 'Unit Tests',
          run: 'yarn test'
        },
        {
          name: 'Code Coverage',
          run: 'yarn codecov'
        },
        {
          name: 'Create Bundle',
          run: 'yarn package'
        },
        {
          name: 'Integration Tests',
          // run: 'yarn integration'
          run: 'echo TODO: add these'
        }
      ]
    });

    // Release workflow
    const release = new Workflow(this, "release", {
      name: 'Release',
      on: { push: { branches: ['master'] } }
    });

    new CheckoutJob(release, 'build_artifact', {
      name: 'Build and upload artifact',
      if: "github.repository == 'ArmaanT/cdkactions'",
      runsOn: 'ubuntu-latest',
      container: {
        image: 'jsii/superchain'
      },
      steps: [
        {
          name: 'Install dependencies',
          run: 'yarn install --frozen-lockfile'
        },
        {
          name: 'Set version',
          run: 'tools/align-version.sh'
        },
        {
          name: 'Compile',
          run: 'yarn build'
        },
        {
          name: 'Unit Tests',
          run: 'yarn test'
        },
        {
          name: 'Code Coverage',
          run: 'yarn codecov'
        },
        {
          name: 'Create Bundle',
          run: 'yarn package'
        },
        {
          name: 'Integration Tests',
          // run: 'yarn integration'
          run: 'echo TODO: add these'
        },
        {
          name: 'Upload artifact',
          uses: 'actions/upload-artifact@v1',
          with: {
            name: 'dist',
            path: 'dist'
          }
        },
        {
          name: 'Release to GitHub',
          run: 'tools/release-github.sh',
          env: {
            GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
            REPO: '${{ github.repository }}',
          }
        },
      ]
    });

    new Job(release, 'release_npm', {
      name: 'Release to NPM',
      needs: 'build_artifact',
      runsOn: 'ubuntu-latest',
      container: {
        image: 'jsii/superchain'
      },
      steps: [
        {
          name: 'Download build artifacts',
          uses: 'actions/download-artifact@v1',
          with: {
            name: 'dist'
          }
        },
        {
          name: 'Release',
          run: 'npx -p jsii-release jsii-release-npm',
          env: {
            NPM_TOKEN: '${{ secrets.NPM_TOKEN }}'
          }
        }
      ]
    });

    new Job(release, 'release_pypi', {
      name: 'Release to PyPI',
      needs: 'build_artifact',
      runsOn: 'ubuntu-latest',
      container: {
        image: 'jsii/superchain'
      },
      steps: [
        {
          name: 'Download build artifacts',
          uses: 'actions/download-artifact@v1',
          with: {
            name: 'dist'
          }
        },
        {
          name: 'Release',
          run: 'npx -p jsii-release jsii-release-pypi',
          env: {
            TWINE_USERNAME: '${{ secrets.TWINE_USERNAME }}',
            TWINE_PASSWORD: '${{ secrets.TWINE_PASSWORD }}'
          }
        }
      ]
    });
  }
}

const app = new App();
new JSIIReleaseStack(app, 'jsii');
app.synth();
