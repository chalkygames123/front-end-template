# Front-End Template

[![Renovate: enabled](https://img.shields.io/badge/Renovate-enabled-brightgreen?logo=RenovateBot&logoColor=fff)](https://renovatebot.com/)
[![CI](https://github.com/chalkygames123/front-end-template/actions/workflows/ci.yml/badge.svg)](https://github.com/chalkygames123/front-end-template/actions/workflows/ci.yml)

> Practical template for building static websites

## Getting started

Create a new directory and then run:

```shell
$ curl -fsSL https://github.com/chalkygames123/front-end-template/archive/master.tar.gz | tar -xz --strip-components=1
```

Alternatively, [create a new repository from this template on GitHub](https://github.com/chalkygames123/front-end-template/generate).

Right after the initialization, you may want to delete these files and directories or modify its content as you see fit:

- `.github`
- `LICENSE`
- `renovate.json`

---

**Remove everything from here and above**

---

# Project Name

[![code style: airbnb](https://img.shields.io/badge/code_style-airbnb-ff5a5f?logo=airbnb&logoColor=fff)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4?logo=prettier&logoColor=fff)](https://github.com/prettier/prettier)

> Project description

## Prerequisites

Make sure you have Node.js 15.x installed. By using [Volta](https://volta.sh/), you can automatically switch the version.

## Usage

```shell
# install dependencies
$ npm ci

# serve with live/hot reload at localhost:3000
$ npm run dev

# run all lints
$ npm run lint

# lint all .js files
$ npm run lint:scripts

# lint all .scss files
$ npm run lint:styles

# run all lints with autofix
$ npm run fix

# lint all .js files with autofix
$ npm run fix:scripts

# lint all .scss files with autofix
$ npm run fix:styles

# check if all files are formatted
$ npm run format-check

# format all files
$ npm run format

# build for production
$ npm run build
```
