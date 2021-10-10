# Front-End Template

[![Renovate: enabled](https://img.shields.io/badge/Renovate-enabled-brightgreen?logo=RenovateBot&logoColor=fff)](https://renovatebot.com/)
[![CI](https://github.com/chalkygames123/front-end-template/actions/workflows/ci.yaml/badge.svg)](https://github.com/chalkygames123/front-end-template/actions/workflows/ci.yaml)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/chalkygames123/front-end-template)

> Practical template for building static websites

## Getting started

Create a new directory and then run:

```shell
$ curl -fsSL https://github.com/chalkygames123/front-end-template/archive/master.tar.gz | tar -xz --strip-components=1
```

Alternatively, [create a new repository from this template on GitHub](https://github.com/chalkygames123/front-end-template/generate).

Right after the initialization, you may want to delete these files and directories or modify their content as you see fit:

- `.github`
- `LICENSE`
- `renovate.json`

### Examples

There are several branches that illustrate how to customize this template.

- [`example/format-html`](https://github.com/chalkygames123/front-end-template/compare/example/format-html) - format HTML output
- [`example/format-css`](https://github.com/chalkygames123/front-end-template/compare/example/format-css) - format CSS output
- [`example/relative-paths`](https://github.com/chalkygames123/front-end-template/compare/example/relative-paths) - use relative paths in HTML templates

---

**Remove everything from here and above**

---

# Project Name

[![code style: airbnb](https://img.shields.io/badge/code_style-airbnb-ff5a5f?logo=airbnb&logoColor=fff)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4?logo=prettier&logoColor=fff)](https://github.com/prettier/prettier)

> Project description

## Prerequisites

Make sure you have the version of Node.js specified in [package.json#engines.node](package.json) installed. By using [Volta](https://volta.sh/), you can automatically switch the version.

## Usage

```shell
# install dependencies
$ npm ci

# serve with live/hot reload at localhost:3000
$ npm run dev

# run all linters
$ npm run lint

# run all linters with autofix
$ npm run fix

# run all formatters only for checking
$ npm run check

# run all formatters
$ npm run format

# build for production
$ npm run build
```
