import axios from 'axios';
import faker from 'faker';
import {
  getForm,
  validateForm,
  displayError,
  clearErrors,
} from './formValidator';
const registerBtn = document.getElementById('register-submit-button');

registerBtn.addEventListener('click', async e => {
  e.preventDefault();
  try {
    clearErrors();

    const form = getForm();
    const invalidFields = validateForm(form);

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
    console.log('response :', response.data);
  } catch (error) {
    console.log(error.response.data);
  }
});
