# @themost/json-logger

[![NPM](https://nodei.co/npm/@themost/json-logger.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@themost/json-logger/)

[![npm version](https://badge.fury.io/js/%40themost%2Fjson-logger.svg)](https://badge.fury.io/js/%40themost%2Fjson-logger)

A simple JSON logger for Node.js applications.

## Installation

```bash
npm i @themost/json-logger
```

## Usage

```javascript
const { JsonLogger } = require('@themost/json-logger');
const logger = new JsonLogger();
logger.info('Hello, world!');
```

Use `JsonLogger` class to create a new instance of JSON logger. 

```javascript
const { JsonLogger } = require('@themost/json-logger');
const logger = new JsonLogger({
    level: 'info',
    dateFormat: 'DD/MMM/YYYY:HH:mm:ss Z',
    format: 'json',
    stdout: process.stdout,
    stderr: process.stderr
});
```

The `JsonLogger` class accepts an options object with the following properties:

- `level`: The minimum log level to log. The default value is `info`. Available log levels are `info`, `warn`, `error`, `debug` and `verbose`.
- `format`: The log format. The default value is `json`. Available log formats are `json` and `raw`.
- `stdout`: The standard output stream. The default value is `process.stdout`.
- `stderr`: The standard error stream. The default value is `process.stderr`.
- `dateFormat`: The date format to use. The default value is `DD/MMM/YYYY:HH:mm:ss Z`. The date format is based on the [moment.js](https://momentjs.com/) library.

If the `format` property is set to `json`, the log message will be formatted as a JSON object. Otherwise, the log message will be formatted as a raw string.
If you try to instantiate a `JsonLogger` without log level, the default log level will be `info` or `debug` based on the `NODE_ENV` environment variable.

## Methods

The `JsonLogger` provides the following methods:

- `info(message: string, ...args: any[])`: Logs an informational message.
- `warn(message: string, ...args: any[])`: Logs a warning message.
- `error(message: string, ...args: any[])`: Logs an error message.
- `debug(message: string, ...args: any[])`: Logs a debug message.
- `verbose(message: string, ...args: any[])`: Logs a verbose message.
- `log(message: string, ...args: any[])`: Logs a message.


