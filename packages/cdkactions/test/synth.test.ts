import * as fs from 'fs';
import { Construct } from 'constructs';
import { CheckoutJob } from '../src/library';
import { Stack } from '../src/stack';
import { Workflow } from '../src/workflow';
import { TestingApp } from './utils';


test('complicated stack', () => {
  class MyStack extends Stack {
    constructor(scope: Construct, name: string) {
      super(scope, name);

      const build = new Workflow(this, 'build', {
        name: 'Build',
        on: ['push', 'fork', 'pullRequest'],
        defaults: {
          run: {
            workingDirectory: '~/',
          },
          env: {
            key: 'value',
          },
        },
      },
      );
      new CheckoutJob(build, 'build', {
        runsOn: 'ubuntu-latest',
        steps: [
          {
            name: 'Cache',
            uses: 'actions/cache@v2',
            with: {
              path: '**/files',
              key: 'v0-${{ hashFiles(\'Dockerfile\') }}',
            },
          },
          {
            name: 'Build docker',
            uses: 'docker/build-push-action@v1',
            with: {
              repository: 'example/image',
              path: 'path/to/Dockerfile',
              username: '${{ secrets.DOCKER_USERNAME }}',
              password: '${{ secrets.DOCKER_PASSWORD }}',
              push: "${{ github.ref == 'refs/heads/master' }}",
              tags: 'latest,${{ github.sha }}',
            },
            continueOnError: false,
          },
        ],
        continueOnError: false,
      });

      new Workflow(this, 'deploy', {
        name: 'Deploy',
        on: {
          push: {
            branches: ['master'],
          },
        },
      });

      const schedule = new Workflow(this, 'schedule', {
        name: 'Cron',
        on: {
          schedule: [{
            cron: '*/15 * * * *',
          }],
        },
      });
      new CheckoutJob(schedule, 'matrix', {
        runsOn: '${{ matrix.os }}',
        strategy: {
          matrix: {
            os: ['macos-latest', 'windows-latest', 'ubuntu-latest'],
            node: [4, 6, 8, 10],
            include: [{ os: 'windows-latest', node: 4, npm: 2 }],
          },
        },
        steps: [],
      });
    }
  }

  const app = TestingApp({ createValidateWorkflow: false });
  new MyStack(app, 'abc');

  app.synth();
  expect(fs.readdirSync(app.outdir)).toEqual([
    'cdkactions_build.yaml',
    'cdkactions_deploy.yaml',
    'cdkactions_schedule.yaml',
  ]);

  expect(fs.readFileSync(`${app.outdir}/cdkactions_build.yaml`, 'utf-8')).toMatchSnapshot();
  expect(fs.readFileSync(`${app.outdir}/cdkactions_deploy.yaml`, 'utf-8')).toMatchSnapshot();
  expect(fs.readFileSync(`${app.outdir}/cdkactions_schedule.yaml`, 'utf-8')).toMatchSnapshot();
});
