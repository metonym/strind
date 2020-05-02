# strind

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]

> Partition strings based on character indices.

## Install

```bash
yarn add strind
```

## Usage

Required arguments are the string and an array of tuples that denote the start and end parse indices.

```js
import strind from "strind";

const result = strind("abcd", [
  [1, 1],
  [2, 6],
]);

console.log(result);
/**
 * {
      matched: ['b', 'cd'],
      unmatched: [
        {
          chars: 'a',
          index: 0
        }
      ]
    }
 *
 */
```

### Callback

The module accepts an optional callback as the third argument.

The function is called with the substring `chars` and boolean `matches` if the substring matches the array indices.

```js
import strind from "strind";

// signature
// strind(string, Array<Tuple>, [function])

const result = strind(
  "abcd",
  [
    [1, 1],
    [2, 6],
  ],
  ({ chars, matches }) => ({
    isHighlighted: matches,
    text: chars,
  })
);

console.log(result);
/**
 * [
      { isHighlighted: false, text: 'a' },
      { isHighlighted: true, text: 'b' },
      { isHighlighted: true, text: 'cd' }
    ]
 *
 */
```

## [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/strind.svg?color=blue
[npm-url]: https://npmjs.com/package/strind
[build]: https://travis-ci.com/metonym/strind.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/strind
