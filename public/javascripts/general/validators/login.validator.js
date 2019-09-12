import { validateEmail } from './fields.validators';

export default form => {
  const { email } = form;

  const isValidEmail = validateEmail(email);
  const validators = [isValidEmail];
  const invalidFields = validators.filter(field => field.success === false);

  return invalidFields;
};
