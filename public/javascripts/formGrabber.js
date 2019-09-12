export default (keys = []) => {
  const object = {};

  // KISS : Keep it simple stupid
  const assign = keys.forEach(key => {
    const value = document.getElementById(key)
      ? document.getElementById(key).value
      : undefined;

    object[key] = value;
  });

  return object;
};
