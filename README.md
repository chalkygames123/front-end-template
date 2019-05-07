# Front-End Template

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub](https://img.shields.io/github/license/chalkygames123/front-end-template.svg)](https://opensource.org/licenses/MIT)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f464261d-62a9-4b11-9503-148eff317bb0/deploy-status)](https://app.netlify.com/sites/front-end-template-chalkygames123/deploys)

> A practical template for building static websites

## Prerequisites

Make sure you have the latest Active LTS version of Node.js installed. If you are using [nvm](https://github.com/creationix/nvm) it can be done with the following command after installing the template:

```bash
$ nvm install # or nvm i
```

Also, make sure you have [Yarn](https://yarnpkg.com) installed.

## Installation

In your directory, run:

```bash
$ curl -fsSL https://github.com/chalkygames123/front-end-template/archive/master.tar.gz | tar -xz --strip-components=1
```

## Setup

```bash
# install dependencies
$ yarn
```

## Usage

### Development

```bash
# serve with live/hot reloading at localhost:3000
$ yarn dev

# lint all .js files
$ yarn lint:scripts

# fix all .js files
$ yarn lint:scripts --fix

# lint all .scss files
$ yarn lint:styles

# fix all .scss files
$ yarn lint:styles --fix

# run each linter
$ yarn lint

# fix all .js and .scss files
$ yarn lint:fix

# check if all .json and .md files are formatted
$ yarn format

# format all .json and .md files
$ yarn format --write

# run each linter and formatter
$ yarn test
```

### Production

```bash
# build for production
$ yarn build
```
