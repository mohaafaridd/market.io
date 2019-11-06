const _ = require('lodash');

const parseErrors = ({ kind, path }) => {
  return {
    msg: `${path.charAt(0).toUpperCase() +
      path.substring(1)} has to be ${kind}`,
  };
};

const extractErrors = errors => {
  const keys = Object.keys(errors);
  const extracted = keys.map(key => _.pick(errors[key], ['kind', 'path']));
  const withMsg = extracted.reduce((obj, current) => {
    obj[current.path] = parseErrors(current);
    return obj;
  }, {});
  return withMsg;
};

module.exports = { extractErrors };
