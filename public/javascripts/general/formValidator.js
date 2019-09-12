import { isEmail } from 'validator';

export const clearErrors = () => {
  const fields = document.querySelectorAll('.error');
  fields.forEach(field => (field.innerHTML = ''));
};

export const displayError = error => {
  const className = '.' + error.path;
  const field = document.querySelector('.error' + className);
  if (field) {
    field.innerHTML = error.kind;
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
    return { success: false, kind: 'required', path: 'name' };
  }

  if (name.length > 20) {
    return { success: false, kind: 'long', path: 'name' };
  }

  if (name.length < 2) {
    return { success: false, kind: 'short', path: 'name' };
  }

  return { success: true, path: 'name' };
};

const validatePhone = phone => {
  phone = phone.trim();

  if (!phone.length) {
    return { success: false, kind: 'required', path: 'phone' };
  }

  if (phone.length !== 11) {
    return { success: false, kind: 'length', path: 'phone' };
  }

  const regex = RegExp(/^01(\d{9})$/);
  if (!regex.test(phone)) {
    return { success: false, kind: 'regex', path: 'phone' };
  }

  return { success: true, path: 'phone' };
};

const validateEmail = email => {
  if (!email.length) {
    return { success: false, kind: 'required', path: 'email' };
  }

  if (!isEmail(email)) {
    return { success: false, kind: 'format', path: 'email' };
  }

  return { success: true, path: 'email' };
};

const validatePassword = password => {
  password = password.trim();

  if (!password.length) {
    return { success: false, kind: 'required', path: 'password' };
  }

  if (password.length > 100) {
    return { success: false, kind: 'long', path: 'password' };
  }

  if (password.length < 6) {
    return { success: false, kind: 'short', path: 'password' };
  }

  return { success: true, path: 'password' };
};

const validateRePassword = (password, repassword) => {
  if (!repassword.length) {
    return { success: false, kind: 'required', path: 'repassword' };
  }

  if (repassword.length > 100) {
    return { success: false, kind: 'long', path: 'repassword' };
  }

  if (repassword.length < 6) {
    return { success: false, kind: 'short', path: 'repassword' };
  }

  if (password !== repassword) {
    return { success: false, kind: 'match', path: 'repassword' };
  }

  return { success: true, path: 'repassword' };
};
