import * as test from "tape";
import strind from "../src/strind";

test("full string", (t) => {
  t.deepEqual(strind("abcd", [0, 3]), {
    matched: ["abcd"],
    unmatched: [],
  });
  t.end();
});

test("callback example", (t) => {
  const result = strind(
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
  t.deepEqual(result.matched, [
    { isHighlighted: false, text: "a" },
    { isHighlighted: true, text: "b" },
    { isHighlighted: true, text: "cd" },
  ]);
  t.deepEqual(result.unmatched, [{ chars: "a", index: 0 }]);
  t.end();
});

test("same character (single array) – no callback", (t) => {
  t.deepEqual(
    strind("abcd", [
      [1, 1],
      [2, 6],
    ]),
    {
      matched: ["b", "cd"],
      unmatched: [{ chars: "a", index: 0 }],
    }
  );

  const result = strind("abcd", [0, 0]);
  t.deepEqual(result.matched, ["a"]);
  t.deepEqual(result.unmatched, [{ chars: "bcd", index: 1 }]);
  t.end();
});

test("same character – no callback", (t) => {
  t.deepEqual(
    strind("abcdef", [
      [1, 1],
      [3, 4],
    ]).matched,
    ["b", "de"]
  );

  t.deepEqual(
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

  t.deepEqual(
    strind("abcd", [
      [0, 0],
      [1, 1],
    ]).matched,
    ["a", "b"]
  );

  t.deepEqual(
    strind("abcd", [
      [0, 0],
      [1, 1],
    ]).unmatched,
    [{ chars: "cd", index: 2 }]
  );

  t.deepEqual(
    strind("abcdef", [
      [0, 0],
      [3, 4],
    ]).matched,
    ["a", "de"]
  );

  t.deepEqual(
    strind("abcdef", [
      [0, 0],
      [3, 4],
    ]).unmatched,
    [
      { chars: "bc", index: 1 },
      { chars: "f", index: 2 },
    ]
  );

  t.end();
});

test("same character – custom callback", (t) => {
  t.deepEqual(
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

  t.deepEqual(
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

  t.end();
});

test("outside of range – no callback", (t) => {
  const resultStart = strind("abcd", [[-2, 2]]);
  t.deepEqual(resultStart.matched, ["abc"]);
  t.deepEqual(resultStart.unmatched, [{ chars: "d", index: 1 }]);

  const resultEnd = strind("abcd", [[2, 5]]);
  t.deepEqual(resultEnd.matched, ["cd"]);
  t.deepEqual(resultEnd.unmatched, [{ chars: "ab", index: 0 }]);

  t.end();
});

test("end early – no callback", (t) => {
  const result = strind("abcd", [
    [2, 5],
    [6, 8],
  ]);
  t.deepEqual(result.matched, ["cd"]);
  t.deepEqual(result.unmatched, [{ chars: "ab", index: 0 }]);
  t.end();
});
