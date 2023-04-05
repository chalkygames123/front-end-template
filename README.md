# Front-End Template

[![Renovate: enabled](https://img.shields.io/badge/Renovate-enabled-brightgreen?logo=RenovateBot&logoColor=fff)](https://renovatebot.com/)
[![CI](https://github.com/chalkygames123/front-end-template/actions/workflows/ci.yaml/badge.svg)](https://github.com/chalkygames123/front-end-template/actions/workflows/ci.yaml)
[![Open in Visual Studio Code](https://img.shields.io/badge/-Open%20in%20Visual%20Studio%20Code-007acc?labelColor=2c2c32&logo=visualstudiocode&logoColor=007acc)](https://vscode.dev/github/chalkygames123/front-end-template)

> Practical template for building static websites

## Getting started

Create a new repository on GitHub from this template at https://github.com/chalkygames123/front-end-template/generate or with [GitHub CLI](https://cli.github.com/):

```shell
gh repo create my-project --public --clone --template chalkygames123/front-end-template
```

Alternatively, create a new directory and then run:

```shell
curl -fsSL https://github.com/chalkygames123/front-end-template/archive/main.tar.gz | tar -xz --strip-components=1
```

Right after the initialization, you may want to delete these files and directories or modify their content as you see fit:

- `.github`
- `LICENSE`
- `renovate.json`

### Examples

Several branches illustrate how to customize this template:

- [`example/format-html`](https://github.com/chalkygames123/front-end-template/compare/example/format-html) - format HTML output
- [`example/format-css`](https://github.com/chalkygames123/front-end-template/compare/example/format-css) - format CSS output
- [`example/relative-paths`](https://github.com/chalkygames123/front-end-template/compare/example/relative-paths) - use relative paths in HTML templates
- [`example/yakuhanjp`](https://github.com/chalkygames123/front-end-template/compare/example/yakuhanjp) - use Yaku Han JP with SCSS

---

**Remove everything from here and above**

---

# Project Name

[![code style: airbnb](https://img.shields.io/badge/code_style-airbnb-ff5a5f?logo=airbnb&logoColor=fff)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4?logo=prettier&logoColor=fff)](https://github.com/prettier/prettier)

Project description

## Prerequisites

Make sure you have the version of Node.js specified in [package.json#engines.node](package.json) installed. By using [Volta](https://volta.sh/), you can automatically switch the version.

## Usage

Install dependencies:

```shell
npm ci
```

Serve with live/hot reload at `localhost:8080`:

```shell
npm run dev
```

Run all format checking:

```shell
npm run check
```

Run all formatters:

```shell
npm run format
```

Run all linters:

```shell
npm run lint
```

Run all linters with autofix:

```shell
npm run fix
```

Build for production:

```shell
npm run build
```
