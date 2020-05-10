import { strict as test } from "assert";
import strind from "./strind";

test.deepEqual(strind("abcd", [0, 3]), {
  matched: ["abcd"],
  unmatched: [],
});

const result1 = strind(
  "abcd",
  [
    [1, 1],
    [2, 6],
  ],
  ({ chars, matches }) => ({
    text: chars,
    isHighlighted: matches,
  })
);
test.deepEqual(result1.matched, [
  { isHighlighted: false, text: "a" },
  { isHighlighted: true, text: "b" },
  { isHighlighted: true, text: "cd" },
]);
test.deepEqual(result1.unmatched, [{ chars: "a", index: 0 }]);

test.deepEqual(
  strind("abcd", [
    [1, 1],
    [2, 6],
  ]),
  {
    matched: ["b", "cd"],
    unmatched: [{ chars: "a", index: 0 }],
  }
);

const result2 = strind("abcd", [0, 0]);
test.deepEqual(result2.matched, ["a"]);
test.deepEqual(result2.unmatched, [{ chars: "bcd", index: 1 }]);

test.deepEqual(
  strind("abcdef", [
    [1, 1],
    [3, 4],
  ]).matched,
  ["b", "de"]
);

test.deepEqual(
  strind("abcdef", [
    [1, 1],
    [3, 4],
  ]).unmatched,
  [
    { chars: "a", index: 0 },
    { chars: "c", index: 1 },
    { chars: "f", index: 2 },
  ]
);

test.deepEqual(
  strind("abcd", [
    [0, 0],
    [1, 1],
  ]).matched,
  ["a", "b"]
);

test.deepEqual(
  strind("abcd", [
    [0, 0],
    [1, 1],
  ]).unmatched,
  [{ chars: "cd", index: 2 }]
);

test.deepEqual(
  strind("abcdef", [
    [0, 0],
    [3, 4],
  ]).matched,
  ["a", "de"]
);

test.deepEqual(
  strind("abcdef", [
    [0, 0],
    [3, 4],
  ]).unmatched,
  [
    { chars: "bc", index: 1 },
    { chars: "f", index: 2 },
  ]
);

test.deepEqual(
  strind<{ text: string; isHighlighted: boolean }>(
    "abcd",
    [
      [0, 0],
      [1, 1],
    ],
    ({ matches, chars }) => {
      return {
        text: chars,
        isHighlighted: matches,
      };
    }
  ).matched,
  [
    { isHighlighted: true, text: "a" },
    { isHighlighted: true, text: "b" },
    { isHighlighted: false, text: "cd" },
  ]
);

test.deepEqual(
  strind<{ text: string; isHighlighted: boolean }>(
    "abcdef",
    [
      [0, 0],
      [3, 4],
    ],
    ({ matches, chars }) => {
      return {
        text: chars,
        isHighlighted: matches,
      };
    }
  ).matched,
  [
    { isHighlighted: true, text: "a" },
    { isHighlighted: false, text: "bc" },
    { isHighlighted: true, text: "de" },
    { isHighlighted: false, text: "f" },
  ]
);

const resultStart = strind("abcd", [[-2, 2]]);
test.deepEqual(resultStart.matched, ["abc"]);
test.deepEqual(resultStart.unmatched, [{ chars: "d", index: 1 }]);

const resultEnd = strind("abcd", [[2, 5]]);
test.deepEqual(resultEnd.matched, ["cd"]);
test.deepEqual(resultEnd.unmatched, [{ chars: "ab", index: 0 }]);

const result3 = strind("abcd", [
  [2, 5],
  [6, 8],
]);
test.deepEqual(result3.matched, ["cd"]);
test.deepEqual(result3.unmatched, [{ chars: "ab", index: 0 }]);
