# API Reference

**Classes**

Name|Description
----|-----------
[App](#cdkactions-app)|Represents a cdkactions application.
[CDKActionsStack](#cdkactions-cdkactionsstack)|Provided CDKActions Stack that configures a workflow to validate cdkactions.
[CheckoutJob](#cdkactions-checkoutjob)|A special Job that includes a checkout step automatically.
[Job](#cdkactions-job)|Represents a GH Actions job.
[Stack](#cdkactions-stack)|Represents a cdkaction stack.
[Workflow](#cdkactions-workflow)|Represents a GH Action workflow.


**Structs**

Name|Description
----|-----------
[AppProps](#cdkactions-appprops)|Configuration for a cdkactions app.
[CDKActionsProps](#cdkactions-cdkactionsprops)|Configuration for a CDKActionsStack instance.
[CheckRunTypes](#cdkactions-checkruntypes)|Configuration for the CheckRun event.
[CheckSuiteTypes](#cdkactions-checksuitetypes)|Configuration for the CheckSuite event.
[CredentialsProps](#cdkactions-credentialsprops)|Credentials to connect to a Docker registry with.
[DefaultsProps](#cdkactions-defaultsprops)|A defaults configuration block.
[DockerProps](#cdkactions-dockerprops)|Generic Docker configuration.
[EventMap](#cdkactions-eventmap)|Events with additional subtypes.
[IssueCommentTypes](#cdkactions-issuecommenttypes)|Configuration for the IssueComment event.
[IssuesTypes](#cdkactions-issuestypes)|Configuration for the Issues event.
[JobProps](#cdkactions-jobprops)|Configuration for a single GitHub Action job.
[LabelTypes](#cdkactions-labeltypes)|Configuration for the Label event.
[MilestoneTypes](#cdkactions-milestonetypes)|Configuration for the Milestone event.
[ProjectCardTypes](#cdkactions-projectcardtypes)|Configuration for the ProjectCard event.
[ProjectColumnTypes](#cdkactions-projectcolumntypes)|Configuration for the ProjectColumn event.
[ProjectTypes](#cdkactions-projecttypes)|Configuration for the ProjectTypes event.
[PullRequestReviewCommentTypes](#cdkactions-pullrequestreviewcommenttypes)|Configuration for the PullRequestReviewComment event.
[PullRequestReviewTypes](#cdkactions-pullrequestreviewtypes)|Configuration for the PullRequestReview event.
[PullRequestTargetTypes](#cdkactions-pullrequesttargettypes)|Configuration for the PullRequestTarget event.
[PullRequestTypes](#cdkactions-pullrequesttypes)|Configuration for the PullRequest event.
[PushTypes](#cdkactions-pushtypes)|Configuration for the Push event.
[RegistryPackageTypes](#cdkactions-registrypackagetypes)|Configuration for the RegistryPackage event.
[ReleaseTypes](#cdkactions-releasetypes)|Configuration for the Release event.
[RunProps](#cdkactions-runprops)|Configuration for a shell environment.
[ScheduleEvent](#cdkactions-scheduleevent)|Configuration for the Schedule event.
[StepsProps](#cdkactions-stepsprops)|Propsuration for a single GitHub Action step.
[StrategyProps](#cdkactions-strategyprops)|Strategy configuration block.
[StringMap](#cdkactions-stringmap)|A generic string to string map.
[WatchTypes](#cdkactions-watchtypes)|Configuration for the Watch event.
[WorkflowProps](#cdkactions-workflowprops)|Configuration for a single GitHub Action workflow.
[WorkflowRunEvent](#cdkactions-workflowrunevent)|Configuration for the WorkflowRun event.



## class App  <a id="cdkactions-app"></a>

Represents a cdkactions application.

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer


Defines a cdkaction app.

```ts
new App(options?: AppProps)
```

* **options** (<code>[AppProps](#cdkactions-appprops)</code>)  Configuration options.
  * **createValidateWorkflow** (<code>boolean</code>)  Create a validation workflow to ensure cdkactions manifests are up to date. __*Default*__: true
  * **outdir** (<code>string</code>)  The directory to synthesize GitHub Action manifests in. __*Default*__: "../workflows"
  * **pushUpdatedManifests** (<code>boolean</code>)  Push updated manifests if they are out of date. __*Default*__: false



### Properties


Name | Type | Description 
-----|------|-------------
**outdir** | <code>string</code> | The directory to synthesize GitHub Action manifests in.

### Methods


#### synth() <a id="cdkactions-app-synth"></a>

Synthesizes all manifests into the output directory.

```ts
synth(): void
```







## class CDKActionsStack  <a id="cdkactions-cdkactionsstack"></a>

Provided CDKActions Stack that configures a workflow to validate cdkactions.

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Stack](#cdkactions-stack)

### Initializer




```ts
new CDKActionsStack(scope: Construct, id: string, config: CDKActionsProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **config** (<code>[CDKActionsProps](#cdkactions-cdkactionsprops)</code>)  *No description*
  * **pushUpdatedManifests** (<code>boolean</code>)  Push updated manifests if they are out of date. __*Default*__: false




## class CheckoutJob  <a id="cdkactions-checkoutjob"></a>

A special Job that includes a checkout step automatically.

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Job](#cdkactions-job)

### Initializer




```ts
new CheckoutJob(scope: Workflow, id: string, config: JobProps)
```

* **scope** (<code>[Workflow](#cdkactions-workflow)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **config** (<code>[JobProps](#cdkactions-jobprops)</code>)  *No description*
  * **runsOn** (<code>string</code>)  The type of machine to run on. 
  * **steps** (<code>Array<[StepsProps](#cdkactions-stepsprops)></code>)  A list of steps to run. 
  * **container** (<code>[DockerProps](#cdkactions-dockerprops)</code>)  A container to run the job in. __*Optional*__
  * **continueOnError** (<code>boolean</code>)  Continue workflow if job fails. __*Optional*__
  * **defaults** (<code>[DefaultsProps](#cdkactions-defaultsprops)</code>)  A map of default settings to apply to all steps in this job. __*Optional*__
  * **env** (<code>[StringMap](#cdkactions-stringmap)</code>)  A map of environment variables to provide to the job. __*Optional*__
  * **if** (<code>string</code>)  When to run this job. __*Optional*__
  * **name** (<code>string</code>)  Displayed name of the job. __*Optional*__
  * **needs** (<code>string &#124; Array<string></code>)  A job or list of jobs that must successfully complete before running this one. __*Optional*__
  * **outputs** (<code>[StringMap](#cdkactions-stringmap)</code>)  A map of outputs for this job. __*Optional*__
  * **services** (<code>Map<string, [DockerProps](#cdkactions-dockerprops)></code>)  Additional Docker services provided to the job. __*Optional*__
  * **strategy** (<code>[StrategyProps](#cdkactions-strategyprops)</code>)  A strategy configuration block. __*Optional*__
  * **timeoutMinutes** (<code>number</code>)  Maximum time before killing the job. __*Optional*__




## class Job  <a id="cdkactions-job"></a>

Represents a GH Actions job.

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer


Defines a GitHub Actions job.

```ts
new Job(scope: Workflow, id: string, config: JobProps)
```

* **scope** (<code>[Workflow](#cdkactions-workflow)</code>)  Workflow to run within.
* **id** (<code>string</code>)  A unique identifier.
* **config** (<code>[JobProps](#cdkactions-jobprops)</code>)  The configuration of the job.
  * **runsOn** (<code>string</code>)  The type of machine to run on. 
  * **steps** (<code>Array<[StepsProps](#cdkactions-stepsprops)></code>)  A list of steps to run. 
  * **container** (<code>[DockerProps](#cdkactions-dockerprops)</code>)  A container to run the job in. __*Optional*__
  * **continueOnError** (<code>boolean</code>)  Continue workflow if job fails. __*Optional*__
  * **defaults** (<code>[DefaultsProps](#cdkactions-defaultsprops)</code>)  A map of default settings to apply to all steps in this job. __*Optional*__
  * **env** (<code>[StringMap](#cdkactions-stringmap)</code>)  A map of environment variables to provide to the job. __*Optional*__
  * **if** (<code>string</code>)  When to run this job. __*Optional*__
  * **name** (<code>string</code>)  Displayed name of the job. __*Optional*__
  * **needs** (<code>string &#124; Array<string></code>)  A job or list of jobs that must successfully complete before running this one. __*Optional*__
  * **outputs** (<code>[StringMap](#cdkactions-stringmap)</code>)  A map of outputs for this job. __*Optional*__
  * **services** (<code>Map<string, [DockerProps](#cdkactions-dockerprops)></code>)  Additional Docker services provided to the job. __*Optional*__
  * **strategy** (<code>[StrategyProps](#cdkactions-strategyprops)</code>)  A strategy configuration block. __*Optional*__
  * **timeoutMinutes** (<code>number</code>)  Maximum time before killing the job. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**id** | <code>string</code> | A unique identifier.

### Methods


#### toGHAction() <a id="cdkactions-job-toghaction"></a>

Converts the job's configuration into a format that is GitHub Actions compatible.

```ts
toGHAction(): any
```


__Returns__:
* <code>any</code>



## class Stack  <a id="cdkactions-stack"></a>

Represents a cdkaction stack.

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer


Defines a cdkaction stack.

```ts
new Stack(scope: Construct, id: string)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  cdkaction app.
* **id** (<code>string</code>)  A unique identifier for this stack.


### Methods


#### protected onSynthesize(session) <a id="cdkactions-stack-onsynthesize"></a>

A custom `onSynthesize` function to generate GH Action manifests.

```ts
protected onSynthesize(session: ISynthesisSession): void
```

* **session** (<code>[ISynthesisSession](#constructs-isynthesissession)</code>)  Synthesis session.






## class Workflow  <a id="cdkactions-workflow"></a>

Represents a GH Action workflow.

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer


Represents a GitHub Actions workflow.

```ts
new Workflow(scope: Construct, id: string, config: WorkflowProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  An ActionsStack instance.
* **id** (<code>string</code>)  The name of this workflow.
* **config** (<code>[WorkflowProps](#cdkactions-workflowprops)</code>)  *No description*
  * **name** (<code>string</code>)  Name of the workflow. 
  * **on** (<code>[ScheduleEvent](#cdkactions-scheduleevent) &#124; [WorkflowRunEvent](#cdkactions-workflowrunevent) &#124; [EventMap](#cdkactions-eventmap) &#124; string &#124; Array<string></code>)  When to run this workflow. 
  * **defaults** (<code>[DefaultsProps](#cdkactions-defaultsprops)</code>)  A map of default settings to apply to all steps in this job. __*Optional*__
  * **env** (<code>[StringMap](#cdkactions-stringmap)</code>)  A map of environment variables to provide to the job. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**outputFile** | <code>string</code> | File to save synthesized workflow manifest in.

### Methods


#### toGHAction() <a id="cdkactions-workflow-toghaction"></a>

Converts the workflow's configuration into a format that is GitHub Actions compatible.

```ts
toGHAction(): any
```


__Returns__:
* <code>any</code>



## struct AppProps  <a id="cdkactions-appprops"></a>


Configuration for a cdkactions app.



Name | Type | Description 
-----|------|-------------
**createValidateWorkflow**? | <code>boolean</code> | Create a validation workflow to ensure cdkactions manifests are up to date.<br/>__*Default*__: true
**outdir**? | <code>string</code> | The directory to synthesize GitHub Action manifests in.<br/>__*Default*__: "../workflows"
**pushUpdatedManifests**? | <code>boolean</code> | Push updated manifests if they are out of date.<br/>__*Default*__: false



## struct CDKActionsProps  <a id="cdkactions-cdkactionsprops"></a>


Configuration for a CDKActionsStack instance.



Name | Type | Description 
-----|------|-------------
**pushUpdatedManifests**? | <code>boolean</code> | Push updated manifests if they are out of date.<br/>__*Default*__: false



## struct CheckRunTypes  <a id="cdkactions-checkruntypes"></a>


Configuration for the CheckRun event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct CheckSuiteTypes  <a id="cdkactions-checksuitetypes"></a>


Configuration for the CheckSuite event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct CredentialsProps  <a id="cdkactions-credentialsprops"></a>


Credentials to connect to a Docker registry with.



Name | Type | Description 
-----|------|-------------
**password** | <code>string</code> | Password to connect with.
**username** | <code>string</code> | Username to connect with.



## struct DefaultsProps  <a id="cdkactions-defaultsprops"></a>


A defaults configuration block.



Name | Type | Description 
-----|------|-------------
**run**? | <code>[RunProps](#cdkactions-runprops)</code> | A RunProps block.<br/>__*Optional*__



## struct DockerProps  <a id="cdkactions-dockerprops"></a>


Generic Docker configuration.



Name | Type | Description 
-----|------|-------------
**image** | <code>string</code> | Image to use.
**credentials**? | <code>[CredentialsProps](#cdkactions-credentialsprops)</code> | Credential configuration.<br/>__*Optional*__
**env**? | <code>[StringMap](#cdkactions-stringmap)</code> | Additional environment variables.<br/>__*Optional*__
**options**? | <code>string</code> | Additional Docker options.<br/>__*Optional*__
**ports**? | <code>Array<string></code> | Ports to map.<br/>__*Optional*__
**volumes**? | <code>Array<string></code> | Volumes to map.<br/>__*Optional*__



## struct EventMap  <a id="cdkactions-eventmap"></a>


Events with additional subtypes.



Name | Type | Description 
-----|------|-------------
**checkRun**? | <code>[CheckRunTypes](#cdkactions-checkruntypes)</code> | The checkRun event.<br/>__*Optional*__
**checkSuite**? | <code>[CheckSuiteTypes](#cdkactions-checksuitetypes)</code> | The checkSuite event.<br/>__*Optional*__
**issueComment**? | <code>[IssueCommentTypes](#cdkactions-issuecommenttypes)</code> | The issueComment event.<br/>__*Optional*__
**issues**? | <code>[IssuesTypes](#cdkactions-issuestypes)</code> | The issues event.<br/>__*Optional*__
**label**? | <code>[LabelTypes](#cdkactions-labeltypes)</code> | The label event.<br/>__*Optional*__
**milestone**? | <code>[MilestoneTypes](#cdkactions-milestonetypes)</code> | The milestone event.<br/>__*Optional*__
**project**? | <code>[ProjectTypes](#cdkactions-projecttypes)</code> | The project event.<br/>__*Optional*__
**projectCard**? | <code>[ProjectCardTypes](#cdkactions-projectcardtypes)</code> | The projectCard event.<br/>__*Optional*__
**projectColumn**? | <code>[ProjectColumnTypes](#cdkactions-projectcolumntypes)</code> | The projectColumn event.<br/>__*Optional*__
**pullRequest**? | <code>[PullRequestTypes](#cdkactions-pullrequesttypes)</code> | The pullRequest event.<br/>__*Optional*__
**pullRequestReview**? | <code>[PullRequestReviewTypes](#cdkactions-pullrequestreviewtypes)</code> | The pullRequestReview event.<br/>__*Optional*__
**pullRequestReviewComment**? | <code>[PullRequestReviewCommentTypes](#cdkactions-pullrequestreviewcommenttypes)</code> | The pullRequestReviewComment event.<br/>__*Optional*__
**pullRequestTarget**? | <code>[PullRequestTargetTypes](#cdkactions-pullrequesttargettypes)</code> | The pullRequestTarget event.<br/>__*Optional*__
**push**? | <code>[PushTypes](#cdkactions-pushtypes)</code> | The push event.<br/>__*Optional*__
**registryPackage**? | <code>[RegistryPackageTypes](#cdkactions-registrypackagetypes)</code> | The registryPackage event.<br/>__*Optional*__
**release**? | <code>[ReleaseTypes](#cdkactions-releasetypes)</code> | The release event.<br/>__*Optional*__
**watch**? | <code>[WatchTypes](#cdkactions-watchtypes)</code> | The watch event.<br/>__*Optional*__



## struct IssueCommentTypes  <a id="cdkactions-issuecommenttypes"></a>


Configuration for the IssueComment event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct IssuesTypes  <a id="cdkactions-issuestypes"></a>


Configuration for the Issues event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct JobProps  <a id="cdkactions-jobprops"></a>


Configuration for a single GitHub Action job.



Name | Type | Description 
-----|------|-------------
**runsOn** | <code>string</code> | The type of machine to run on.
**steps** | <code>Array<[StepsProps](#cdkactions-stepsprops)></code> | A list of steps to run.
**container**? | <code>[DockerProps](#cdkactions-dockerprops)</code> | A container to run the job in.<br/>__*Optional*__
**continueOnError**? | <code>boolean</code> | Continue workflow if job fails.<br/>__*Optional*__
**defaults**? | <code>[DefaultsProps](#cdkactions-defaultsprops)</code> | A map of default settings to apply to all steps in this job.<br/>__*Optional*__
**env**? | <code>[StringMap](#cdkactions-stringmap)</code> | A map of environment variables to provide to the job.<br/>__*Optional*__
**if**? | <code>string</code> | When to run this job.<br/>__*Optional*__
**name**? | <code>string</code> | Displayed name of the job.<br/>__*Optional*__
**needs**? | <code>string &#124; Array<string></code> | A job or list of jobs that must successfully complete before running this one.<br/>__*Optional*__
**outputs**? | <code>[StringMap](#cdkactions-stringmap)</code> | A map of outputs for this job.<br/>__*Optional*__
**services**? | <code>Map<string, [DockerProps](#cdkactions-dockerprops)></code> | Additional Docker services provided to the job.<br/>__*Optional*__
**strategy**? | <code>[StrategyProps](#cdkactions-strategyprops)</code> | A strategy configuration block.<br/>__*Optional*__
**timeoutMinutes**? | <code>number</code> | Maximum time before killing the job.<br/>__*Optional*__



## struct LabelTypes  <a id="cdkactions-labeltypes"></a>


Configuration for the Label event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct MilestoneTypes  <a id="cdkactions-milestonetypes"></a>


Configuration for the Milestone event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct ProjectCardTypes  <a id="cdkactions-projectcardtypes"></a>


Configuration for the ProjectCard event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct ProjectColumnTypes  <a id="cdkactions-projectcolumntypes"></a>


Configuration for the ProjectColumn event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct ProjectTypes  <a id="cdkactions-projecttypes"></a>


Configuration for the ProjectTypes event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct PullRequestReviewCommentTypes  <a id="cdkactions-pullrequestreviewcommenttypes"></a>


Configuration for the PullRequestReviewComment event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct PullRequestReviewTypes  <a id="cdkactions-pullrequestreviewtypes"></a>


Configuration for the PullRequestReview event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct PullRequestTargetTypes  <a id="cdkactions-pullrequesttargettypes"></a>


Configuration for the PullRequestTarget event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct PullRequestTypes  <a id="cdkactions-pullrequesttypes"></a>


Configuration for the PullRequest event.



Name | Type | Description 
-----|------|-------------
**branches**? | <code>Array<string></code> | Branches to trigger the workflow on.<br/>__*Optional*__
**branchesIgnore**? | <code>Array<string></code> | Branches to ignore when triggering the workflow.<br/>__*Optional*__
**paths**? | <code>Array<string></code> | Paths to trigger the workflow on.<br/>__*Optional*__
**pathsIgnore**? | <code>Array<string></code> | Paths to ignore when triggering the workflow.<br/>__*Optional*__
**tags**? | <code>Array<string></code> | Tags to trigger the workflow on.<br/>__*Optional*__
**tagsIgnore**? | <code>Array<string></code> | Tags to ignore when triggering the workflow.<br/>__*Optional*__
**types**? | <code>Array<string></code> | Supported types.<br/>__*Optional*__



## struct PushTypes  <a id="cdkactions-pushtypes"></a>


Configuration for the Push event.



Name | Type | Description 
-----|------|-------------
**branches**? | <code>Array<string></code> | Branches to trigger the workflow on.<br/>__*Optional*__
**branchesIgnore**? | <code>Array<string></code> | Branches to ignore when triggering the workflow.<br/>__*Optional*__
**paths**? | <code>Array<string></code> | Paths to trigger the workflow on.<br/>__*Optional*__
**pathsIgnore**? | <code>Array<string></code> | Paths to ignore when triggering the workflow.<br/>__*Optional*__
**tags**? | <code>Array<string></code> | Tags to trigger the workflow on.<br/>__*Optional*__
**tagsIgnore**? | <code>Array<string></code> | Tags to ignore when triggering the workflow.<br/>__*Optional*__



## struct RegistryPackageTypes  <a id="cdkactions-registrypackagetypes"></a>


Configuration for the RegistryPackage event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct ReleaseTypes  <a id="cdkactions-releasetypes"></a>


Configuration for the Release event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct RunProps  <a id="cdkactions-runprops"></a>


Configuration for a shell environment.



Name | Type | Description 
-----|------|-------------
**shell**? | <code>string</code> | The shell to use.<br/>__*Optional*__
**workingDirectory**? | <code>string</code> | A custom working directory.<br/>__*Optional*__



## struct ScheduleEvent  <a id="cdkactions-scheduleevent"></a>


Configuration for the Schedule event.



Name | Type | Description 
-----|------|-------------
**schedule** | <code>json</code> | A cron schedule to run the workflow on.



## struct StepsProps  <a id="cdkactions-stepsprops"></a>


Propsuration for a single GitHub Action step.



Name | Type | Description 
-----|------|-------------
**continueOnError**? | <code>boolean</code> | Continue job if step fails.<br/>__*Optional*__
**env**? | <code>[StringMap](#cdkactions-stringmap)</code> | Additional environment variables.<br/>__*Optional*__
**id**? | <code>string</code> | A unique identifier.<br/>__*Optional*__
**if**? | <code>string</code> | When to run this step.<br/>__*Optional*__
**name**? | <code>string</code> | A name to display when running this action.<br/>__*Optional*__
**run**? | <code>string</code> | Commands to run.<br/>__*Optional*__
**shell**? | <code>string</code> | The shell to use.<br/>__*Optional*__
**timeoutMinutes**? | <code>number</code> | Maximum time before killing the step.<br/>__*Optional*__
**uses**? | <code>string</code> | Use an external action.<br/>__*Optional*__
**with**? | <code>Map<string, string &#124; number &#124; boolean></code> | A map of parameters for an external action.<br/>__*Optional*__
**workingDirectory**? | <code>string</code> | A custom working directory.<br/>__*Optional*__



## struct StrategyProps  <a id="cdkactions-strategyprops"></a>


Strategy configuration block.



Name | Type | Description 
-----|------|-------------
**fastFail**? | <code>boolean</code> | Stop jobs when a single job fails.<br/>__*Optional*__
**matrix**? | <code>Map<string, Array<any>></code> | A matrix to run jobs on.<br/>__*Optional*__
**maxParallel**? | <code>number</code> | Maximum parallel jobs.<br/>__*Optional*__



## struct StringMap  <a id="cdkactions-stringmap"></a>


A generic string to string map.


## struct WatchTypes  <a id="cdkactions-watchtypes"></a>


Configuration for the Watch event.



Name | Type | Description 
-----|------|-------------
**types** | <code>Array<string></code> | Supported types.



## struct WorkflowProps  <a id="cdkactions-workflowprops"></a>


Configuration for a single GitHub Action workflow.



Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | Name of the workflow.
**on** | <code>[ScheduleEvent](#cdkactions-scheduleevent) &#124; [WorkflowRunEvent](#cdkactions-workflowrunevent) &#124; [EventMap](#cdkactions-eventmap) &#124; string &#124; Array<string></code> | When to run this workflow.
**defaults**? | <code>[DefaultsProps](#cdkactions-defaultsprops)</code> | A map of default settings to apply to all steps in this job.<br/>__*Optional*__
**env**? | <code>[StringMap](#cdkactions-stringmap)</code> | A map of environment variables to provide to the job.<br/>__*Optional*__



## struct WorkflowRunEvent  <a id="cdkactions-workflowrunevent"></a>


Configuration for the WorkflowRun event.



Name | Type | Description 
-----|------|-------------
**workflows** | <code>Array<string></code> | A list of workflows to trigger from.
**branches**? | <code>Array<string></code> | Branches to trigger this workflow on.<br/>__*Optional*__
**branchesIgnore**? | <code>Array<string></code> | Branches to ignore when triggering this workflow.<br/>__*Optional*__
**types**? | <code>Array<string></code> | Supported types.<br/>__*Optional*__



