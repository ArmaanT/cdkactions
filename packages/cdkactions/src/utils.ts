import { StringMap } from './types';

/**
 * Fix the raw yaml returned by yaml.safeDump by removing quotes surrounding GH Action
 * expressions, removing double single quotes from within a GH Action expression,
 * and finally remove quotes from the top-level "on" key
 * @param rawYaml Raw yaml to be formatted
 */
export const formatGHActionsYaml = (rawYaml: string) => {
  // Remove quotes from GH Action expressions: ${{ ... }}
  const expression_re = /'(\${{ .* }})'/g;
  const fixedExpression = rawYaml.replace(expression_re, '$1');

  // Remove double single quotes from inside GH Action expressions:
  const double_re = /\${{ .*''.* }}/g;
  const removeDoubleQuote = (match: string, _offset: string, _string: string) => {
    return match.replace(/''/g, '\'');
  };
  const fixedDoubleQuotes = fixedExpression.replace(double_re, removeDoubleQuote);

  // Remove quotes from the top-level "on" key
  const on_re = /'on':/g;
  const fixedOn = fixedDoubleQuotes.replace(on_re, 'on:');

  // Removes nested single quotes like in "key: '${{ hashFiles('example/yarn.lock') }}'"
  const nested_re = /: '([^'\n\r]*'[^'\n\r]*'.*)'\n/g;
  const fixedNested = fixedOn.replace(nested_re, ': $1\n');

  return fixedNested;
};

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
