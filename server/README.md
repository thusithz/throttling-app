# Throttling App Server (Express API)

This project is exposing end points with {api/v1} version (authentication is validating with JWT token)
- [IP Throttling] specialy limits requests for an IP in a certain interval using redis caching


Includes API Server utilities:

- [morgan]
  - HTTP request logger middleware for node.js
- [helmet]
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [dotenv]
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`

Development utilities:

- [ts-node-dev]
  - ts-node-dev is a library that restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts.
- [eslint]
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [typescript]
  - TypeScript is a language for application-scale JavaScript. Javascript with superpowers!

## Pre require setup

```
nodejs, mongodb, Redis
```

## Setup

```
yarn install
```

## Lint

```
yarn run lint
```

## Test

```
yarn run test
```

## Development

```
yarn run start
```

## Build

```
yarn run build
```
