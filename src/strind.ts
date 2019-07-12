/**
 * Partitions a string based on character indices.
 *
 * @param {string} str - string to partition
 * @param {[number,number][]} indices - array of tuples to match [start, end] indices
 * @param {function} callback - callback function called with matching characters
 */
function strind<T = string>(
  str: string,
  indices: TupleIndices[] | TupleIndices,
  callback?: (params: { chars: string; matches: boolean }) => T
) {
  const strs = str.split('');
  const strsLen = strs.length;
  const idx = Array.isArray(indices[0]) ? indices : [indices];
  const partition: T[] | string[] = [];
  const nonmatched: INonmatched[] = [];

  function updateNonmatched(open: number, close: number, index: number) {
    const chars = str.slice(open, close);

    nonmatched.push({
      chars,
      index
    });

    if (callback) {
      const cb = callback({ chars, matches: false });
      (partition as T[]).push(cb);
    }
  }

  for (let i = 0, len = idx.length; i < len; i++) {
    const [start, end] = idx[i] as TupleIndices;
    const floor = start >= 0 ? start : 0;
    const ceiling = end >= strsLen ? strsLen : end + 1;

    if (i === 0 && start > 0) {
      updateNonmatched(0, start, 0);
    }

    const chars = str.slice(floor, ceiling);

    if (callback) {
      const cb = callback({ chars, matches: true });
      (partition as T[]).push(cb);
    } else {
      (partition as string[]).push(chars);
    }

    if (i < len - 1 && end < strsLen) {
      if (end + 1 !== (idx[i + 1] as TupleIndices)[0]) {
        updateNonmatched(
          end + 1,
          (idx[i + 1] as TupleIndices)[0],
          partition.length
        );
      }
    }

    if (i === len - 1 && end < strsLen) {
      updateNonmatched(end + 1, strsLen, partition.length);
    }

    if (end >= strsLen) {
      break;
    }
  }

  return {
    unmatched: nonmatched,
    matched: partition
  };
}

type TupleIndices = [number, number];

interface INonmatched {
  chars: string;
  index: number;
}

export default strind;
