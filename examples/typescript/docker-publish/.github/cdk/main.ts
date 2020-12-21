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
      steps: [
        {
          name: 'Publish docker image',
          uses: 'docker/build-push-action@v1',
          with: {
            repository: 'example/image',
            username: '${{ secrets.DOCKER_USERNAME }}',
            password: '${{ secrets.DOCKER_PASSWORD }}',
            push: "${{ github.ref == 'refs/heads/master' }}",
            tags: "latest,${{ github.sha }}",
          }
        }
      ],
    })
  }
}

const app = new App();
new MyStack(app, 'cdk');
app.synth();
