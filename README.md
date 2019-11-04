# Front-End Template

[![code style: airbnb](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license: MIT](https://img.shields.io/github/license/chalkygames123/front-end-template.svg)](https://opensource.org/licenses/MIT)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f464261d-62a9-4b11-9503-148eff317bb0/deploy-status)](https://app.netlify.com/sites/front-end-template-chalkygames123/deploys)

> A practical template for building static websites

## Getting started

Create a new directory and then run:

```bash
$ curl -fsSL https://github.com/chalkygames123/front-end-template/archive/master.tar.gz | tar -xz --strip-components=1
```

Alternatively, open the following link to create a new repository on GitHub from this template: https://github.com/chalkygames123/front-end-template/generate

## Prerequisites

Make sure you have the latest Active LTS version of Node.js installed. If you are using [nvm](https://github.com/nvm-sh/nvm), just run the following command once in your project:

```bash
$ nvm install # or nvm i
```

Also, make sure you have [Yarn](https://yarnpkg.com) installed.

## Usage

```bash
# install dependencies
$ yarn

# serve with live/hot reload at localhost:3000
$ yarn dev

# run all linting
$ yarn lint

# lint all .scss files
$ yarn lint:styles

# lint all .js files
$ yarn lint:scripts

# run all linting with auto fixing
$ yarn lint-fix

# lint all .scss files with auto fixing
$ yarn lint-fix:styles

# lint all .js files with auto fixing
$ yarn lint-fix:scripts

# check if all .json and .md files are formatted
$ yarn check:format

# format all .json and .md files
$ yarn format

# run all linting and format checking
$ yarn test

# build for production
$ yarn build
```
