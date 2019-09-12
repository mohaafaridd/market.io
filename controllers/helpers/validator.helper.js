const _ = require('lodash');

const extractErrors = errors => {
  const keys = Object.keys(errors);
  const extracted = keys.map(key => _.pick(errors[key], ['kind', 'path']));
  return extracted;
};

module.exports = { extractErrors };
