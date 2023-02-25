/**
 * Rename `Obj` according to `RenameMap`
 * keys renamed according to renameMap
 * @param RenameMap - object of form `{oldKey: newKey}`.
 * @param Obj - object to rename. When some key is not found in the renameMap, then it's passed as-is.
 * @returns The generated type
 * @private
 */

export type RenameByMap<RenameMap, Obj> = {
  [K in keyof Obj as K extends keyof RenameMap
    ? RenameMap[K] extends string
      ? RenameMap[K]
      : never
    : K]: K extends keyof Obj ? Obj[K] : never;
};

export type Cast<A, B> = A extends B ? A : B;

/**
 * Types that can be directly narrowed when inferred
 * @private
 */
export type Narrowable = string | number | bigint | boolean;

/**
 * Narrows a generic type that could contain narrowable types
 * @private
 *
 * @type Param A - The type to be narrowed
 * @returns The narrowed type
 */
export type Narrow<A> = Cast<
  A,
  [] | (A extends Narrowable ? A : never) | { [K in keyof A]: Narrow<A[K]> }
>;

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to renameMap
 * @param renameMap - object of form `{oldKey: newKey}`.
 * @param obj - object to rename. When some key is not found in the renameMap, then it's passed as-is.
 * @example
 * renameKeys({ _id: 'id' }, { _id: 1234578 });
 * RESULTS: { id: 1234578 }
 *
 * @example
 * renameKeys({ _id: 'id' }, { _id: 1234578, name: 'John' });
 * RESULTS: { id: 1234578, name: 'John' }
 *
 * @example
 * renameKeys({ _id: 'id', name: 'user' }, { _id: 1234578, name: 'John' });
 * RESULTS: { id: 1234578, user: 'John' }
 */

export function renameKeys<RenameMap, Obj>(
  renameMap: Narrow<RenameMap>,
  obj: Obj
) {
  const keys = Object.keys(obj as any);
  return keys.reduce(
    (acc, key) => {
      const newName = (renameMap as any)[key as keyof RenameMap & Obj] || key;
      (acc as Record<any, any>)[newName] = (obj as Record<any, any>)[key];

      return acc;
    },
    {} as {
      [K in keyof Obj as K extends keyof RenameMap
        ? RenameMap[K] extends string
          ? RenameMap[K]
          : never
        : K]: K extends keyof Obj ? Obj[K] : never;
    }
  );
}

export type RenameKeys = typeof renameKeys;

/**
 * Curried version of `renameKeys`  (See {@link renameKeys})
 * @param renameMap - object of form `{ oldKey: newKey }`.
 *
 * @example
 * curriedRenameKeys({ _id: 'id' })({ _id: 1234578 });
 * RESULTS: { id: 1234578 }
 *
 * @example
 * curriedRenameKeys({ _id: 'id' })({ _id: 1234578, name: 'John' });
 * RESULTS: { id: 1234578, name: 'John' }
 *
 * @example
 * curriedRenameKeys({ _id: 'id', name: 'user' })({ _id: 1234578, name: 'John' });
 * RESULTS: { id: 1234578, user: 'John' }
 */

export const curriedRenameKeys =
  <RenameMap>(renameMap: Narrow<RenameMap>) =>
  <Obj>(obj: Obj) => {
    const keys = Object.keys(obj as any);
    return keys.reduce(
      (acc, key) => {
        const newName = (renameMap as any)[key as keyof RenameMap & Obj] || key;
        (acc as Record<any, any>)[newName] = (obj as Record<any, any>)[key];

        return acc;
      },
      {} as {
        [K in keyof Obj as K extends keyof RenameMap
          ? RenameMap[K] extends string
            ? RenameMap[K]
            : never
          : K]: K extends keyof Obj ? Obj[K] : never;
      }
    );
  };
