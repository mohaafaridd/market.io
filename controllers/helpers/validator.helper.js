const _ = require('lodash');

const extractErrors = errors => {
  const keys = Object.keys(errors);
  console.log('keys :', keys);
  const extracted = keys.map(key => _.pick(errors[key], ['kind', 'path']));
  console.log('extracted :', extracted);
  return extracted;
};

module.exports = { extractErrors };
