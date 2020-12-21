import { Construct, Node } from 'constructs';
import { Job } from './job';
import { StringMap, DefaultsProps } from './types';
import { renameKeys, camelToSnake } from './utils';

/**
 * Configuration for the CheckRun event.
 */
export interface CheckRunTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'rerequested' | 'completed' | 'requested_action'>;
}

/**
 * Configuration for the CheckSuite event.
 */
export interface CheckSuiteTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'rerequested' | 'requested'>;
}

/**
 * Configuration for the IssueComment event.
 */
export interface IssueCommentTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'edited' | 'deleted'>;
}

/**
 * Configuration for the Issues event.
 */
export interface IssuesTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'opened' | 'edited' | 'deleted' | 'transferred' | 'pinned' | 'unpinned' | 'closed' | 'reopened' | 'assigned' | 'unassigned' | 'labeled' | 'unlabeled' | 'locked' | 'unlocked' | 'milestoned' | 'demilestoned'>;
}

/**
 * Configuration for the Label event.
 */
export interface LabelTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'edited' | 'deleted'>;
}

/**
 * Configuration for the Milestone event.
 */
export interface MilestoneTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'closed' | 'opened' | 'edited' | 'deleted'>;
}

/**
 * Configuration for the ProjectTypes event.
 */
export interface ProjectTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'updated' | 'closed' | 'reopened' | 'edited' | 'deleted'>;
}

/**
 * Configuration for the ProjectCard event.
 */
export interface ProjectCardTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'moved' | 'converted' | 'edited' | 'deleted'>;
}

/**
 * Configuration for the ProjectColumn event.
 */
export interface ProjectColumnTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'updated' | 'moved' | 'deleted'>;
}

/**
 * Configuration for the PullRequest event.
 */
export interface PullRequestTypes extends PushTypes {
  /**
   * Supported types.
   */
  readonly types?: Array<'assigned' | 'unassigned' | 'labeled' | 'unlabeled' | 'opened' | 'edited' | 'closed' | 'reopened' | 'synchronize' | 'ready_for_review' | 'locked' | 'unlocked' | 'review_requested' | 'review_request_removed'>;
}

/**
 * Configuration for the PullRequestReview event.
 */
export interface PullRequestReviewTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'submitted' | 'edited' | 'dismissed'>;
}

/**
 * Configuration for the PullRequestReviewComment event.
 */
export interface PullRequestReviewCommentTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'created' | 'edited' | 'deleted'>;
}

/**
 * Configuration for the PullRequestTarget event.
 */
export interface PullRequestTargetTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'assigned' | 'unassigned' | 'labeled' | 'unlabeled' | 'opened' | 'edited' | 'closed' | 'reopened' | 'synchronize' | 'ready_for_review' | 'locked' | 'unlocked' | 'review_requested' | 'review_request_removed'>;
}

/**
 * Configuration for the RegistryPackage event.
 */
export interface RegistryPackageTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'published' | 'updated'>;
}

/**
 * Configuration for the Release event.
 */
export interface ReleaseTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'published' | 'unpublished' | 'created' | 'edited' | 'deleted' | 'prereleased' | 'released'>;
}

/**
 * Configuration for the Watch event.
 */
export interface WatchTypes {
  /**
   * Supported types.
   */
  readonly types: Array<'started'>;
}

/**
 * Configuration for the Push event.
 */
export interface PushTypes {
  /**
   * Branches to trigger the workflow on.
   */
  readonly branches?: string[];

  /**
   * Branches to ignore when triggering the workflow.
   */
  readonly branchesIgnore?: string[];

  /**
   * Tags to trigger the workflow on.
   */
  readonly tags?: string[];

  /**
   * Tags to ignore when triggering the workflow.
   */
  readonly tagsIgnore?: string[];

  /**
   * Paths to trigger the workflow on.
   */
  readonly paths?: string[];

  /**
   * Paths to ignore when triggering the workflow.
   */
  readonly pathsIgnore?: string[];
}

/**
 * Configuration for the Schedule event.
 */
export interface ScheduleEvent {
  /**
   * A cron schedule to run the workflow on.
   */
  readonly schedule: [{ 'cron': string }];
}

/**
 * Configuration for the WorkflowRun event.
 */
export interface WorkflowRunEvent {
  /**
   * A list of workflows to trigger from.
   */
  readonly workflows: string[];

  /**
   * Branches to trigger this workflow on.
   */
  readonly branches?: string[];

  /**
   * Branches to ignore when triggering this workflow.
   */
  readonly branchesIgnore?: string[];

