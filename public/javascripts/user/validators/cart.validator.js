import { validateAmount, validateMode } from './fields.validator';

export const patchValidation = (mode, elements) => {
  const isValidMode = validateMode(mode);
  const isValidAmount = validateAmount(mode, elements);

  const validators = [isValidAmount, isValidMode];
  const invalidFields = validators.filter(field => field.success === false);

  return invalidFields;
};
