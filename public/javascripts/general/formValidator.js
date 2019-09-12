import { isEmail } from 'validator';

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
};

const validateName = name => {
  name = name.trim();

  if (!name.length) {
    return { success: false, reason: 'required', field: 'name' };
  }

  if (name.length > 20) {
    return { success: false, reason: 'long', field: 'name' };
  }

  if (name.length < 2) {
    return { success: false, reason: 'short', field: 'name' };
  }

  return { success: true, field: 'name' };
};

const validatePhone = phone => {
  phone = phone.trim();

  if (!phone.length) {
    return { success: false, reason: 'required', field: 'phone' };
  }

  if (phone.length !== 11) {
    return { success: false, reason: 'length', field: 'phone' };
  }

  const regex = RegExp(/^01(\d{9})$/);
  if (!regex.test(phone)) {
    return { success: false, reason: 'regex', field: 'phone' };
  }

  return { success: true, field: 'phone' };
};

const validateEmail = email => {
  if (!email.length) {
    return { success: false, reason: 'required', field: 'email' };
  }

  if (!isEmail(email)) {
    return { success: false, reason: 'format', field: 'email' };
  }

  return { success: true, field: 'email' };
};

const validatePassword = password => {
  password = password.trim();

  if (!password.length) {
    return { success: false, reason: 'required', field: 'password' };
  }

  if (password.length > 100) {
    return { success: false, reason: 'long', field: 'password' };
  }

  if (password.length < 6) {
    return { success: false, reason: 'short', field: 'password' };
  }

  return { success: true, field: 'password' };
};

const validateRePassword = (password, repassword) => {
  if (!repassword.length) {
    return { success: false, reason: 'required', field: 'repassword' };
  }

  if (repassword.length > 100) {
    return { success: false, reason: 'long', field: 'repassword' };
  }

  if (repassword.length < 6) {
    return { success: false, reason: 'short', field: 'repassword' };
  }

  if (password !== repassword) {
    return { success: false, reason: 'match', field: 'repassword' };
  }

  return { success: true, field: 'repassword' };
};
