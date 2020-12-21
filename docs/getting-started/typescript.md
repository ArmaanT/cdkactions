# Getting Started (TypeScript)

## Install the CLI

The first step to using cdkactions is installing the cdkactions CLI which can be installed using npm or yarn:

``` bash
npm install -g cdkactions-cli
yarn global add cdkactions-cli
```

## Create a New Project

Navigate to the `.github` folder within your git repo and run the following commands:

``` bash
mkdir -p workflows cdk
cd cdk
cdkactions init typescript-app
```

This will:

* Create a workflows directory if one doesn't already exist
* Create a cdk directory and add all the required configuration to use cdkactions.

## Use cdkactions

The final step is to actually use cdkactions. See the [examples directory](../../examples/typescript/) or the [API guide](../../packages/cdkactions/API.md) for additional information.

## Synthesize manifests

When you make changes to your cdkactions project and want to update the `.yaml` manifests, just run the following command in the `cdk` folder:

``` bash
yarn build
```
