import kinds from '../../constants/error.kind';

export const validateMode = mode => {
  const modes = ['increase', 'decrease'];
  const valid = modes.includes(mode);

  if (!valid) {
    return { success: false, kind: kinds.FORMAT, path: 'amount' };
  }
  return { success: true, path: 'amount' };
};

export const validateAmount = (mode, elements) => {
  const amount = parseInt(elements['amount']);
  const nanTest = !isNaN(amount);

  if (!nanTest) {
    return { success: false, kind: kinds.FORMAT, path: 'amount' };
  }

  //  user can't go below 1
  const isValid = mode === 'increase' ? true : amount > 1;
  if (!isValid) {
    return { success: false, kind: kinds.MINIMUM, min: 1, path: 'amount' };
  }

  return { success: true, path: 'amount' };
};