  /**
   * Supported types.
   */
  readonly types?: Array<'completed' | 'requested'>;
}

/**
 * Events without additional subtypes.
 */
export type EventStrings = 'workflowDispatch' | 'repositoryDispatch' | 'create' | 'delete' | 'deployment' | 'deploymentStatus' | 'fork' | 'gollum' | 'pageBuild' | 'public' | 'status';

/**
 * Events with additional subtypes.
 */
export interface EventMap {
  /**
   * The checkRun event.
   */
  readonly checkRun?: CheckRunTypes;

  /**
   * The checkSuite event.
   */
  readonly checkSuite?: CheckSuiteTypes;

  /**
   * The issueComment event.
   */
  readonly issueComment?: IssueCommentTypes;

  /**
   * The issues event.
   */
  readonly issues?: IssuesTypes;

  /**
   * The label event.
   */
  readonly label?: LabelTypes;

  /**
   * The milestone event.
   */
  readonly milestone?: MilestoneTypes;

  /**
   * The project event.
   */
  readonly project?: ProjectTypes;

  /**
   * The projectCard event.
   */
  readonly projectCard?: ProjectCardTypes;

  /**
   * The projectColumn event.
   */
  readonly projectColumn?: ProjectColumnTypes;

  /**
   * The pullRequest event.
   */
  readonly pullRequest?: PullRequestTypes;

  /**
   * The pullRequestReview event.
   */
  readonly pullRequestReview?: PullRequestReviewTypes;

  /**
   * The pullRequestReviewComment event.
   */
  readonly pullRequestReviewComment?: PullRequestReviewCommentTypes;

  /**
   * The pullRequestTarget event.
   */
  readonly pullRequestTarget?: PullRequestTargetTypes;

  /**
   * The push event.
   */
  readonly push?: PushTypes;

  /**
   * The registryPackage event.
   */
  readonly registryPackage?: RegistryPackageTypes;

  /**
   * The release event.
   */
  readonly release?: ReleaseTypes;

  /**
   * The watch event.
   */
  readonly watch?: WatchTypes;
}

/**
 * All the events that can trigger a workflow.
 */
export type Events = keyof EventMap | EventStrings;

/**
 * Configuration for a single GitHub Action workflow.
 */
export interface WorkflowProps {
  /**
   * Name of the workflow.
   */
  readonly name: string;

  /**
   * When to run this workflow.
   */
  readonly on: Events | Array<Events> | EventMap | ScheduleEvent | WorkflowRunEvent;

  /**
   * A map of environment variables to provide to the job.
   */
  readonly env?: StringMap;

  /**
   * A map of default settings to apply to all steps in this job.
   */
  readonly defaults?: DefaultsProps;
}

/**
 * Represents a GH Action workflow.
 */
export class Workflow extends Construct {
  /**
   * File to save synthesized workflow manifest in.
   */
  public readonly outputFile: string;

  /**
   * An internal representation of a GH Action workflow.
   */
  private readonly action: WorkflowProps;

  /**
   * Represents a GitHub Actions workflow.
   * @param scope An ActionsStack instance.
   * @param id The name of this workflow.
   * @param action The configuration for this workflow.
   */
  public constructor(scope: Construct, id: string, config: WorkflowProps) {
    super(scope, id);
    this.action = config;
    this.outputFile = `cdkactions_${id}.yaml`;
  }

  /**
   * Converts the workflow's configuration into a format that is GitHub Actions compatible.
   */
  public toGHAction(): any {
    const workflow = renameKeys(this.action, {
      branchesIgnore: 'branches-ignore',
      tagsIgnore: 'tags-ignore',
      pathsIgnore: 'paths-ignore',
      checkRun: 'check_run',
      checkSuite: 'check_suite',
      issueComment: 'issue_comment',
      projectCard: 'project_card',
      projectColumn: 'project_column',
      pullRequest: 'pull_request',
      pullRequestReview: 'pull_request_review',
      pullRequestReviewComment: 'pull_request_review_comment',
      pullRequestTarget: 'pull_request_target',
      registryPackage: 'registry_package',
      workingDirectory: 'working-directory',
    });
    if (typeof workflow.on == 'string') {
      workflow.on = camelToSnake(workflow.on);
    }
    if (Array.isArray(workflow.on)) {
      workflow.on = workflow.on.map(camelToSnake);
    }
    const ghaction: any = { ...workflow, jobs: {} };
    for (const child of Node.of(this).children) {
      if (child instanceof Job) {
        // AWS constructs ensure children of constructs must have unique ids.
        ghaction.jobs[child.id] = child.toGHAction();
      }
    }
    return ghaction;
  }
}

