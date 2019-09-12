import {
  validatePassword,
  validateEmail,
  validateName,
  validatePhone,
  validateRePassword,
} from './fields.validators';

export default form => {
  const { name, phone, email, password, repassword } = form;

  const isValidName = validateName(name);
  const isValidPhone = validatePhone(phone);
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);
  const isValidRePassword = validateRePassword(password, repassword);

  const validators = [
    isValidName,
    isValidPhone,
    isValidEmail,
    isValidPassword,
    isValidRePassword,
  ];

  const invalidFields = validators.filter(field => field.success === false);

  return invalidFields;
};
