import * as dedent from 'dedent-js';
import { Construct } from "constructs";
import { App, Stack } from "cdkactions";

export class MyStack extends Stack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define workflows here

  }
}

const app = new App();
new MyStack(app, '{{ $base }}');
app.synth();
