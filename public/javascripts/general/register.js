import axios from 'axios';
import { clearErrors, displayError } from './validators/error.handle';
import validatorForm from './validators/registration.validator';
import grabForm from '../formGrabber';

const registerBtn = document.getElementById('register-submit-button');

registerBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    clearErrors();

    const form = grabForm(['name', 'phone', 'email', 'password', 'repassword']);
    const invalidFields = validatorForm(form);

    // Shows errors on DOM if there is
    if (invalidFields.length) {
      return invalidFields.forEach(field => displayError(field));
    }

    const registrationType = document.querySelector(
      'input[name="registration-type"]:checked'
    ).value;

    if (['store', 'user'].indexOf(registrationType) === -1) {
      return;
    }

    const response = await axios({
      method: 'POST',
      url: `/${registrationType}s/api/register`,
      data: {
        [registrationType]: form,
      },
    });

    window.location.replace('/');
  } catch (error) {
    const { error: extracted } = error.response.data;
    extracted.forEach(field => displayError(field));
  }
});
