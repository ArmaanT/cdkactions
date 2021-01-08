# cdkactions

![Release](https://github.com/ArmaanT/cdkactions/workflows/Release/badge.svg)
[![codecov](https://codecov.io/gh/ArmaanT/cdkactions/branch/master/graph/badge.svg)](https://codecov.io/gh/ArmaanT/cdkactions)
[![NPM](https://badge.fury.io/js/cdkactions.svg)](https://badge.fury.io/js/cdkactions)
[![PyPI](https://badge.fury.io/py/cdkactions.svg)](https://badge.fury.io/py/cdkactions)

A [cdk](https://aws.amazon.com/cdk/) for GitHub Actions. cdkactions allows you to define GitHub Actions workflows and create abstractions in TypeScript and synthesize those workflows into YAML that the GitHub Actions runner expects.

This project was heavily influenced by [cdk8s](https://github.com/awslabs/cdk8s/) and [cdktf](https://github.com/hashicorp/terraform-cdk/).

### Contents

* [Overview](#overview)
* [Why](#why)
* [At a glance](#at-a-glance)
* [Validation workflow](#validation-workflow)
* [Library](#library)
* [Getting Started](#getting-started)
* [Examples](#examples)
* [License](#license)

## Overview

cdkactions allows you to define GitHub Action Workflows and Jobs as a tree of [constructs](https://github.com/aws/constructs) which are bundled into a `Stack` construct and exposed through a toplevel `App` construct. These constructs can then be synthesized into the actual `.yaml` configuration that GitHub Actions runs.

Additionally cdkactions optionally provides a GitHub Actions workflow that ensures the synthesized `.yaml` manifests are up to date with the actual cdkactions configuration.

## Why

cdkactions was built because [composite actions](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-composite-run-steps-action) are too restrictive to be of much use. Currently (as of December 2020) composite actions can't call other actions through `uses:` which prevents them from caching, uploading artifacts, and more. Here's the [most relevant issue](https://github.com/actions/runner/issues/646) about composite actions. cdkactions solves these issues by allowing the user to create a fully-featured Stack that can then be published to npm and used within other cdkactions instances.

On top of that, cdkactions provides additional features like strong type-checking as well as significantly better modularity.

## At a glance

![demo](docs/demo.gif)

## Validation workflow

cdkactions provides a validation workflow that ensures `.yaml` manifests are up to date with cdkactions configuration. This workflow can also push updated manifests when it detects any changes by setting the `pushUpdatedManifests` flag to true. However, if this option is enabled you must create a GitHub Actions secret called `CDKACTIONS_TOKEN` that contains a [Personal Access Token](https://github.com/settings/tokens) with the `workflow` scope (This workaround is required because the default GitHub token [doesn't have permission to change workflow files](https://docs.github.com/en/free-pro-team@latest/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token)).

## Library

cdkactions also contains a library of additional constructs:

* CheckoutJob - A job that inserts a checkout step as the first step to run.
* CDKActionsStack - A stack that contains the validation workflow described above.

## Getting Started

* [TypeScript](./docs/getting-started/typescript.md)

## Examples

* [TypeScript](./examples/typescript)

The CI for this repo is also bootstrapped using cdkactions see [the config](./.github/cdk/main.ts) for a more complicated example.

## License

This project is distributed under the [Apache License, Version 2.0](./LICENSE).
