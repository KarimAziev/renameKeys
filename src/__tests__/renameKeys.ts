import { renameKeys, curriedRenameKeys } from '..';

describe('Testing renameKeys', () => {
  it('Should rename exact object', () => {
    expect(renameKeys({ _id: 'id' }, { _id: 1234578 })).toEqual({
      id: 1234578,
    });
  });

  it('Should rename object and keep existing properties', () => {
    expect(renameKeys({ _id: 'id' }, { _id: 1234578, name: 'John' })).toEqual({
      id: 1234578,
      name: 'John',
    });
  });
  it('Should skip unexesting property', () => {
    expect(
      renameKeys(
        { _id: 'id', unexistingProp: 'Prop' },
        { _id: 1234578, name: 'John' }
      )
    ).toEqual({
      id: 1234578,
      name: 'John',
    });
  });
  it('Should skip unexesting props', () => {
    expect(
      renameKeys({ unexistingProp: 'Prop' }, { _id: 1234578, name: 'John' })
    ).toEqual({ _id: 1234578, name: 'John' });
  });
});

describe('Testing curriedRenameKeys', () => {
  it('Should rename exact object', () => {
    expect(curriedRenameKeys({ _id: 'id' })({ _id: 1234578 })).toEqual({
      id: 1234578,
    });
  });

  it('Should rename object and keep existing properties', () => {
    expect(
      curriedRenameKeys({ _id: 'id' })({ _id: 1234578, name: 'John' })
    ).toEqual({
      id: 1234578,
      name: 'John',
    });
  });
  it('Should skip unexesting property', () => {
    expect(
      curriedRenameKeys({ _id: 'id', unexistingProp: 'Prop' })({
        _id: 1234578,
        name: 'John',
      })
    ).toEqual({
      id: 1234578,
      name: 'John',
    });
  });
  it('Should skip unexesting props', () => {
    expect(
      curriedRenameKeys({ unexistingProp: 'Prop' })({
        _id: 1234578,
        name: 'John',
      })
    ).toEqual({ _id: 1234578, name: 'John' });
  });
});
