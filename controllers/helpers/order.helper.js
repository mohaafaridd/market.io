const formatUpdates = givenUpdates => {
  const updates = Object.keys(givenUpdates);

  const availableUpdates = ['delivered'];

  const isValidOperation = updates.every(update =>
    availableUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw new Error('Update failed');
  }

  const updatesObject = {};

  updates.forEach(update => {
    updatesObject[update] = givenUpdates[update];
  });

  return updatesObject;
};

module.exports = {
  formatUpdates,
};
