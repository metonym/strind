import strind from '../src/strind';

describe('strind', () => {
  test('full string', () => {
    expect(strind('abcd', [0, 3])).toEqual({
      matched: ['abcd'],
      unmatched: []
    });
  });

  test('callback example', () => {
    const result = strind('abcd', [[1, 1], [2, 6]], ({ chars, matches }) => {
      return {
        text: chars,
        isHighlighted: matches
      };
    });
    expect(result.matched).toEqual([
      { isHighlighted: false, text: 'a' },
      { isHighlighted: true, text: 'b' },
      { isHighlighted: true, text: 'cd' }
    ]);
    expect(result.unmatched).toEqual([{ chars: 'a', index: 0 }]);
  });

  test('same character (single array) – no callback', () => {
    expect(strind('abcd', [[1, 1], [2, 6]])).toEqual({
      matched: ['b', 'cd'],
      unmatched: [{ chars: 'a', index: 0 }]
    });

    const result = strind('abcd', [0, 0]);
    expect(result.matched).toEqual(['a']);
    expect(result.unmatched).toEqual([{ chars: 'bcd', index: 1 }]);
  });

  test('same character – no callback', () => {
    expect(strind('abcdef', [[1, 1], [3, 4]]).matched).toEqual(['b', 'de']);
    expect(strind('abcdef', [[1, 1], [3, 4]]).unmatched).toEqual([
      { chars: 'a', index: 0 },
      { chars: 'c', index: 1 },
      { chars: 'f', index: 2 }
    ]);

    expect(strind('abcd', [[0, 0], [1, 1]]).matched).toEqual(['a', 'b']);
    expect(strind('abcd', [[0, 0], [1, 1]]).unmatched).toEqual([
      { chars: 'cd', index: 2 }
    ]);

    expect(strind('abcdef', [[0, 0], [3, 4]]).matched).toEqual(['a', 'de']);
    expect(strind('abcdef', [[0, 0], [3, 4]]).unmatched).toEqual([
      { chars: 'bc', index: 1 },
      { chars: 'f', index: 2 }
    ]);
  });

  test('same character – custom callback', () => {
    expect(
      strind<{ text: string; isHighlighted: boolean }>(
        'abcd',
        [[0, 0], [1, 1]],
        ({ matches, chars }) => {
          return {
            text: chars,
            isHighlighted: matches
          };
        }
      ).matched
    ).toEqual([
      { isHighlighted: true, text: 'a' },
      { isHighlighted: true, text: 'b' },
      { isHighlighted: false, text: 'cd' }
    ]);

    expect(
      strind<{ text: string; isHighlighted: boolean }>(
        'abcdef',
        [[0, 0], [3, 4]],
        ({ matches, chars }) => {
          return {
            text: chars,
            isHighlighted: matches
          };
        }
      ).matched
    ).toEqual([
      { isHighlighted: true, text: 'a' },
      { isHighlighted: false, text: 'bc' },
      { isHighlighted: true, text: 'de' },
      { isHighlighted: false, text: 'f' }
    ]);
  });

  test('outside of range – no callback', () => {
    const resultStart = strind('abcd', [[-2, 2]]);
    expect(resultStart.matched).toEqual(['abc']);
    expect(resultStart.unmatched).toEqual([{ chars: 'd', index: 1 }]);

    const resultEnd = strind('abcd', [[2, 5]]);
    expect(resultEnd.matched).toEqual(['cd']);
    expect(resultEnd.unmatched).toEqual([{ chars: 'ab', index: 0 }]);
  });

  test('end early – no callback', () => {
    const result = strind('abcd', [[2, 5], [6, 8]]);
    expect(result.matched).toEqual(['cd']);
    expect(result.unmatched).toEqual([{ chars: 'ab', index: 0 }]);
  });
});
