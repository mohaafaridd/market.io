import { isEmail } from 'validator';
import kinds from '../constants/error.kind';
import { getErrorMessage } from '../messages/register';

export const clearErrors = () => {
  const fields = document.querySelectorAll('.error');
  fields.forEach(field => (field.innerHTML = ''));
};

export const displayError = error => {
  const className = '.' + error.path;
  const field = document.querySelector('.error' + className);
  if (field) {
    field.innerHTML = getErrorMessage(error);
  }
};

export const getForm = () => ({
  name: document.getElementById('name').value,
  phone: document.getElementById('phone').value,
  email: document.getElementById('email').value,
  password: document.getElementById('password').value,
  repassword: document.getElementById('repassword').value,
});

export const validateForm = form => {
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

const validateName = name => {
  name = name.trim();

  if (!name.length) {
    return { success: false, kind: kinds.REQUIRED, path: 'name' };
  }

  if (name.length > 20) {
    return { success: false, kind: kinds.LONG, length: 20, path: 'name' };
  }

  if (name.length < 2) {
    return { success: false, kind: kinds.SHORT, length: 2, path: 'name' };
  }

  return { success: true, path: 'name' };
};

const validatePhone = phone => {
  phone = phone.trim();

  if (!phone.length) {
    return { success: false, kind: kinds.REQUIRED, path: 'phone' };
  }

  if (phone.length !== 11) {
    return { success: false, kind: kinds.LENGTH, length: 11, path: 'phone' };
  }

  const regex = RegExp(/^01(\d{9})$/);
  if (!regex.test(phone)) {
    return {
      success: false,
      kind: kinds.REGEX,
      path: 'phone',
    };
  }

  return { success: true, path: 'phone' };
};

const validateEmail = email => {
  if (!email.length) {
    return { success: false, kind: kinds.REQUIRED, path: 'email' };
  }

  if (!isEmail(email)) {
    return { success: false, kind: kinds.FORMAT, path: 'email' };
  }

  return { success: true, path: 'email' };
};

const validatePassword = password => {
  password = password.trim();

  if (!password.length) {
    return { success: false, kind: kinds.REQUIRED, path: 'password' };
  }

  if (password.length > 100) {
    return {
      success: false,
      kind: kinds.LONG,
      length: '100',
      path: 'password',
    };
  }

  if (password.length < 6) {
    return { success: false, kind: kinds.SHORT, length: '6', path: 'password' };
  }

  return { success: true, path: 'password' };
};

const validateRePassword = (password, repassword) => {
  if (!repassword.length) {
    return { success: false, kind: kinds.REQUIRED, path: 'repassword' };
  }

  if (repassword.length > 100) {
    return {
      success: false,
      kind: kinds.LONG,
      length: '100',
      path: 'repassword',
    };
  }

  if (repassword.length < 6) {
    return {
      success: false,
      kind: kinds.SHORT,
      length: '6',
      path: 'repassword',
    };
  }

  if (password !== repassword) {
    return { success: false, kind: kinds.MATCH, path: 'repassword' };
  }

  return { success: true, path: 'repassword' };
};
