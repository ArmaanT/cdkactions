import { camelToSnake, renameKeys } from '../src/utils';


test('renameKeys', () => {
  const obj = { oldKey: 'value', arr: [{ oldKey: 'different value' }] };
  const expected = { newKey: 'value', arr: [{ newKey: 'different value' }] };
  expect(renameKeys(obj, { oldKey: 'newKey' })).toEqual(expected);
});


test('camelToSnake', () => {
  expect(camelToSnake('camelCaseString')).toBe('camel_case_string');
});
