export type RenameByT<RenameMap, Obj> = {
  [K in keyof Obj as K extends keyof RenameMap
    ? RenameMap[K] extends string
      ? RenameMap[K]
      : never
    : K]: K extends keyof Obj ? Obj[K] : never;
};

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

export const renameKeys = <RenameMap, Obj extends Record<any, any>>(
  renameMap: RenameMap,
  obj: Obj
) => {
  const keys = Object.keys(obj);
  return keys.reduce(
    (acc, key) => {
      const newName = renameMap[key as keyof RenameMap & Obj] || key;
      (acc as any)[newName] = obj[key];

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
  <RenameMap, Obj extends Record<any, any>>(renameMap: RenameMap) =>
  (obj: Obj) =>
    renameKeys<RenameMap, Obj>(renameMap, obj);
