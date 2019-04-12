# Front-End Template

A template for building static websites powered by gulp and webpack.

## Prerequisites

Make sure you have the latest Active LTS version of Node.js installed. If you are using [nvm](https://github.com/creationix/nvm) it can be done with the following command after installing the template:

```bash
$ nvm install # or nvm i
```

Also, make sure you have [Yarn](https://yarnpkg.com) installed since some scripts depend on it.

## Installation

In your directory, run:

```bash
$ curl -fsSL https://github.com/chalkygames123/front-end-template/archive/master.tar.gz | tar -xz --strip-components=1
```

## Setup

```bash
# install dependencies
$ npm install # or yarn
```

## Usage

### Development

```bash
# serve with live/hot reloading at localhost:3000
$ npm run dev # or yarn dev

# lint all .js files
$ npm run lint:scripts # or yarn lint:scripts

# fix all .js files
$ npm run lint:scripts -- --fix # or yarn lint:scripts --fix

# lint all .scss files
$ npm run lint:styles # or yarn lint:styles

# fix all .scss files
$ npm run lint:styles -- --fix # or yarn lint:styles --fix

# run each linter
$ npm run lint # or yarn lint

# fix all .js and .scss files
$ npm run lint:fix # or yarn lint:fix

# check if all .json and .md files are formatted
$ npm run format # or yarn format

# format all .json and .md files
$ npm run format -- --write # or yarn format --write

# run each linter and formatter
$ npm run test # or yarn test
```

### Production

```bash
# build for production
$ npm run build # or yarn build
```
