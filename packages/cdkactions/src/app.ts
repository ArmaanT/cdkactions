import * as fs from 'fs';
import { Construct, Node } from 'constructs';
import { CDKActionsStack } from './library';

/**
 * Configuration for a cdkactions app.
 */
export interface AppProps {
  /**
   * The directory to synthesize GitHub Action manifests in.
   *
   * @default - "../workflows"
   */
  readonly outdir?: string;

  /**
   * Create a validation workflow to ensure cdkactions manifests are up to date.
   * @default - true
   */
  readonly createValidateWorkflow?: boolean;

  /**
   * Push updated manifests if they are out of date. Only used if `createValidateWorkflow` is true.
   * @default - false
   */
  readonly pushUpdatedManifests?: boolean;
}

/**
 * Represents a cdkactions application.
 */
export class App extends Construct {
  /**
   * The directory to synthesize GitHub Action manifests in.
   */
  public readonly outdir: string;

  /**
   * Defines a cdkaction app.
   * @param options Configuration options.
   */
  constructor(options?: AppProps) {
    // We unfortunately can't use Partial<AppProps> as a type for options due to JSII limitations.
    const config: AppProps = {
      createValidateWorkflow: true,
      pushUpdatedManifests: false,
      ...options,
    };

    super(undefined as any, '');
    this.outdir = config.outdir ?? '../workflows';
    if (config.createValidateWorkflow) {
      new CDKActionsStack(this, 'validate', { pushUpdatedManifests: config.pushUpdatedManifests });
    }
  }

  /**
   * Synthesizes all manifests into the output directory.
   */
  public synth(): void {
    if (!fs.existsSync(this.outdir)) {
      fs.mkdirSync(this.outdir);
    }

    Node.of(this).synthesize({
      outdir: this.outdir,
    });
  }
}
