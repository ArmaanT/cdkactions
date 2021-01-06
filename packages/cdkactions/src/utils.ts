import { StringMap } from './types';


/**
 * A helper function to recursively rename keys within an object
 * @param obj Object to rename
 * @param newKeys A dictionary of old to new key names
 */
export const renameKeys = (obj: any, newKeys: StringMap) => {
  if (typeof obj !== 'object') {
    return obj;
  }
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    const oldValue = obj[key];
    let newValue = oldValue;
    if (Array.isArray(oldValue)) {
      newValue = oldValue.map(item => renameKeys(item, newKeys));
    } else if (typeof oldValue === 'object') {
      newValue = renameKeys(oldValue, newKeys);
    }
    return { [newKey]: newValue };
  });
  return Object.assign({}, ...keyValues);
};

export const camelToSnake = (str: string) => str.replace(/[A-Z]/g, (group) => `_${group.toLowerCase()}`);
