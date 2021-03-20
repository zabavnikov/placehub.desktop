import forEach from 'lodash/forEach';

export function setQuery(currentQuery, properties) {
  forEach(properties, (value, key) => {
    if (!value) {
      properties[key] = undefined;
    }
  })

  return {query: Object.assign({}, currentQuery, properties)};
}