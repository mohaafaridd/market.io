import axios from 'axios';
import { clearErrors, displayError } from '../util/error.handle';
import validatorForm from './validators/login.validator';
import grabForm from '../util/formGrabber';
import forms from '../constants/forms';

const loginBtn = document.getElementById('login-submit-button');

loginBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    clearErrors();
    const form = grabForm(['email', 'password']);
    const invalidFields = validatorForm(form);

    // Shows errors on DOM if there is
    if (invalidFields.length) {
      return invalidFields.forEach(field => displayError(field, forms.LOGIN));
    }

    const loginType = document.querySelector('input[name="login-type"]:checked')
      .value;

    if (['store', 'user'].indexOf(loginType) === -1) {
      return;
    }

    const response = await axios({
      method: 'POST',
      url: `/${loginType}s/api/login`,
      data: {
        [loginType]: form,
      },
    });

    window.location.replace('/');
  } catch (err) {
    const { error } = err.response.data;
    const field = document.querySelector('.error.login');
    field.innerHTML = 'login failed';
  }
});
