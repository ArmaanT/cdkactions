import { Construct } from 'constructs';
import dedent from 'ts-dedent';
import { Job, JobProps, StepsProps } from './job';
import { Stack } from './stack';
import { Workflow } from './workflow';


/**
 * Configuration for a CDKActionsStack instance.
 */
export interface CDKActionsProps {
  /**
   * Push updated manifests if they are out of date.
   * @default - false
   */
  readonly pushUpdatedManifests?: boolean;
}

/**
 * Provided CDKActions Stack that configures a workflow to validate cdkactions
 */
export class CDKActionsStack extends Stack {
  public constructor(scope: Construct, id: string, config: CDKActionsProps) {
    super(scope, id);
    const token = config.pushUpdatedManifests ? 'secrets.CDKACTIONS_TOKEN' : 'github.token';
    const synth = new Workflow(this, 'validate', {
      name: 'Validate cdkactions manifests',
      on: 'push',
    });
    new Job(synth, 'validate', {
      name: 'Validate cdkactions manifests',
      runsOn: 'ubuntu-latest',
      steps: [
        {
          uses: 'actions/checkout@v2',
          with: {
            token: `\${{ ${token} }}`,
          },
        },
        {
          name: 'Validate manifests',
          run: dedent`cd .github/cdk
                yarn install
                yarn build
                git --no-pager diff ../workflows
                git diff-index --quiet HEAD -- ../workflows`,
        },
        {
          name: 'Push updated manifests',
          if: config.pushUpdatedManifests ? 'always()' : 'false',
          run: dedent`cd .github/workflows
                git config user.name github-actions
                git config user.email github-actions[bot]@users.noreply.github.com
                git add .
                git commit -m "Update cdkactions manifests" || exit 0
                git push`,
        },
      ],
    });
  }
}

/**
 * A special Job that includes a checkout step automatically.
 */
export class CheckoutJob extends Job {
  public constructor(scope: Workflow, id: string, config: JobProps) {
    const steps: StepsProps[] = ([{ uses: 'actions/checkout@v2' }] as StepsProps[]).concat(config.steps);
    super(scope, id, { ...config, steps });
  }
}
