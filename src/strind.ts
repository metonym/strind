/**
 * Partitions a string based on character indices.
 *
 * @param str - string to partition
 * @param indices - array of tuples to match [start, end] indices
 * @param callback
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

  for (let i = 0, len = idx.length; i < len; i++) {
    const [start, end] = idx[i] as TupleIndices;

    if (start === end) {
      updatePartition(strs[start]);
    } else {
      const floor = start >= 0 ? start : 0;
      const ceiling = end > strsLen ? strsLen : end;
      updatePartition(str.slice(floor, ceiling + 1));
    }

    if (i === 0 && start > 0) {
      updateNonmatched(0, start, 0);
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

  function updatePartition(chars: string) {
    if (callback) {
      const cb = callback({ chars, matches: true });
      (partition as T[]).push(cb);
    } else {
      (partition as string[]).push(chars);
    }
  }

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

  return partition;
}

type TupleIndices = [number, number];

interface INonmatched {
  chars: string;
  index: number;
}

export default strind;
