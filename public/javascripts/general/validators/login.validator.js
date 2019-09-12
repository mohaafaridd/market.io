import { validateEmail, validatePassword } from './fields.validators';

export default form => {
  const { email, password } = form;

  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

  const validators = [isValidEmail, isValidPassword];

  const invalidFields = validators.filter(field => field.success === false);

  return invalidFields;
};
