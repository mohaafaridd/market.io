import axios from 'axios';
import { clearErrors, displayError } from './validators/error.handle';
import validatorForm from './validators/login.validator';
import grabForm from './formGrabber';

const loginBtn = document.getElementById('login-submit-button');

loginBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    clearErrors();
    const form = grabForm();
    const invalidFields = validatorForm(form);

    // Shows errors on DOM if there is
    if (invalidFields.length) {
      return invalidFields.forEach(field => displayError(field));
    }
  } catch (error) {}
  // const isValid =
});
