import kinds from '../../constants/error.kind';

export const validateAmount = amount => {
  amount = parseInt(amount);

  if (!amount) {
    return { success: false, kind: kinds.REQUIRED, path: 'amount' };
  }

  if (amount < 0) {
    return { success: false, kind: kinds.MINIMUM, min: 0, path: 'amount' };
  }
};
