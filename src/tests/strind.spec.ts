import strind from '../strind';

describe('strind', () => {
  test('callback example', () => {
    const result = strind('abcd', [[1, 1], [2, 6]], ({ chars, matches }) => {
      return {
        text: chars,
        isHighlighted: matches
      };
    });
    expect(result).toEqual([
      { isHighlighted: false, text: 'a' },
      { isHighlighted: true, text: 'b' },
      { isHighlighted: true, text: 'cd' }
    ]);
  });

  test('same character (single array) – no callback', () => {
    expect(strind('abcd', [0, 0])).toEqual(['a']);
  });

  test('same character – no callback', () => {
    expect(strind('abcdef', [[1, 1], [3, 4]])).toEqual(['b', 'de']);
    // unmatched: 'a', 'c', 'f'

    expect(strind('abcd', [[0, 0], [1, 1]])).toEqual(['a', 'b']);
    // unmatched: 'cd'

    expect(strind('abcdef', [[0, 0], [3, 4]])).toEqual(['a', 'de']);
    // unmatched: 'bc', 'f'
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
      )
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
      )
    ).toEqual([
      { isHighlighted: true, text: 'a' },
      { isHighlighted: false, text: 'bc' },
      { isHighlighted: true, text: 'de' },
      { isHighlighted: false, text: 'f' }
    ]);
  });

  test('outside of range – no callback', () => {
    expect(strind('abcd', [[-2, 2]])).toEqual(['abc']);
    expect(strind('abcd', [[2, 5]])).toEqual(['cd']);
  });

  test('end early – no callback', () => {
    expect(strind('abcd', [[2, 5], [6, 8]])).toEqual(['cd']);
  });
});
