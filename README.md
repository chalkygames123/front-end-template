# Front-End Template

A template for building static websites powered by gulp and webpack.

## Requirements

Make sure that the latest Active LTS version of Node.js installed. If you are using [nvm](https://github.com/creationix/nvm) it can be done with:

```bash
$ nvm install # or nvm i
```

Also, make sure that [Yarn](https://yarnpkg.com) installed since some scripts depend on it.

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

# lint all JS files
$ npm run lint:scripts # or yarn lint:scripts

# fix all JS files
$ npm run lint:scripts --fix # or yarn lint:scripts --fix

# lint all SCSS files
$ npm run lint:styles # or yarn lint:styles

# fix all SCSS files
$ npm run lint:styles --fix # or yarn lint:styles --fix

# check if all JSON and MD files are formatted
$ npm run format # or yarn format

# format all JSON and MD files
$ npm run format --write # or yarn format --write
```

### Production

```bash
# build for production
$ npm run build # or yarn build
```
