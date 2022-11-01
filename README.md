# Prerequisites

Rename object keys with inferable types.

## renameKeys (renameMap, obj)

Creates a new `obj` with the own properties of the provided object, but
the keys renamed according to `renameMap`.

```typescript
renameKeys({ _id: 'id' }, { _id: 1234578 });
// => RESULTS: { id: 1234578 }

renameKeys({ _id: 'id' }, { _id: 1234578, name: 'John' });
// => RESULTS: { id: 1234578, name: 'John' }

renameKeys({ _id: 'id', name: 'user' }, { _id: 1234578, name: 'John' });
// => RESULTS: { id: 1234578, user: 'John' }
```

## curriedRenameKeys (renameMap) =\> (obj)

Unlike `renameKeys`, in the curried version you need to specify types.

```typescript
const o = {
  _id: 'id',
  name: 'user',
};
const renameMap = { _id: 'id', name: 'user' } as const;
curriedRenameKeys<typeof renameMap, typeof o>(renameMap)(o);
```
