import dedent from 'ts-dedent';
import { Construct } from "constructs";
import { App, Stack, Workflow, Job } from "cdkactions";

export class MyStack extends Stack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const workflow = new Workflow(this, "build-and-publish", {
      name: 'build-and-publish',
      on: 'push',
    })
    new Job(workflow, 'build-and-deploy', {
      runsOn: 'ubuntu-latest',
      container: {
        image: 'themattrix/tox'
      },
      steps: [
        {
          name: 'Lint',
          run: dedent`flake8 .
          isort -c .
          black --check .`
        },
        {
          name: 'Test',
          run: 'tox'
        },
        {
          name: 'Upload Code Coverage',
          uses: 'codecov/codecov-action@v1'
        },
        {
          name: 'Publish pypi package',
          run: dedent`python3 setup.py sdist bdist_wheel
          twine upload dist/*`
        }
      ],
    })
  }
}

const app = new App();
new MyStack(app, 'cdk');
app.synth();
