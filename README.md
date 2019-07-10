# strind

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
