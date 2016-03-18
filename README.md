# node-sentry-error-reporter

> Automatically reports Node crashes to Sentry if SENTRY_URL is in the environment

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]

## Install

    npm i -S node-sentry-error-reporter

## Use

The goal is to have zero configuration reporter that handles global or app's errors
automatically.

Set environment variable `SENTRY_URL` if you need exception reporting.
Then just require the module and pass (if needed) a server object, for example an Express app.

```js
const reporter = require('node-sentry-error-reporter')
reporter()
// or if inside Express app
const app = express()
reporter(app)
```

If `NODE_ENV` is 'production' the errors will be forwarded to the Sentry server,
otherwise just printed to the console error stream.

## Report an error

The module returns a function you can use to report instances of error.

```js
const init = require('node-sentry-error-reporter')
const report = init()
report(new Error('something went wrong'))
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2016

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/node-sentry-error-reporter/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/node-sentry-error-reporter.png?downloads=true
[npm-url]: https://npmjs.org/package/node-sentry-error-reporter
[ci-image]: https://travis-ci.org/bahmutov/node-sentry-error-reporter.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/node-sentry-error-reporter
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
