# strind

[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Build][build]][build-badge]
[![Coverage][codecov-shield]][codecov]

> Partition strings based on character indices.

## Install

```bash
yarn add strind
```

## Usage

```js
import strind from 'strind';

const result = strind('abcd', [[1, 1], [2, 6]]);
console.log(result); // ['b', 'cd']
```

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/strind.svg?color=blue
[npm-url]: https://npmjs.com/package/strind
[deps]: https://david-dm.org/metonym/strind.svg
[deps-url]: https://david-dm.org/metonym/strind
[build]: https://travis-ci.com/metonym/strind.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/strind
[codecov]: https://codecov.io/gh/metonym/strind
[codecov-shield]: https://img.shields.io/codecov/c/github/metonym/strind.svg
