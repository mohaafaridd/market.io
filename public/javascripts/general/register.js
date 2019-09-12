import axios from 'axios';
import { clearErrors, displayError } from './validators/error.handle';
import validatorForm from './validators/registration.validator';
import grabForm from './formGrabber';

const registerBtn = document.getElementById('register-submit-button');

registerBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    clearErrors();

    const form = grabForm();
    const invalidFields = validatorForm(form);

    // Shows errors on DOM if there is
    if (invalidFields.length) {
      return invalidFields.forEach(field => displayError(field));
    }
    const response = await axios({
      method: 'POST',
      url: '/users/api/register',
      data: {
        user: form,
      },
    });

    window.location.replace('/');
  } catch (error) {
    const { error: extracted } = error.response.data;
    extracted.forEach(field => displayError(field));
  }
});
