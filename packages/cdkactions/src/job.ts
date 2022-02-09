import { Construct } from 'constructs';
import { StringMap, RunProps, DefaultsProps } from './types';
import { renameKeys } from './utils';
import { Workflow } from './workflow';


/**
 * Credentials to connect to a Docker registry with.
 */
export interface CredentialsProps {
  /**
   * Username to connect with.
   */
  readonly username: string;

  /**
   * Password to connect with.
   */
  readonly password: string;
}

/**
 * Generic Docker configuration.
 */
export interface DockerProps {
  /**
   * Image to use.
   */
  readonly image: string;

  /**
   * Credential configuration.
   */
  readonly credentials?: CredentialsProps;

  /**
   * Additional environment variables.
   */
  readonly env?: StringMap;

  /**
   * Ports to map.
   */
  readonly ports?: string[];

  /**
   * Volumes to map.
   */
  readonly volumes?: string[];

  /**
   * Additional Docker options.
   */
  readonly options?: string;
}

/**
 * Propsuration for a single GitHub Action step.
 */
export interface StepsProps extends RunProps {
  /**
   * A unique identifier.
   */
  readonly id?: string;

  /**
   * When to run this step.
   */
  readonly if?: string;

  /**
   * A name to display when running this action.
   */
  readonly name?: string;

  /**
   * Use an external action.
   */
  readonly uses?: string;

  /**
   * Commands to run.
   */
  readonly run?: string;

  /**
   * A map of parameters for an external action.
   */
  readonly with?: { [key: string]: string | number | boolean };

  /**
   * Additional environment variables.
   */
  readonly env?: StringMap;

  /**
   * Continue job if step fails.
   */
  readonly continueOnError?: boolean;

  /**
   * Maximum time before killing the step.
   */
  readonly timeoutMinutes?: number;
}

/**
 * Strategy configuration block.
 */
export interface StrategyProps {
  /**
   * A matrix to run jobs on.
   */
  readonly matrix?: { [key: string]: Array<any> };

  /**
   * Stop jobs when a single job fails.
   */
  readonly fastFail?: boolean;

  /**
   * Maximum parallel jobs.
   */
  readonly maxParallel?: number;
}

/**
 * Environment configuration block.
 */
export interface EnvironmentProps {
  /**
   * Name of the deployment environment.
   */
  readonly name?: string;

  /**
   * URL of the deployment environment.
   */
  readonly url?: string;
}

/**
 * Configuration for a single GitHub Action job.
 */
export interface JobProps {
  /**
   * Displayed name of the job.
   */
  readonly name?: string;

  /**
   * A job or list of jobs that must successfully complete before running this one.
   */
  readonly needs?: string | string[];

  /**
   * The type of machine to run on.
   */
  readonly runsOn: string;

  /**
   * A map of outputs for this job.
   */
  readonly outputs?: StringMap;

  /**
   * A map of environment variables to provide to the job.
   */
  readonly env?: StringMap;

  /**
   * The deployment environment of this job.
   */
  readonly environment?: string | EnvironmentProps;

  /**
   * A map of default settings to apply to all steps in this job.
   */
  readonly defaults?: DefaultsProps;

  /**
   * When to run this job.
   */
  readonly if?: string;

  /**
   * A list of steps to run.
   */
  readonly steps: StepsProps[];

  /**
   * Maximum time before killing the job.
   */
  readonly timeoutMinutes?: number;

  /**
   * A strategy configuration block.
   */
  readonly strategy?: StrategyProps;

  /**
   * Continue workflow if job fails.
   */
  readonly continueOnError?: boolean;

  /**
   * A container to run the job in.
   */
  readonly container?: DockerProps;

  /**
   * Additional Docker services provided to the job.
   */
  readonly services?: { [key: string]: DockerProps };
}

/**
 * Represents a GH Actions job.
 */
export class Job extends Construct {
  /**
   * An internal representation of a GH Action job
   */
  private readonly action: JobProps;

  /**
   * A unique identifier
   */
  public readonly id: string;

  /**
   * Defines a GitHub Actions job.
   * @param scope Workflow to run within.
   * @param id A unique identifier.
   * @param config The configuration of the job.
   */
  public constructor(scope: Workflow, id: string, config: JobProps) {
    super(scope, id);
    this.id = id;
    this.action = config;
  }

  /**
   * Converts the job's configuration into a format that is GitHub Actions compatible.
   */
  public toGHAction(): any {
    return renameKeys(this.action, {
      runsOn: 'runs-on',
      continueOnError: 'continue-on-error',
      timeoutMinutes: 'timeout-minutes',
      fastFail: 'fail-fast',
      maxParallel: 'max-parallel',
      workingDirectory: 'working-directory',
    });
  }
}
