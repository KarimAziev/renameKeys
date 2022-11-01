export type RenameByT<RenameMap, Obj> = {
  [K in keyof Obj as K extends keyof RenameMap
    ? RenameMap[K] extends string
      ? RenameMap[K]
      : never
    : K]: K extends keyof Obj ? Obj[K] : never;
};

export type Cast<A, B> = A extends B ? A : B;

export type Narrowable = string | number | bigint | boolean;

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
  renameMap: Narrow<RenameMap> | RenameMap,
  obj: Obj
) {
  const keys = Object.keys(obj as Record<any, any>);
  return keys.reduce(
    (acc, key) => {
      const newName = (renameMap as any)[key as keyof RenameMap & Obj] || key;
      (acc as Record<any, any>)[newName] = (obj as Record<any, any>)[key];

      return acc;
    },
    {} as {
      [K in keyof Obj as K extends keyof Narrow<RenameMap>
        ? Narrow<RenameMap>[K] extends string
          ? Narrow<RenameMap>[K]
          : never
        : never]: K extends keyof Obj ? Obj[K] : never;
    }
  );
}
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
  (renameMap: any) =>
  <Obj>(obj: Narrow<Obj>) =>
    renameKeys(renameMap, obj);
